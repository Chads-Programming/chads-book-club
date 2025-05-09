import { authRouter } from "./controllers/auth.controller"
import { bookRouter } from "./controllers/book.controller"
import { cronjobsRouter } from "./controllers/cronjobs.controller"
import { meRouter } from "./controllers/me.controller"
import { submissionsRouter } from "./controllers/submissions.controller"
import { userRouter } from "./controllers/user.controller"
import { createRouter } from "./utils/create-router"
import { checkEnv } from "./utils/env"

export const runtime = "edge"

const baseApp = createRouter()

checkEnv()
export const app = baseApp.basePath("/api")

app.get("/ok", (c) =>
  c.json({
    message: "ok",
  }),
)

app.route("/auth", authRouter)
app.route("/me", meRouter)
app.route("/books", bookRouter)
app.route("/submissions", submissionsRouter)
app.route("/cronjobs", cronjobsRouter)
app.route("/user", userRouter)
