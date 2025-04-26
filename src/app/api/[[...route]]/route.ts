import { handle } from "hono/vercel"
import { app } from "@/api/main"

export const GET = handle(app)
export const POST = handle(app)
