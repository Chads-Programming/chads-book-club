import type { Context, Next } from "hono"
import { jwt } from "hono/jwt"
import { env } from "hono/adapter"
import type { Env } from "@/api/types"

export const userMiddleware = (c: Context, next: Next) => {
  const jwtMiddleware = jwt({
    secret: env<Env>(c).JWT_SECRET,
  })
  return jwtMiddleware(c, next)
}
