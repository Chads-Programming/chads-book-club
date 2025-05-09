import { userMiddleware } from "../middlewares/user.middleware"
import { findUser } from "../services/user.service"
import { createRouter } from "../utils/create-router"

export const userRouter = createRouter()

userRouter.use("/*", userMiddleware)

userRouter.get("/:id", async (c) => {
  const { id } = c.req.param()
  const user = await findUser(id)

  return c.json({
    message: "User found",
    data: user,
  })
})
