import type { Context, Next } from "hono"
import prisma from "../db/prisma"

export const apiKeyMiddleware = async (c: Context, next: Next) => {
  const apiKey = c.req.header("x-api-key")

  if (!apiKey) {
    return c.json(
      {
        message: "API key is required",
      },
      401,
    )
  }

  const foundKey = await prisma.apiKey.findUnique({
    where: {
      key: apiKey,
    },
  })

  if (!foundKey) {
    return c.json(
      {
        message: "Invalid API key",
      },
      401,
    )
  }

  await next()
}
