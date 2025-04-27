import { kirbapi } from "./kirbapi"

export type UserRegisterResponse = {
  message: string
  token: string
}

export const UserService = {
  loginOrRegister: async (username: string) => {
    try {
      const data = await kirbapi.post<UserRegisterResponse>("auth/login", { username })
      return data
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.error(e.message)
      }

      console.error(e)

      return null
    }
  },
  logout: async () => {
    await kirbapi.delete("auth/logout")
  },
}
