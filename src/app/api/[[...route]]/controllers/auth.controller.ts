import { createRouter } from "@/api/utils/create-router"
import { signJwt } from "@/api/utils/jwt"
import { env } from "@/api/utils/env"

export const authRouter = createRouter()

authRouter.get("/login", async (c) => {
  const secret = env.JWT_SECRET
  const token = await signJwt(
    {
      name: "juan",
    },
    secret,
  )
  console.log({ token })
  return c.json({
    message: "Logged in!",
  })
})
