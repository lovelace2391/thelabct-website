import { Suspense } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import CheckoutForm from '@/components/checkout-form'
import { getClassById, getUpcomingSchedules } from '@/lib/data'

export const dynamic = 'force-dynamic'

interface Props {
  searchParams: Promise<{ schedule?: string; class?: string }>
}

function formatDateStr(dateStr: string) {
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
}

function formatTime(timeStr: string | undefined) {
  if (!timeStr) return ''
  const [h, m] = timeStr.split(':')
  const hour = parseInt(h)
  const ampm = hour >= 12 ? 'PM' : 'AM'
  const hour12 = hour % 12 || 12
  return `${hour12}:${m} ${ampm}`
}

async function CheckoutContent({ scheduleId, classId }: { scheduleId: string; classId: string }) {
  let cls = null
  let schedule = null

  try {
    cls = await getClassById(classId)
    const schedules = await getUpcomingSchedules()
    schedule = schedules.find((s) => s.id === scheduleId) ?? null
  } catch {
    // Will show error state
  }

  if (!cls || !schedule) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 24px', color: 'var(--ink-3)' }}>
        <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '16px', marginBottom: '16px' }}>
          We couldn&apos;t find this class. Please go back and select again.
        </p>
        <Link href="/schedule">
          <button className="btn-accent">Browse schedule</button>
        </Link>
      </div>
    )
  }

  const order = {
    className: cls.name,
    style: cls.style,
    instructorName: cls.instructor_name,
    date: formatDateStr(schedule.date),
    time: formatTime(cls.start_time),
    priceCents: cls.base_price_cents,
    flyerUrl: cls.flyer_url,
    scheduleId: schedule.id,
    classId: cls.id,
  }

  return <CheckoutForm order={order} />
}

export default async function CheckoutPage({ searchParams }: Props) {
  const { schedule: scheduleId, class: classId } = await searchParams

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Stripped header */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          background: 'rgba(0,0,0,0.92)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid var(--line)',
          padding: '0 24px',
          height: '60px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Link href="/schedule" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: 'var(--ink-3)', fontSize: '18px' }}>←</span>
          <span
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '14px',
              color: 'var(--ink-3)',
            }}
          >
            Back to schedule
          </span>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#22c55e',
              animation: 'pulse 2s infinite',
            }}
          />
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '10px',
              letterSpacing: '0.12em',
              color: 'var(--ink-3)',
              textTransform: 'uppercase',
            }}
          >
            Secure Checkout · Powered by Stripe
          </span>
        </div>

        <Image
          src="/images/lab-symbol-color.png"
          alt="The Lab CT"
          width={28}
          height={28}
          style={{ objectFit: 'contain' }}
        />
      </header>

      {/* Hero */}
      <div
        style={{
          maxWidth: '1000px',
          margin: '0 auto',
          padding: '60px 24px 0',
        }}
      >
        <h1
          style={{
            fontFamily: "'Azonix', 'Anton', 'Bebas Neue', Impact, sans-serif",
            fontSize: 'clamp(48px, 8vw, 96px)',
            lineHeight: 0.88,
            color: 'var(--ink)',
            marginBottom: '8px',
          }}
        >
          ALMOST IN.
        </h1>
        <p
          style={{
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontStyle: 'italic',
            fontSize: '20px',
            color: 'var(--ink-3)',
            marginBottom: '48px',
          }}
        >
          Complete your booking below.
        </p>

        {scheduleId && classId ? (
          <Suspense
            fallback={
              <div
                style={{
                  textAlign: 'center',
                  padding: '60px',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '12px',
                  letterSpacing: '0.1em',
                  color: 'var(--ink-3)',
                }}
              >
                LOADING...
              </div>
            }
          >
            <CheckoutContent scheduleId={scheduleId} classId={classId} />
          </Suspense>
        ) : (
          <div style={{ textAlign: 'center', padding: '80px 24px' }}>
            <p
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '16px',
                color: 'var(--ink-3)',
                marginBottom: '20px',
              }}
            >
              No class selected. Please choose a class from the schedule.
            </p>
            <Link href="/schedule">
              <button className="btn-accent">Browse schedule</button>
            </Link>
          </div>
        )}

        <div style={{ height: '80px' }} />
      </div>
    </div>
  )
}
