import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import type { InferSelectModel, InferInsertModel } from 'drizzle-orm';

export const users = sqliteTable('users', {
  id: integer().primaryKey({ autoIncrement: true }),
  googleId: text('googleid'), // Google's user ID (for account linking)
  email: text().notNull(),
  name: text().notNull(),
  given_name: text().notNull(),
  family_name: text().notNull(),
  picture: text().notNull(),
  verified_email: integer(),
  updatedAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});

// ✅ Type for SELECT (reading from DB)
export type User = InferSelectModel<typeof users>;

// ✅ Type for INSERT (creating new user)
export type NewUser = InferInsertModel<typeof users>;
