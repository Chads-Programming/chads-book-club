import type { User } from "@prisma/client"
import { kirbapi } from "./kirbapi"

export type UserRegisterResponse = {
  message: string
  token: string
}

export type UserResponse = Pick<User, "id" | "username" | "avatarUrl">

export type UserFindResponse = {
  message: string
  data: UserResponse
}

export const UserService = {
  loginOrRegister: async (username: string) => {
    try {
      const data = await kirbapi.post<UserRegisterResponse>("auth/login", { username })
      return data
    } catch (e: unknown) {
      console.error(e)
      return null
    }
  },
  logout: async () => {
    await kirbapi.delete("auth/logout")
  },
  findOne: async (id: string): Promise<UserFindResponse | null> => {
    try {
      const data = await kirbapi.get<UserFindResponse>(`user/${id}`)
      return data
    } catch (e: unknown) {
      console.error(e)
      return null
    }
  },
}
