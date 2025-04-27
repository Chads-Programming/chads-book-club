import type { Context, Next } from "hono"
import { jwt } from "hono/jwt"
import { env } from "hono/adapter"
import type { Env } from "@/api/types/hono.type"

export const userMiddleware = async (c: Context, next: Next) => {
  const jwtMiddleware = jwt({
    secret: env<Env>(c).JWT_SECRET,
    cookie: "token",
    alg: "HS256",
  })

  try {
    await jwtMiddleware(c, next)
  } catch (err) {
    return c.redirect("/", 302)
  }
}
