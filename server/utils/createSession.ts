import crypto from 'crypto';
import * as jose from 'jose';
import { errors } from 'jose';
import { th } from 'zod/v4/locales';
const secret = new TextEncoder().encode('cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f2');
const SITE_URL = process.env.SITE_URL || 'http://localhost:4242';

export const createSession = async (userId: number | undefined) => {
  const alg = 'HS256';

  const jwt = await new jose.SignJWT({ userId })
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setIssuer(SITE_URL)
    .setAudience(SITE_URL)
    .setExpirationTime('7days')
    .sign(secret);

  return jwt;
};

export const verifySession = async (token: string): Promise<string | null> => {
  try {
    const { payload } = await jose.jwtVerify(token, secret);
    return payload.userId as string;
  } catch (err) {
    if (err instanceof errors.JWTExpired) {
      throw new Error('Session expired');
    }
    return null;
  }
};
