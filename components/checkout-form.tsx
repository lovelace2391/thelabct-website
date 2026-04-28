'use client'

import { useState, useEffect } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js'
import { useRouter } from 'next/navigation'

const stripePromise = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  ? loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  : null

interface OrderSummary {
  className: string
  style: string
  instructorName: string
  date: string
  time: string
  priceCents: number
  flyerUrl?: string | null
  scheduleId: string
  classId: string
}

interface PaymentFormProps {
  order: OrderSummary
}

function PaymentForm({ order }: PaymentFormProps) {
  const stripe = useStripe()
  const elements = useElements()
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [reminderOptIn, setReminderOptIn] = useState(true)
  const [waiverAccepted, setWaiverAccepted] = useState(false)
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const price = order.priceCents / 100
  const fee = Math.ceil(order.priceCents * 0.029 + 30) / 100
  const total = price + fee

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!stripe || !elements || !waiverAccepted) return
    setProcessing(true)
    setError(null)

    const { error: submitError } = await elements.submit()
    if (submitError) {
      setError(submitError.message ?? 'Payment failed')
      setProcessing(false)
      return
    }

    const { error: confirmError, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/confirmation`,
        payment_method_data: {
          billing_details: { name, email, phone },
        },
      },
      redirect: 'if_required',
    })

    if (confirmError) {
      setError(confirmError.message ?? 'Payment failed')
      setProcessing(false)
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      router.push(`/confirmation?ref=${paymentIntent.id.slice(-8).toUpperCase()}`)
    }
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 380px',
        gap: '48px',
        maxWidth: '1000px',
        margin: '0 auto',
      }}
      className="checkout-grid"
    >
      {/* Left: Form */}
      <form onSubmit={handleSubmit}>
        {/* Your Info */}
        <div style={{ marginBottom: '40px' }}>
          <h2
            style={{
              fontFamily: "'Azonix', 'Anton', sans-serif",
              fontSize: '20px',
              color: 'var(--ink)',
              letterSpacing: '0.06em',
              marginBottom: '20px',
            }}
          >
            YOUR INFO
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {[
              { label: 'Full Name', value: name, onChange: setName, type: 'text', placeholder: 'Jane Smith', required: true },
              { label: 'Email', value: email, onChange: setEmail, type: 'email', placeholder: 'jane@example.com', required: true },
              { label: 'Phone', value: phone, onChange: setPhone, type: 'tel', placeholder: '(203) 555-0100', required: false },
            ].map((field) => (
              <div key={field.label}>
                <label
                  style={{
                    display: 'block',
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '10px',
                    color: 'var(--ink-3)',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    marginBottom: '6px',
                  }}
                >
                  {field.label}
                </label>
                <input
                  type={field.type}
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  placeholder={field.placeholder}
                  required={field.required}
                  style={{
                    width: '100%',
                    background: 'var(--bg-2)',
                    border: '1px solid var(--line-2)',
                    borderRadius: '8px',
                    padding: '12px 14px',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '15px',
                    color: 'var(--ink)',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
                  onBlur={(e) => (e.target.style.borderColor = 'var(--line-2)')}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Payment */}
        <div style={{ marginBottom: '32px' }}>
          <h2
            style={{
              fontFamily: "'Azonix', 'Anton', sans-serif",
              fontSize: '20px',
              color: 'var(--ink)',
              letterSpacing: '0.06em',
              marginBottom: '20px',
            }}
          >
            PAYMENT
          </h2>
          <div
            style={{
              background: 'var(--bg-2)',
              border: '1px solid var(--line-2)',
              borderRadius: '10px',
              padding: '20px',
            }}
          >
            <PaymentElement
              options={{
                layout: 'tabs',
              }}
            />
          </div>
        </div>

        {/* Checkboxes */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '28px' }}>
          {[
            { id: 'reminder', checked: reminderOptIn, onChange: setReminderOptIn, label: 'Send me class reminders and updates via email' },
            { id: 'waiver', checked: waiverAccepted, onChange: setWaiverAccepted, label: 'I agree to the participation waiver and understand I must arrive 5 minutes early' },
          ].map((cb) => (
            <label
              key={cb.id}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '10px',
                cursor: 'pointer',
              }}
            >
              <input
                type="checkbox"
                checked={cb.checked}
                onChange={(e) => cb.onChange(e.target.checked)}
                style={{ marginTop: '2px', accentColor: 'var(--accent)' }}
              />
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '13px',
                  color: 'var(--ink-3)',
                  lineHeight: '1.5',
                }}
              >
                {cb.label}
              </span>
            </label>
          ))}
        </div>

        {error && (
          <div
            style={{
              background: 'rgba(239,68,68,0.1)',
              border: '1px solid rgba(239,68,68,0.3)',
              borderRadius: '8px',
              padding: '12px 16px',
              marginBottom: '20px',
              fontFamily: "'Inter', sans-serif",
              fontSize: '14px',
              color: '#f87171',
            }}
          >
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={processing || !waiverAccepted || !stripe}
          style={{
            width: '100%',
            background: processing ? 'var(--accent-deep)' : 'var(--accent)',
            color: '#fff',
            border: 'none',
            borderRadius: '10px',
            padding: '16px',
            fontFamily: "'Azonix', 'Anton', sans-serif",
            fontSize: '16px',
            letterSpacing: '0.06em',
            cursor: processing || !waiverAccepted ? 'not-allowed' : 'pointer',
            opacity: !waiverAccepted ? 0.6 : 1,
            transition: 'all 0.2s',
          }}
        >
          {processing ? 'PROCESSING...' : `PAY $${total.toFixed(2)}`}
        </button>

        <p
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '10px',
            color: 'var(--ink-4)',
            letterSpacing: '0.08em',
            textAlign: 'center',
            marginTop: '12px',
          }}
        >
          SECURED BY STRIPE · 256-BIT ENCRYPTION
        </p>
      </form>

      {/* Right: Order summary */}
      <div
        style={{
          position: 'sticky',
          top: '80px',
          height: 'fit-content',
        }}
      >
        <div
          style={{
            background: 'var(--bg-2)',
            border: '1px solid var(--line-2)',
            borderRadius: '16px',
            overflow: 'hidden',
          }}
        >
          {/* Flyer */}
          <div
            style={{
              height: '160px',
              background: order.flyerUrl
                ? `url(${order.flyerUrl}) center/cover no-repeat`
                : 'linear-gradient(135deg, var(--bg-3) 0%, var(--accent-deep) 100%)',
              position: 'relative',
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, var(--bg-2) 0%, transparent 60%)',
              }}
            />
          </div>

          <div style={{ padding: '20px' }}>
            <span
              className="pill"
              style={{
                background: 'rgba(139,92,246,0.15)',
                color: 'var(--accent-2)',
                border: '1px solid rgba(139,92,246,0.25)',
                fontSize: '9px',
                marginBottom: '8px',
                display: 'inline-flex',
              }}
            >
              {order.style}
            </span>
            <h3
              style={{
                fontFamily: "'Azonix', 'Anton', sans-serif",
                fontSize: '18px',
                color: 'var(--ink)',
                letterSpacing: '0.04em',
                marginBottom: '6px',
              }}
            >
              {order.className}
            </h3>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '13px',
                color: 'var(--ink-3)',
                marginBottom: '4px',
              }}
            >
              {order.date} · {order.time}
            </p>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '13px',
                color: 'var(--ink-3)',
                marginBottom: '20px',
              }}
            >
              with {order.instructorName}
            </p>

            {/* Line items */}
            <div
              style={{
                borderTop: '1px solid var(--line)',
                paddingTop: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              {[
                { label: 'Class fee', value: `$${price.toFixed(2)}` },
                { label: 'Processing fee', value: `$${fee.toFixed(2)}` },
              ].map((item) => (
                <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '13px',
                      color: 'var(--ink-3)',
                    }}
                  >
                    {item.label}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: '13px',
                      color: 'var(--ink-2)',
                      fontWeight: 500,
                    }}
                  >
                    {item.value}
                  </span>
                </div>
              ))}
              <div
                style={{
                  borderTop: '1px solid var(--line)',
                  paddingTop: '10px',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <span
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '15px',
                    fontWeight: 700,
                    color: 'var(--ink)',
                  }}
                >
                  Total
                </span>
                <span
                  style={{
                    fontFamily: "'Azonix', 'Anton', sans-serif",
                    fontSize: '18px',
                    color: 'var(--accent)',
                  }}
                >
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>

            {/* App upsell */}
            <div
              style={{
                marginTop: '20px',
                background: 'rgba(139,92,246,0.08)',
                border: '1px solid rgba(139,92,246,0.2)',
                borderRadius: '10px',
                padding: '14px',
              }}
            >
              <p
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '12px',
                  fontWeight: 600,
                  color: 'var(--accent-2)',
                  marginBottom: '4px',
                }}
              >
                Save 30% with the app
              </p>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '12px',
                  color: 'var(--ink-3)',
                }}
              >
                5-class packs and memberships save you money every session.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

interface CheckoutFormProps {
  order: OrderSummary
}

export default function CheckoutForm({ order }: CheckoutFormProps) {
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [err, setErr] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        scheduleId: order.scheduleId,
        classId: order.classId,
        amount: order.priceCents,
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.clientSecret) setClientSecret(data.clientSecret)
        else setErr('Unable to initialize payment. Please try again.')
        setLoading(false)
      })
      .catch(() => {
        setErr('Unable to connect to payment service.')
        setLoading(false)
      })
  }, [order.priceCents, order.classId, order.scheduleId])

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '80px', color: 'var(--ink-3)' }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', letterSpacing: '0.1em' }}>
          INITIALIZING PAYMENT...
        </div>
      </div>
    )
  }

  if (err || !clientSecret || !stripePromise) {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '80px',
          color: '#f87171',
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {err ?? 'Payment service is not available. Please try again later.'}
      </div>
    )
  }

  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
        appearance: {
          theme: 'night',
          variables: {
            colorPrimary: '#8B5CF6',
            colorBackground: '#111114',
            colorText: '#ffffff',
            colorDanger: '#ef4444',
            fontFamily: "'Inter', system-ui, sans-serif",
            borderRadius: '8px',
          },
        },
      }}
    >
      <PaymentForm order={order} />
    </Elements>
  )
}
