"use client"

import { createContext, useReducer } from "react"

const initialState = {
  userRegistered: false,
}

type State = typeof initialState

type Action = { type: "SET_USER_REGISTERED"; payload: boolean } | { type: "UNKNOWN" }

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "SET_USER_REGISTERED":
      return {
        ...state,
        userRegistered: action.payload,
      }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

export const KirbContext = createContext({
  state: initialState,
  dispatch: (action: Action) => {},
})

export const KirbContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return <KirbContext.Provider value={{ state, dispatch }}>{children}</KirbContext.Provider>
}
