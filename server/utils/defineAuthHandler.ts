import type { H3Event, H3EventContext } from 'h3'
import type { User } from '../database/schema'
import { users } from '../database/schema'
import { verifySession } from '../utils/createSession'
import { eq } from 'drizzle-orm'

type AuthenticatedEvent = H3Event & {
  context: H3EventContext & {
    user: User
  }
}

export default function defineAuthenticatedEventHandler<T>(handler: (event: AuthenticatedEvent) => T) {
  return defineEventHandler(async (event) => {
    const cookie = getCookie(event, 'session')
    if (!cookie) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Unauthorized'
      })
    }

    const verify = await verifySession(cookie)

    if (!verify) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Unauthorized'
      })
    }

    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, Number(verify)))
      .get()

    event.context.user = user

    return handler(event as AuthenticatedEvent)
  })
}
