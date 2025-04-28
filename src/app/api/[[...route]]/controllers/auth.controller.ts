import { createRouter } from "@/api/utils/create-router"
import { zValidator } from "@hono/zod-validator"
import { deleteCookie } from "hono/cookie"
import { authProviderSchemaDto } from "../dtos/auth-provider.dto"
import { Provider } from "@prisma/client"
import { DiscordProvider } from "../providers/discord.provider"

export const authRouter = createRouter()
const providerMiddleware = zValidator("param", authProviderSchemaDto)

authRouter.get("/login/:provider", providerMiddleware, async (c) => {
  const { provider } = c.req.valid("param")

  if (provider === Provider.discord) {
    const providerInstance = new DiscordProvider()
    const loginUrl = providerInstance.getLoginUrl()
    return c.redirect(loginUrl)
  }

  return c.json(
    {
      message: "Provider not found",
    },
    404,
  )
})

authRouter.delete("/logout", async (c) => {
  deleteCookie(c, "token")

  return c.json({
    message: "Logged out!",
  })
})

authRouter.get("/redirect/:provider", providerMiddleware, async (c) => {
  const { provider } = c.req.valid("param")

  if (provider === Provider.discord) {
    const code = c.req.query("code")
    if (!code)
      return c.json(
        {
          message: "No code provided",
        },
        400,
      )
    const discordProvider = new DiscordProvider()

    const user = await discordProvider.login(code)

    const token = await discordProvider.getJwtToken(user)

    c.header("Set-Cookie", `token=${token}; HttpOnly; Path=/;`)

    return c.redirect("/lobby")
  }

  return c.json({
    message: "Redirecting to provider!",
  })
})
