import { createRouter } from "@/api/utils/create-router"
import { userMiddleware } from "../middlewares/user.middleware"
import { zValidator } from "@hono/zod-validator"
import { bookSubmitDto } from "../dtos/book-submit.dto"
import type { UserPayload } from "../types/user-payload.type"
import { findSubmissionsWithVotes, submitBook } from "../services/submission.service"

export const submissionsRouter = createRouter()

submissionsRouter.use("/*", userMiddleware)

submissionsRouter.get("/", async (c) => {
  const submissions = await findSubmissionsWithVotes()

  return c.json({
    message: "Submissions Found",
    data: submissions,
  })
})

submissionsRouter.post("/", zValidator("json", bookSubmitDto), async (c) => {
  const user: UserPayload = c.get("jwtPayload")
  const book = c.req.valid("json")

  const bookSubmit = await submitBook(book, user.sub)

  return c.json({
    message: "Book Submitted",
    data: bookSubmit,
  })
})
