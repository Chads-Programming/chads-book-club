import { userMiddleware } from "@/api/middlewares/user.middleware"
import { createRouter } from "@/api/utils/create-router"

export const bookRouter = createRouter()

bookRouter.use("/*", userMiddleware)

bookRouter.get("/", (c) => {
  return c.json({
    message: "Books!",
  })
})
