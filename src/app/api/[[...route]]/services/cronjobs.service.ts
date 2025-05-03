import prisma from "../db/prisma"
import { env } from "../utils/env"

export async function announceWeeklyWinner() {
  const today = new Date()

  if (today.getDay() !== 1) return { skipped: true, reason: "Hoy no es lunes" }

  const weekEnd = new Date(today)
  const weekStart = new Date(today)
  weekStart.setDate(today.getDate() - 7)

  const submissions = await prisma.bookSubmission.findMany({
    where: { createdAt: { gte: weekStart, lt: weekEnd } },
    include: {
      votes: true,
      user: {
        include: {
          accounts: true,
        },
      },
    },
  })

  if (submissions.length === 0) return { skipped: true, reason: "Sin participaciones para la semana pasada" }

  const [winner] = submissions.sort((a, b) => b.votes.length - a.votes.length)

  const submissionIds = submissions.map((s) => s.id)

  await prisma.$transaction(async (prisma) => {
    await prisma.weeklyBackup.create({
      data: {
        weekStart,
        weekEnd,
        snapshot: submissions,
      },
    })
    await prisma.submissionVote.deleteMany({
      where: { bookSubmissionId: { in: submissionIds } },
    })
    await prisma.bookSubmission.deleteMany({
      where: { id: { in: submissionIds } },
    })
  })

  if (!env.PUBLISH_WINNER_URL || !env.PUBLISH_WINNER_TOKEN)
    throw new Error("Variables PUBLISH_WINNER_URL o TOKEN no definidas")

  const submitterWinnerDiscordId = winner.user.accounts.find(
    (account) => account.provider === "discord",
  )?.providerUserId

  const response = await fetch(env.PUBLISH_WINNER_URL, {
    method: "POST",
    headers: {
      Authorization: env.PUBLISH_WINNER_TOKEN,
      "Content-Type": "application/json",
      "User-Agent": "book-club-cron/1.0",
    },
    body: JSON.stringify({
      title: winner.title,
      coverUrl: winner.coverUrl,
      description: winner.description,
      authors: winner.authors,
      votes: winner.votes.length,
      creatorId: submitterWinnerDiscordId || winner.user.username,
    }),
  })

  if (!response.ok) {
    const text = await response.text()
    throw new Error(`Error publicando ganador (${response.status}): ${text}`)
  }

  return { winner }
}
