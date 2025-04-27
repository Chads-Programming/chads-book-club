import { createRouter } from "@/api/utils/create-router"
import { userMiddleware } from "../middlewares/user.middleware"
import { zValidator } from "@hono/zod-validator"
import { bookSubmitDto } from "../dtos/book-submit.dto"
import type { UserPayload } from "../types/user-payload.type"
import {
  deleteSubmission,
  findSubmissionsWithVotes,
  submitBook,
  submitVote,
} from "../services/submission.service"
import { submitVoteDto } from "../dtos/submit-vote.dto"

export const submissionsRouter = createRouter()

submissionsRouter.use("/*", userMiddleware)

submissionsRouter.get("/", async (c) => {
  const user: UserPayload = c.get("jwtPayload")
  const submissions = await findSubmissionsWithVotes({}, user.sub)

  return c.json({
    message: "Submissions Found",
    data: submissions,
  })
})

submissionsRouter.post("/", zValidator("json", bookSubmitDto), async (c) => {
  const user: UserPayload = c.get("jwtPayload")
  const book = c.req.valid("json")

  try {
    const bookSubmit = await submitBook(book, user.sub)

    return c.json({
      message: "Book Submitted",
      data: bookSubmit,
    })
  } catch (error) {
    if (error instanceof Error) return c.json({ message: error.message }, 500)

    return c.json(
      {
        message: "Failed to submit book",
      },
      500,
    )
  }
})

submissionsRouter.post("/:id/votes", zValidator("json", submitVoteDto), async (c) => {
  const user: UserPayload = c.get("jwtPayload")
  const { id } = c.req.param()
  const { action } = c.req.valid("json")

  try {
    const vote = await submitVote(id, action, user.sub)

    return c.json({
      message: "Vote Submitted",
      data: vote,
    })
  } catch (error: unknown) {
    if (error instanceof Error) {
      return c.json({ message: error.message }, 500)
    }
    return c.json({ message: "Failed to submit vote" }, 500)
  }
})

submissionsRouter.delete("/:id", async (c) => {
  const user: UserPayload = c.get("jwtPayload")
  const { id } = c.req.param()
  try {
    await deleteSubmission(id, user.sub)

    return c.json({
      message: "Submission Deleted",
    })
  } catch (error) {
    console.log("error", error)
    if (error instanceof Error) return c.json({ message: error.message }, 500)

    return c.json({ message: "Failed to delete submission" }, 500)
  }
})
