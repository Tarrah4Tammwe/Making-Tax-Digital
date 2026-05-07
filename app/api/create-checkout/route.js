// app/api/create-checkout/route.js
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export async function POST(request) {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'gbp',
            product_data: {
              name: 'MTD Preparation Checklist',
              description: 'Personalised month-by-month MTD action plan. Instant PDF download.',
            },
            unit_amount: 499, // £4.99 in pence
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      // Zero data storage: no customer_email collection, no database
      // Stripe handles payment — we never see name, email, or card details
      success_url: `${process.env.NEXT_PUBLIC_URL}/checkout-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/premium-checklist`,
    })

    return Response.json({ url: session.url })
  } catch (error) {
    console.error('Stripe error:', error)
    return Response.json({ error: 'Failed to create checkout session' }, { status: 500 })
  }
}
