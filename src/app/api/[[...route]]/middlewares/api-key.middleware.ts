import type { Context, Next } from "hono"

export const apiKeyMiddleware = async (c: Context, next: Next) => {
  const apiKey = c.req.header("authorization")

  if (!apiKey) {
    return c.json(
      {
        message: "API key is required",
      },
      401,
    )
  }

  if (apiKey !== `Bearer ${process.env.CRON_SECRET}`) {
    return c.json(
      {
        message: "Invalid API key",
      },
      401,
    )
  }

  await next()
}
