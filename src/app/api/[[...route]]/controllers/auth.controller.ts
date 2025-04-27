import { createRouter } from "@/api/utils/create-router"
import { signJwt } from "@/api/utils/jwt"
import { env } from "@/api/utils/env"
import { zValidator } from "@hono/zod-validator"
import { loginDto } from "../dtos/auth-login.dto"
import { getOrCreateUser } from "../services/login.service"

export const authRouter = createRouter()

authRouter.post("/login", zValidator("json", loginDto), async (c) => {
  const secret = env.JWT_SECRET

  const { username } = c.req.valid("json")

  const user = await getOrCreateUser(username)

  const token = await signJwt(
    {
      sub: user.id,
    },
    secret,
  )

  c.header("Set-Cookie", `token=${token}; HttpOnly; Path=/;`)

  return c.json({
    message: "Logged in!",
    token,
  })
})
