import Nav from '@/components/nav'
import Footer from '@/components/footer'
import AppPushStrip from '@/components/app-push-strip'
import ScheduleClient from '@/components/schedule-client'
import { getUpcomingSchedules, groupSchedulesByDate, type ScheduleGroup } from '@/lib/data'

export const revalidate = 60 // ISR: revalidate every 60 seconds

export default async function SchedulePage() {
  let groups: ScheduleGroup[] = []
  try {
    const schedules = await getUpcomingSchedules()
    groups = groupSchedulesByDate(schedules)
  } catch {
    // If Supabase isn't connected, show empty state
    groups = []
  }

  return (
    <>
      <Nav />

      {/* Page hero */}
      <section
        style={{
          background: 'var(--bg)',
          paddingTop: '120px',
          paddingBottom: '48px',
          borderBottom: '1px solid var(--line)',
        }}
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0 24px',
          }}
        >
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '11px',
              letterSpacing: '0.2em',
              color: 'var(--accent)',
              textTransform: 'uppercase',
              marginBottom: '20px',
            }}
          >
            The Lab CT — Schedule
          </div>
          <h1
            style={{
              fontFamily: "'Azonix', 'Anton', 'Bebas Neue', Impact, sans-serif",
              fontSize: 'clamp(44px, 8vw, 96px)',
              lineHeight: 0.9,
              color: 'var(--ink)',
              marginBottom: '8px',
            }}
          >
            BOOK A
          </h1>
          <h1
            style={{
              fontFamily: "'Instrument Serif', Georgia, serif",
              fontStyle: 'italic',
              fontSize: 'clamp(44px, 8vw, 96px)',
              lineHeight: 0.9,
              background: 'linear-gradient(135deg, var(--accent) 0%, var(--accent-2) 50%, var(--accent-hot) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '28px',
            }}
          >
            single class.
          </h1>
          <p
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '16px',
              color: 'var(--ink-3)',
              maxWidth: '520px',
              lineHeight: '1.6',
            }}
          >
            Drop-in, pay per class. No membership required. Filter by style and pick a date that works for you.
          </p>
        </div>
      </section>

      {/* Schedule with client filter */}
      <section style={{ background: 'var(--bg)', minHeight: '60vh', paddingBottom: '80px' }}>
        <ScheduleClient groups={groups} />
      </section>

      <AppPushStrip />
      <Footer />
    </>
  )
}
