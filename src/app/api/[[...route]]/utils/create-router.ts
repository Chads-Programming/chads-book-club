import { Hono } from "hono"
import type { ApiContext } from "@/api/types"

export const createRouter = () => new Hono<ApiContext>()
