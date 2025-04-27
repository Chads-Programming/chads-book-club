"use client";

import { UserService } from "@/services/user";
import { createContext, useContext, useReducer } from "react";
import type { OpenLibraryBook } from "@/api/types/open-library-book.type";

interface KirbContextType {
  state: State;
  clearSession: () => void;
  createSession: () => void;
}

const initialState = {
  userRegistered: false,
};

type State = typeof initialState;

type BookPayload = {
  books: OpenLibraryBook[];
  totalCount: number;
};

type Action =
  | { type: "SET_USER_REGISTERED"; payload: boolean }
  | { type: "LOGOUT" }
  | { type: "SET_BOOKS"; payload: BookPayload };

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "SET_USER_REGISTERED":
      return {
        ...state,
        userRegistered: action.payload,
      };
    case "SET_BOOKS":
      return {
        ...state,
        books: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        userRegistered: false,
      };
    default: {
      return state;
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

  const clearSession = async () => {
    dispatch({ type: "LOGOUT" });
  };

  const createSession = () => {
    dispatch({ type: "SET_USER_REGISTERED", payload: true });
  };

  return (
    <KirbContext.Provider value={{ state, clearSession, createSession }}>
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
