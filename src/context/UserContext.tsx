"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useRouter } from "next/navigation";

interface UserInfo {
  name: string;
  initial: string;
  email: string;
  role: "consultant" | "qc" | null;
}

interface UserContextType {
  userInfo: UserInfo;
  isLoading: boolean;
  login: (name: string, email: string, role: "consultant" | "qc") => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const defaultUserInfo: UserInfo = {
  name: "게스트",
  initial: "게",
  email: "",
  role: null,
};

export function UserProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<UserInfo>(defaultUserInfo);
  const [isLoading, setIsLoading] = useState(true);

  // 페이지 로드 시 localStorage에서 사용자 정보 복원
  useEffect(() => {
    try {
      const storedUserInfo = localStorage.getItem("userInfo");
      if (storedUserInfo) {
        setUserInfo(JSON.parse(storedUserInfo));
      }
    } catch (error) {
      console.error("Failed to parse user info from localStorage", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = (name: string, email: string, role: "consultant" | "qc") => {
    setIsLoading(true);
    const initial = name ? name.charAt(0).toUpperCase() : "사";
    const newUserInfo = { name, initial, email, role };

    try {
      localStorage.setItem("userInfo", JSON.stringify(newUserInfo));
      setUserInfo(newUserInfo);
      router.push(role === "consultant" ? "/consultant" : "/qc");
    } catch (error) {
      console.error("Failed to save user info to localStorage", error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setIsLoading(true);
    try {
      localStorage.removeItem("userInfo");
      setUserInfo(defaultUserInfo);
      router.push("/");
    } catch (error) {
      console.error("Failed to clear user info from localStorage", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <UserContext.Provider value={{ userInfo, isLoading, login, logout }}>
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
