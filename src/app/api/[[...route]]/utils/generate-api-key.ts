import { randomBytes } from "node:crypto"
import prisma from "../db/prisma"

export const generateApiKey = async (name: string) => {
  const key = randomBytes(32).toString("hex")

  const apiKey = await prisma.apiKey.create({
    data: {
      key,
      name,
    },
  })

  return apiKey
}
