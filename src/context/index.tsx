"use client";

import { UserService } from "@/services/user";
import { createContext, useContext, useReducer } from "react";

interface KirbContextType {
  state: State;
  logout: () => Promise<void>;
  createSession: () => void;
}

const initialState = {
  userRegistered: false,
};

type State = typeof initialState;

type Action =
  | { type: "SET_USER_REGISTERED"; payload: boolean }
  | { type: "LOGOUT" }
  | { type: "UNKNOWN" };

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "SET_USER_REGISTERED":
      return {
        ...state,
        userRegistered: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        userRegistered: false,
      };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

export const KirbContext = createContext<KirbContextType | null>(null);

export const KirbContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const logout = async () => {
    await UserService.logout();
    dispatch({ type: "LOGOUT" });
  };

  const createSession = () => {
    dispatch({ type: "SET_USER_REGISTERED", payload: true })
  }

  return (
    <KirbContext.Provider value={{ state, logout, createSession }}>
      {children}
    </KirbContext.Provider>
  );
};

export const useKirbe = () => {
  const context = useContext(KirbContext);
  if (!context) {
    throw new Error("useKirbContext must be used within a KirbContextProvider");
  }
  return context;
};
