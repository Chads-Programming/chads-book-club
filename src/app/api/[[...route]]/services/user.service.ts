import prisma from "../db/prisma"

export const findUser = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  })

  if (!user) {
    throw new Error("User not found")
  }

  return { id: user.id, username: user.username, avatarUrl: user.avatarUrl }
}
