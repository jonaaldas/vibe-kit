import * as jose from 'jose'

const JWT_SECRET = process.env.JWT_SECRET
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is required')
}

const secret = new TextEncoder().encode(JWT_SECRET)
const SITE_URL = process.env.SITE_URL || 'http://localhost:4242'

export const createSession = async (userId: number | undefined) => {
  const jwt = await new jose.SignJWT({ userId })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setIssuer(SITE_URL)
    .setAudience(SITE_URL)
    .setExpirationTime('7days')
    .sign(secret)

  return jwt
}

export const verifySession = async (token: string): Promise<string | null> => {
  try {
    const { payload } = await jose.jwtVerify(token, secret)
    return payload.userId as string
  } catch {
    return null
  }
}
