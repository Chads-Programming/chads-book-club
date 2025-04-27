import * as jose from "jose"

const alg = "HS256"
const expirationTime = "2h"

// biome-ignore lint/suspicious/noExplicitAny: <Necessary to allow decode reusage for different payloads >
type Payload = Record<string, any>

export const signJwt = async (payload: Payload, secret: string) => {
  const encondedSecret = new TextEncoder().encode(secret)

  const jwt = await new jose.SignJWT(payload)
    .setIssuedAt()
    .setProtectedHeader({ alg })
    .setExpirationTime(expirationTime)
    .sign(encondedSecret)

  return jwt
}

export const decodeJwt = async <T = Payload>(jwt: string) => {
  const decoded: T = jose.decodeJwt(jwt)

  return decoded
}

export const verifyJwt = async <T = Payload>(jwt: string, secret: string) => {
  const encondedSecret = new TextEncoder().encode(secret)
  const decoded = await jose.jwtVerify<T>(jwt, encondedSecret, {
    algorithms: [alg],
    maxTokenAge: expirationTime,
  })

  return decoded
}
