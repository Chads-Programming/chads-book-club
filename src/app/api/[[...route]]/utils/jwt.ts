import * as jose from "jose"

const alg = "HS256"
const expirationTime = "2h"

// biome-ignore lint/suspicious/noExplicitAny: <Necessary to allow decode reusage for different payloads >
export const signJwt = async (payload: any, secret: string) => {
  const encondedSecret = new TextEncoder().encode(secret)

  const jwt = await new jose.SignJWT(payload)
    .setProtectedHeader({ alg })
    .setExpirationTime(expirationTime)
    .sign(encondedSecret)

  return jwt
}
// biome-ignore lint/suspicious/noExplicitAny: <Necessary to allow decode reusage for different payloads >
export const decodeJwt = async <T = any>(jwt: string) => {
  const decoded: T = jose.decodeJwt(jwt)

  return decoded
}

// biome-ignore lint/suspicious/noExplicitAny: <Necessary to allow decode reusage for different payloads >
export const verifyJwt = async <T = any>(jwt: string, secret: string) => {
  const encondedSecret = new TextEncoder().encode(secret)
  const decoded = await jose.jwtVerify<T>(jwt, encondedSecret, {
    algorithms: [alg],
    maxTokenAge: expirationTime,
  })

  return decoded
}
