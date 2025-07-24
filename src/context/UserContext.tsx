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
        // user.email이 undefined일 경우를 대비하여 fallback 값 제공
        const userEmail = user?.email || "Not logged in";
        setUserInfoState((prev) => ({ ...prev, email: userEmail }));
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
        // user.email이 undefined일 경우를 대비하여 fallback 값 제공
        const userEmail = session?.user?.email || "Not logged in";
        setUserInfoState((prev) => ({ ...prev, email: userEmail }));
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
