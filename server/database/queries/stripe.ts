import { eq } from 'drizzle-orm'
import { db } from '../../utils/db'
import { users } from '../schema'

export async function updateUserStripeCustomer(userId: number, stripeCustomerId: string) {
  return db
    .update(users)
    .set({ stripeCustomerId })
    .where(eq(users.id, userId))
}

export async function updateUserSubscription(
  stripeCustomerId: string,
  data: {
    subscriptionId?: string
    subscriptionStatus?: string
    priceId?: string
    currentPeriodEnd?: number
  }
) {
  return db
    .update(users)
    .set(data)
    .where(eq(users.stripeCustomerId, stripeCustomerId))
}

export async function getUserByStripeCustomerId(stripeCustomerId: string) {
  const result = await db
    .select()
    .from(users)
    .where(eq(users.stripeCustomerId, stripeCustomerId))
  return result[0] ?? null
}
