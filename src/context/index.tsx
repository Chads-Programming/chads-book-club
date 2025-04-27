"use client"

import { UserService } from "@/services/user"
import { createContext, useReducer } from "react"

const initialState = {
  userRegistered: false,
}

type State = typeof initialState

type Action = { type: "SET_USER_REGISTERED"; payload: boolean } | { type: "LOGOUT" } | { type: "UNKNOWN" }

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "SET_USER_REGISTERED":
      return {
        ...state,
        userRegistered: action.payload,
      }
    case "LOGOUT":
      return {
        ...state,
        userRegistered: false,
      }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

export const KirbContext = createContext({
  state: initialState,
  dispatch: (action: Action) => {},
  logout: async () => {},
})

export const KirbContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const logout = async () => {
    await UserService.logout()
    dispatch({ type: "LOGOUT" })
  }

  return <KirbContext.Provider value={{ state, dispatch, logout }}>{children}</KirbContext.Provider>
}
