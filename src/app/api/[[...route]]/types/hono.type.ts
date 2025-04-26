import type { JwtVariables } from "hono/jwt"

export type Env = {
  JWT_SECRET: string
}
export type Variables = JwtVariables

export type ApiContext = { Variables: Variables; Bindings: Env }
