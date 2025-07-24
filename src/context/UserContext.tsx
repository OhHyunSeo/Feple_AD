"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { User } from "@supabase/supabase-js";

interface UserInfo {
  name: string;
  initial: string;
  email: string;
  role: "consultant" | "qc" | null;
}

interface UserContextType {
  userInfo: UserInfo;
  isLoading: boolean;
  logout: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [userInfo, setUserInfoState] = useState<UserInfo>({
    name: "사용자",
    initial: "사",
    email: "loading...",
    role: null,
  });
  const [isLoading, setIsLoading] = useState(true);

  // 사용자 정보 설정 함수
  const setUserInfo = (user: User | null) => {
    if (user) {
      const name = user.user_metadata?.name || "사용자";
      const role = user.user_metadata?.role || null;
      const initial = name ? name.charAt(0).toUpperCase() : "사";
      const email = user.email || "No email";

      setUserInfoState({ name, initial, email, role });
    } else {
      setUserInfoState({
        name: "사용자",
        initial: "사",
        email: "Not logged in",
        role: null,
      });
    }
  };

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        try {
          let user = session?.user;

          if (event === "SIGNED_IN") {
            const nameToUpdate = localStorage.getItem("userNameForUpdate");
            if (
              nameToUpdate &&
              user &&
              user.user_metadata?.name !== nameToUpdate
            ) {
              try {
                const { data: updated, error } = await supabase.auth.updateUser(
                  {
                    data: { name: nameToUpdate },
                  }
                );
                if (error) throw error;
                user = updated.user;
              } catch (error) {
                console.error("Error updating user metadata:", error);
              } finally {
                localStorage.removeItem("userNameForUpdate");
              }
            }
          }

          setUserInfo(user || null);
        } catch (error) {
          console.error("Error in onAuthStateChange:", error);
          setUserInfo(null);
        } finally {
          setIsLoading(false);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const logout = async () => {
    setIsLoading(true);
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <UserContext.Provider value={{ userInfo, isLoading, logout }}>
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
