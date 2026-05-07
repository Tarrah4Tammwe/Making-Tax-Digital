// app/api/verify-payment/route.js
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const sessionId = searchParams.get('session_id')

  if (!sessionId) {
    return Response.json({ valid: false }, { status: 400 })
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId)

    if (session.payment_status === 'paid') {
      return Response.json({ valid: true })
    } else {
      return Response.json({ valid: false })
    }
  } catch (error) {
    return Response.json({ valid: false }, { status: 400 })
  }
}
