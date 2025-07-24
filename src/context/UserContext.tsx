"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import { supabase } from "@/lib/supabaseClient";

interface UserInfo {
  name: string;
  initial: string;
  email: string;
}

interface UserContextType {
  userInfo: UserInfo;
  setUserInfo: (info: Partial<Pick<UserInfo, "name" | "initial">>) => void;
  isLoading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [userInfo, setUserInfoState] = useState<UserInfo>({
    name: "사용자",
    initial: "사",
    email: "loading...",
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserEmail = async () => {
      setIsLoading(true);
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (user && user.email) {
          setUserInfoState((prev) => ({ ...prev, email: user.email }));
        } else {
          setUserInfoState((prev) => ({ ...prev, email: "Not logged in" }));
        }
      } catch (error) {
        console.error("Error fetching user email:", error);
        setUserInfoState((prev) => ({
          ...prev,
          email: "Error fetching email",
        }));
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserEmail();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        const user = session?.user;
        if (user && user.email) {
          setUserInfoState((prev) => ({ ...prev, email: user.email }));
        } else {
          setUserInfoState((prev) => ({ ...prev, email: "Not logged in" }));
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const setUserInfo = useCallback(
    (info: Partial<Pick<UserInfo, "name" | "initial">>) => {
      setUserInfoState((prev) => ({ ...prev, ...info }));
    },
    []
  );

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo, isLoading }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
