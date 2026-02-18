import { getUserByEmail, saveUser } from '../../database/queries/user';
import type { GoogleTokenResponse, GoogleUserInfo } from '~~/shared/types/google';
import { z } from 'zod';

export default defineEventHandler(async (event) => {
  const CLIENT_ID = process.env.CLIENT_ID!;
  const REDIRECT_URL = process.env.REDIRECT_URL!;
  const CLIENT_SECRET = 'YOUR_CLIENT_SECRET';

  const oauthSchema = z.object({
    code: z.string(),
  });

  const { code } = await readValidatedBody(event, oauthSchema.parse);

  const tokenRes = await $fetch<GoogleTokenResponse>('https://oauth2.googleapis.com/token' as string, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      code,
      client_id:
        process.env.GOOGLE_CLIENT_ID || 'REDACTED_GOOGLE_CLIENT_ID',
      client_secret: process.env.GOOGLE_CLIENT_SECRET || 'REDACTED_GOOGLE_CLIENT_SECRET',
      redirect_uri: 'http://localhost:4242/auth/callback',
      grant_type: 'authorization_code',
    }).toString(),
  }).catch((err) => {
    console.error('Google token error:', err.data);
    throw err;
  });

  const user = await $fetch<GoogleUserInfo>('https://www.googleapis.com/oauth2/v2/userinfo' as string, {
    headers: {
      Authorization: `Bearer ${tokenRes.access_token}`,
    },
  });

  const existingUser = await getUserByEmail({ email: user.email });

  let userId: number | undefined;
  if (!existingUser) {
    const res = await saveUser(user);
    if (res.length === 0) {
      console.error('Error saving user:', res);
      throw new Error('Failed to save user');
    }
    userId = res[0]?.userId;
  } else {
    userId = existingUser[0]?.id;
  }

  const sessionToken = await createSession(userId);

  setCookie(event, 'session', sessionToken, {
    httpOnly: true, // Can't be accessed by JavaScript (XSS protection)
    secure: true, // Only sent over HTTPS
    sameSite: 'lax', // CSRF protection
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  });

  return { res: true };
});
