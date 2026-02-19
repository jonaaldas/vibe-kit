import { loadStripe } from '@stripe/stripe-js'
import type { Stripe } from '@stripe/stripe-js'

let stripePromise: Promise<Stripe | null> | null = null

export function useStripe() {
  const config = useRuntimeConfig()

  function getStripe() {
    if (!stripePromise) {
      stripePromise = loadStripe(config.public.stripePublishableKey)
    }
    return stripePromise
  }

  return { getStripe }
}
