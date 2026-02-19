import type Stripe from 'stripe'
import { updateUserSubscription } from '../../database/queries/stripe'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const rawBody = await readRawBody(event, false)
  const signature = getHeader(event, 'stripe-signature')

  if (!rawBody || !signature) {
    throw createError({ statusCode: 400, statusMessage: 'Missing body or signature' })
  }

  let stripeEvent: Stripe.Event
  try {
    stripeEvent = stripe.webhooks.constructEvent(rawBody, signature, config.stripeWebhookSecret)
  } catch {
    throw createError({ statusCode: 400, statusMessage: 'Invalid webhook signature' })
  }

  switch (stripeEvent.type) {
    case 'checkout.session.completed': {
      const session = stripeEvent.data.object as Stripe.Checkout.Session
      if (session.mode === 'subscription' && session.customer && session.subscription) {
        const subscription = await stripe.subscriptions.retrieve(session.subscription as string)
        await updateUserSubscription(session.customer as string, {
          subscriptionId: subscription.id,
          subscriptionStatus: subscription.status,
          priceId: subscription.items.data[0]?.price.id,
          currentPeriodEnd: subscription.items.data[0]?.current_period_end
        })
      }
      break
    }

    case 'customer.subscription.updated': {
      const subscription = stripeEvent.data.object as Stripe.Subscription
      await updateUserSubscription(subscription.customer as string, {
        subscriptionId: subscription.id,
        subscriptionStatus: subscription.status,
        priceId: subscription.items.data[0]?.price.id,
        currentPeriodEnd: subscription.items.data[0]?.current_period_end
      })
      break
    }

    case 'customer.subscription.deleted': {
      const subscription = stripeEvent.data.object as Stripe.Subscription
      await updateUserSubscription(subscription.customer as string, {
        subscriptionStatus: 'canceled'
      })
      break
    }

    case 'invoice.payment_failed': {
      const invoice = stripeEvent.data.object as Stripe.Invoice
      if (invoice.customer) {
        await updateUserSubscription(invoice.customer as string, {
          subscriptionStatus: 'past_due'
        })
      }
      break
    }
  }

  return { received: true }
})
