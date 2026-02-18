import { db } from '../../utils/db';
import { users } from '../../database/schema';
import { eq } from 'drizzle-orm';
import { GoogleUserInfo } from '../../../shared/types/google';

export const getUserByEmail = async (body: { email: string }) => {
  const user = await db.select().from(users).where(eq(users.email, body.email));
  if (user.length == 0) {
    return [];
  }
  return user;
};

export const saveUser = async (user: GoogleUserInfo) => {
  return await db
    .insert(users)
    .values({
      email: user.email,
      name: user.name,
      given_name: user.given_name,
      family_name: user.family_name,
      picture: user.picture,
      verified_email: user.verified_email ? 1 : 0,
      updatedAt: new Date(),
      googleId: user.id,
    })
    .returning({ userId: users.id });
};
