import type { Context, Next } from "hono"
import { jwt } from "hono/jwt"
import { env } from "hono/adapter"
import type { Env } from "@/api/types/hono.type"

export const userMiddleware = (c: Context, next: Next) => {
  const jwtMiddleware = jwt({
    secret: env<Env>(c).JWT_SECRET,
    cookie: "token",
    alg: "HS256",
  })
  return jwtMiddleware(c, next)
}
