"use client"
import { createContext, useCallback, useContext, useReducer } from "react"
import type { Book } from "@/api/types/book.type"

interface KirbContextType {
  state: State
  clearSession: () => void
  createSession: () => void
  setBooks: (payload: BookPayload) => void
  clearBooks: () => void
}

const initialState = {
  userRegistered: false,
  books: {
    books: [],
    totalCount: 0,
  } as BookPayload,
}

type State = typeof initialState

type BookPayload = {
  books: Book[]
  totalCount: number
}

type Action =
  | { type: "SET_USER_REGISTERED"; payload: boolean }
  | { type: "LOGOUT" }
  | { type: "SET_BOOKS"; payload: BookPayload }
  | { type: "CLEAR_BOOKS" }

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "SET_USER_REGISTERED":
      return {
        ...state,
        userRegistered: action.payload,
      }
    case "SET_BOOKS":
      return {
        ...state,
        books: action.payload,
      }
    case "LOGOUT":
      return {
        ...state,
        userRegistered: false,
      }
    case "CLEAR_BOOKS":
      return {
        ...state,
        books: {
          books: [],
          totalCount: 0,
        },
      }
    default: {
      return state
    }
  }
}

export const KirbContext = createContext<KirbContextType | null>(null)

export const KirbContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const clearSession = async () => {
    dispatch({ type: "LOGOUT" })
  }

  const createSession = () => {
    dispatch({ type: "SET_USER_REGISTERED", payload: true })
  }

  const setBooks = useCallback((payload: BookPayload) => {
    dispatch({ type: "SET_BOOKS", payload })
  }, [])

  const clearBooks = useCallback(() => {
    dispatch({ type: "CLEAR_BOOKS" })
  }, [])

  return (
    <KirbContext.Provider value={{ state, clearSession, createSession, setBooks, clearBooks }}>
      {children}
    </KirbContext.Provider>
  )
}

export const useKirbe = () => {
  const context = useContext(KirbContext)
  if (!context) {
    throw new Error("useKirbContext must be used within a KirbContextProvider")
  }
  return context
}
