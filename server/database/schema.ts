import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'
import type { InferSelectModel, InferInsertModel } from 'drizzle-orm'

export const users = sqliteTable('users', {
  id: integer().primaryKey({ autoIncrement: true }),
  googleId: text('googleid'),
  email: text().notNull(),
  name: text().notNull(),
  given_name: text().notNull(),
  family_name: text().notNull(),
  picture: text().notNull(),
  verified_email: integer(),
  stripeCustomerId: text('stripe_customer_id').unique(),
  subscriptionId: text('subscription_id'),
  subscriptionStatus: text('subscription_status'),
  priceId: text('price_id'),
  currentPeriodEnd: integer('current_period_end'),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date())
})

export type User = InferSelectModel<typeof users>
export type NewUser = InferInsertModel<typeof users>
