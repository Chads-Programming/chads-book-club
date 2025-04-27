"use client";
import { UserRegisterResponse, UserService } from "@/services/user";
import React, { createContext } from "react";
import { useRouter } from "next/navigation";
import { useKirbe } from "./kirbe-store";

type Options = {
  onSuccess: (user: UserRegisterResponse) => void;
  onError: (error: unknown) => void;
};

type AuthContextType = {
  login: (data: SubmitProps, options: Options) => void;
  logout: () => void;
};

interface SubmitProps {
  username: string;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { createSession, clearSession } = useKirbe();
  const router = useRouter();

  const login = (
    { username }: SubmitProps,
    { onSuccess, onError }: Options
  ) => {
    UserService.loginOrRegister(username)
      .then((user) => {
        createSession();
        onSuccess(user as UserRegisterResponse);
      })
      .catch((error) => {
        console.error(error);
        onError(error);
      });
  };

  const logout = () => {
    UserService.logout()
      .catch((error) => console.error(error))
      .finally(() => {
        clearSession();
        router.replace("/");
      });
  };

  return (
    <AuthContext.Provider value={{ login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
