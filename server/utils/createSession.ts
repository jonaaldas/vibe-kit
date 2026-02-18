import crypto from 'crypto';
import * as jose from 'jose';

const secret = new TextEncoder().encode('cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f2');
const SITE_URL = process.env.SITE_URL || 'http://localhost:4242';
export const createSession = async (userId: number | undefined) => {
  const alg = 'HS256';

  const jwt = await new jose.SignJWT({ userId })
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setIssuer(SITE_URL)
    .setAudience('urn:example:audience')
    .setExpirationTime('2h')
    .sign(secret);

  return jwt;
};

export const verifySession = async (token: string): Promise<string | null> => {
  try {
    const { payload } = await jose.jwtVerify(token, secret);
    console.log(payload);
    return payload.userId as string;
  } catch (error) {
    console.error(error);
    return null;
  }
};
