import { z } from "zod"

const envSchema = z.object({
  JWT_SECRET: z.string(),
  DISCORD_CLIENT_ID: z.string(),
  DISCORD_CLIENT_SECRET: z.string(),
  DISCORD_REDIRECT_URI: z.string(),
  PUBLISH_WINNER_URL: z.string(),
  PUBLISH_WINNER_TOKEN: z.string(),
})

export const env = envSchema.parse(process.env)

export const checkEnv = () => envSchema.parse(process.env)
