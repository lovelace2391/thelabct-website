import Stripe from 'stripe'

export const runtime = 'nodejs'

export async function POST(req: Request) {
  try {
    const stripeKey = process.env.STRIPE_SECRET_KEY
    if (!stripeKey) {
      return Response.json({ error: 'Payment service not configured' }, { status: 503 })
    }

    const stripe = new Stripe(stripeKey)
    const { scheduleId, classId, amount } = await req.json()

    if (!amount || typeof amount !== 'number') {
      return Response.json({ error: 'Invalid amount' }, { status: 400 })
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
      metadata: {
        scheduleId: scheduleId ?? '',
        classId: classId ?? '',
      },
    })

    return Response.json({ clientSecret: paymentIntent.client_secret })
  } catch (err) {
    console.error('Payment intent error:', err)
    return Response.json({ error: 'Failed to create payment intent' }, { status: 500 })
  }
}
