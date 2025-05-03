import { apiKeyMiddleware } from "../middlewares/api-key.middleware"
import { announceWeeklyWinner } from "../services/cronjobs.service"
import { createRouter } from "../utils/create-router"

export const cronjobsRouter = createRouter()

cronjobsRouter.use("/*", apiKeyMiddleware)

cronjobsRouter.post("/check-weekly-winner", async (c) => {
  try {
    const result = await announceWeeklyWinner()

    if (result.skipped) return c.json({ message: result.reason })
    return c.json({
      message: "Ganador anunciado, lista reiniciada",
      data: result.winner,
    })
  } catch (err) {
    console.error(err)
    return c.json({ message: err instanceof Error ? err.message : "Error interno" }, 500)
  }
})
