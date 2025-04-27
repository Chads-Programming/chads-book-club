import { env } from "../utils/env"
import { verifyJwt } from "../utils/jwt"

export const checkToken = async (token: string) => {
  try {
    const decoded = await verifyJwt(token, env.JWT_SECRET)
    return decoded
  } catch (error) {
    return null
  }
}
