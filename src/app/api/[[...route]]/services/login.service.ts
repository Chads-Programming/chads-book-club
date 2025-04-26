import prisma from "../db/prisma"

export const getOrCreateUser = async (username: string) => {
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  })
  if (user) return user
  return await prisma.user.create({
    data: {
      username,
    },
  })
}
