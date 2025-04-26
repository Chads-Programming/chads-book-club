import { PrismaClient } from "@prisma/client"

let prisma: PrismaClient

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient()
} else {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  if (!(global as any).prisma) {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    ;(global as any).prisma = new PrismaClient()
  }
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  prisma = (global as any).prisma
}

export default prisma
