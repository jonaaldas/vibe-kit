import { getUserByEmail, saveUser } from '../../database/queries/user';
import type { GoogleTokenResponse, GoogleUserInfo } from '~~/shared/types/google';
import { z } from 'zod';

export default defineEventHandler(async (event) => {
  const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
  const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;
  const SITE_URL = process.env.SITE_URL || 'http://localhost:4242';

  const oauthSchema = z.object({
    code: z.string(),
  });

  const { code } = await readValidatedBody(event, oauthSchema.parse);

  const tokenRes = await $fetch<GoogleTokenResponse>('https://oauth2.googleapis.com/token' as string, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      code,
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_CLIENT_SECRET,
      redirect_uri: `${SITE_URL}/auth/callback`,
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
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  });

  return { res: true };
});
