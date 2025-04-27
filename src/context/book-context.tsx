"use client"

import React from "react"
import { KirbContext } from "./kirbe-store"

export const useBooks = () => {
  const context = React.useContext(KirbContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  const { setBooks, state, clearBooks } = context
  return {
    setBooks,
    clearBooks,
    state,
  }
}
