import { Hono } from "hono"
import type { ApiContext } from "@/api/types/hono.type"

export const createRouter = () => new Hono<ApiContext>()
