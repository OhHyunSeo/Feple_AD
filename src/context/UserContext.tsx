"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { supabase } from "@/lib/supabaseClient";

interface UserInfo {
  name: string;
  initial: string;
  email: string;
  role: "consultant" | "qc" | null;
}

interface UserContextType {
  userInfo: UserInfo;
  isLoading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [userInfo, setUserInfoState] = useState<UserInfo>({
    name: "사용자",
    initial: "사",
    email: "loading...",
    role: null,
  });
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserData = async () => {
    setIsLoading(true);
    try {
      let {
        data: { user },
      } = await supabase.auth.getUser();

      // localStorage에 업데이트할 이름이 있는지 확인
      const nameFromStorage = localStorage.getItem("userNameForUpdate");

      if (user && nameFromStorage && user.user_metadata?.name !== nameFromStorage) {
        // 이름이 다른 경우, user_metadata를 업데이트
        const { data: updatedUserData, error: updateError } =
          await supabase.auth.updateUser({
            data: { name: nameFromStorage },
          });

        if (updateError) throw updateError;

        // 업데이트된 user 객체를 사용
        user = updatedUserData.user;

        // 사용 후 localStorage에서 제거
        localStorage.removeItem("userNameForUpdate");
      }

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
    } catch (error) {
      console.error("Error fetching user data:", error);
      setUserInfoState({
        name: "사용자",
        initial: "사",
        email: "Error fetching data",
        role: null,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();

    const { data: authListener } = supabase.auth.onAuthStateChange(() => {
      // 세션 정보가 변경될 때마다 사용자 데이터를 다시 가져옴
      fetchUserData();
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={{ userInfo, isLoading }}>
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
