export default defineAuthHandler(async (event) => {
  const user = event.context.user
  const config = useRuntimeConfig()
  const siteUrl = config.public.siteUrl || 'http://localhost:4242'

  if (!user.stripeCustomerId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'No billing account found'
    })
  }

  const session = await stripe.billingPortal.sessions.create({
    customer: user.stripeCustomerId,
    return_url: `${siteUrl}/settings`
  })

  return { url: session.url }
})
