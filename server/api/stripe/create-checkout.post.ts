import { z } from 'zod'
import { updateUserStripeCustomer } from '../../database/queries/stripe'

const bodySchema = z.object({
  priceId: z.string()
})

export default defineAuthHandler(async (event) => {
  const { priceId } = await readValidatedBody(event, bodySchema.parse)
  const user = event.context.user
  const config = useRuntimeConfig()
  const siteUrl = config.public.siteUrl || 'http://localhost:4242'

  let customerId = user.stripeCustomerId

  if (!customerId) {
    const customer = await stripe.customers.create({
      email: user.email,
      name: user.name,
      metadata: { userId: String(user.id) }
    })
    customerId = customer.id
    await updateUserStripeCustomer(user.id, customerId)
  }

  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: 'subscription',
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${siteUrl}/settings?checkout=success`,
    cancel_url: `${siteUrl}/pricing?checkout=canceled`
  })

  return { url: session.url }
})
