import { userMiddleware } from "../middlewares/user.middleware"
import { findSubmissionsWithVotes } from "../services/submission.service"
import type { UserPayload } from "../types/user-payload.type"
import { createRouter } from "../utils/create-router"

export const meRouter = createRouter()

meRouter.use("/*", userMiddleware)

meRouter.get("/", async (c) => {
  const user: UserPayload = c.get("jwtPayload")

  return c.json({
    message: "ok",
    data: user,
  })
})

meRouter.get("/submissions", async (c) => {
  const user: UserPayload = c.get("jwtPayload")
  const userId = user.sub

  const submissions = await findSubmissionsWithVotes({}, userId)

  return c.json({
    message: "ok",
    data: submissions,
  })
})
