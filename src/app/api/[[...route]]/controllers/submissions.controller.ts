import { createRouter } from "@/api/utils/create-router"
import { userMiddleware } from "../middlewares/user.middleware"
import { zValidator } from "@hono/zod-validator"
import { bookSubmitDto } from "../dtos/book-submit.dto"
import prisma from "../db/prisma"
import type { UserPayload } from "../types/user-payload.type"
import { submitBook } from "../services/book.service"


export const submissionsRouter = createRouter()

submissionsRouter.use("/*", userMiddleware)

submissionsRouter.get("/", async (c) => {
  const submissions = await prisma.bookSubmission.findMany({
    include:{
        _count:{
            select:{
                votes: true
            }
        }
    }
  })
  return c.json({
    message: "Submissions Found",
    data: submissions,

  })
})

submissionsRouter.post("/submit-book", zValidator("json", bookSubmitDto), async (c) => {
    const user: UserPayload | null = c.get("jwtPayload")
    const book = c.req.valid("json")
  
    const bookSubmit = await submitBook(book)
  
    return c.json({
      message: "Book Submitted",
      data: bookSubmit,
    })
  })
