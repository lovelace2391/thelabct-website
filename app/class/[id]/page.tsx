import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import Nav from '@/components/nav'
import Footer from '@/components/footer'
import { getClassById, getSchedulesForClass, formatPrice, spotsLabel, spotsColor } from '@/lib/data'

export const revalidate = 60

interface Props {
  params: Promise<{ id: string }>
  searchParams: Promise<{ schedule?: string }>
}

function formatTime(timeStr: string | undefined) {
  if (!timeStr) return ''
  const [h, m] = timeStr.split(':')
  const hour = parseInt(h)
  const ampm = hour >= 12 ? 'PM' : 'AM'
  const hour12 = hour % 12 || 12
  return `${hour12}:${m} ${ampm}`
}

function formatDateButton(dateStr: string) {
  const d = new Date(dateStr + 'T00:00:00')
  return {
    month: d.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
    day: d.getDate(),
    weekday: d.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase(),
    full: d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
  }
}

export default async function ClassDetailPage({ params, searchParams }: Props) {
  let cls = null
  let schedules: Awaited<ReturnType<typeof getSchedulesForClass>> = []

  const { id: classId } = await params
  const { schedule: selectedScheduleId } = await searchParams

  try {
    cls = await getClassById(classId)
    if (!cls) notFound()
    schedules = await getSchedulesForClass(classId)
  } catch {
    notFound()
  }

  const selectedSchedule = schedules.find((s) => s.id === selectedScheduleId) ?? schedules[0]

  const WHAT_TO_BRING = [
    'Comfortable clothes you can move in',
    'The right footwear for your style (heels, sneakers, or bare feet)',
    'Water bottle',
    'Positive attitude — leave your ego at the door',
  ]

  return (
    <>
      <Nav />

      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '100px 24px 80px',
          display: 'grid',
          gridTemplateColumns: '1fr 380px',
          gap: '64px',
          alignItems: 'start',
        }}
        className="class-detail-grid"
      >
        {/* LEFT */}
        <div>
          {/* Breadcrumb */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '32px',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '11px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            <Link href="/schedule" style={{ color: 'var(--ink-4)', textDecoration: 'none' }}>
              Schedule
            </Link>
            <span style={{ color: 'var(--ink-4)' }}>/</span>
            <span style={{ color: 'var(--accent)' }}>{cls!.style}</span>
            <span style={{ color: 'var(--ink-4)' }}>/</span>
            <span style={{ color: 'var(--ink-3)' }}>{cls!.name}</span>
          </div>

          {/* Tags */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
            {[cls!.style, cls!.level, `${cls!.duration_minutes} min`].map((tag) => (
              <span
                key={tag}
                className="pill"
                style={{
                  background: 'rgba(139,92,246,0.1)',
                  color: 'var(--accent-2)',
                  border: '1px solid rgba(139,92,246,0.2)',
                  fontSize: '11px',
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Class name */}
          <h1
            style={{
              fontFamily: "'Azonix', 'Anton', 'Bebas Neue', Impact, sans-serif",
              fontSize: 'clamp(40px, 6vw, 72px)',
              lineHeight: 0.9,
              color: 'var(--ink)',
              marginBottom: '12px',
            }}
          >
            {cls!.name.toUpperCase()}
          </h1>

          {/* Instructor */}
          <p
            style={{
              fontFamily: "'Instrument Serif', Georgia, serif",
              fontStyle: 'italic',
              fontSize: '22px',
              color: 'var(--accent-2)',
              marginBottom: '36px',
            }}
          >
            with {cls!.instructor_name}
          </p>

          {/* Flyer image */}
          {cls!.flyer_url && (
            <div
              style={{
                borderRadius: '12px',
                overflow: 'hidden',
                marginBottom: '40px',
                border: '1px solid var(--line)',
                aspectRatio: '3/4',
                position: 'relative',
                maxWidth: '480px',
              }}
            >
              <Image
                src={cls!.flyer_url}
                alt={cls!.name}
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
          )}

          {/* About */}
          <div style={{ marginBottom: '40px' }}>
            <h3
              style={{
                fontFamily: "'Azonix', 'Anton', sans-serif",
                fontSize: '16px',
                letterSpacing: '0.1em',
                color: 'var(--ink)',
                marginBottom: '14px',
              }}
            >
              ABOUT THIS CLASS
            </h3>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '16px',
                color: 'var(--ink-2)',
                lineHeight: '1.7',
              }}
            >
              {cls!.description ?? `${cls!.name} is a ${cls!.level.toLowerCase()} level ${cls!.style} class taught by ${cls!.instructor_name}. This ${cls!.duration_minutes}-minute session is designed to challenge and inspire dancers at every stage of their journey.`}
            </p>
          </div>

          {/* What to bring */}
          <div>
            <h3
              style={{
                fontFamily: "'Azonix', 'Anton', sans-serif",
                fontSize: '16px',
                letterSpacing: '0.1em',
                color: 'var(--ink)',
                marginBottom: '16px',
              }}
            >
              WHAT TO BRING
            </h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {WHAT_TO_BRING.map((item) => (
                <li
                  key={item}
                  style={{
                    display: 'flex',
                    gap: '12px',
                    alignItems: 'flex-start',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '15px',
                    color: 'var(--ink-2)',
                    lineHeight: '1.5',
                  }}
                >
                  <span style={{ color: 'var(--accent)', marginTop: '3px', flexShrink: 0 }}>◆</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* RIGHT: sticky sidebar */}
        <div style={{ position: 'sticky', top: '80px' }}>
          <div
            style={{
              background: 'var(--bg-2)',
              border: '1px solid var(--line-2)',
              borderRadius: '16px',
              padding: '28px',
            }}
          >
            <h3
              style={{
                fontFamily: "'Azonix', 'Anton', sans-serif",
                fontSize: '14px',
                letterSpacing: '0.1em',
                color: 'var(--ink)',
                marginBottom: '18px',
              }}
            >
              PICK A DATE
            </h3>

            {/* Date grid */}
            {schedules.length === 0 ? (
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '14px',
                  color: 'var(--ink-3)',
                  marginBottom: '20px',
                }}
              >
                No upcoming dates. Check back soon.
              </p>
            ) : (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '8px',
                  marginBottom: '24px',
                }}
              >
                {schedules.slice(0, 9).map((schedule) => {
                  const dt = formatDateButton(schedule.date)
                  const cls = schedule.dance_classes
                  const spotsLbl = spotsLabel(cls.capacity, schedule.booking_count ?? 0)
                  const spotsClr = spotsColor(cls.capacity, schedule.booking_count ?? 0)
                  const isSelected = schedule.id === (selectedSchedule?.id ?? '')
                  const isFull = spotsLbl === 'FULL'

                  return (
                    <Link
                      key={schedule.id}
                      href={`/class/${classId}?schedule=${schedule.id}`}
                      style={{ textDecoration: 'none' }}
                    >
                      <div
                        style={{
                          borderRadius: '10px',
                          padding: '10px 8px',
                          textAlign: 'center',
                          border: `1px solid ${isSelected ? 'var(--accent)' : 'var(--line)'}`,
                          background: isSelected ? 'rgba(139,92,246,0.1)' : 'transparent',
                          cursor: isFull ? 'not-allowed' : 'pointer',
                          opacity: isFull ? 0.4 : 1,
                          transition: 'all 0.15s',
                        }}
                      >
                        <div
                          style={{
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: '8px',
                            color: 'var(--ink-4)',
                            letterSpacing: '0.1em',
                            marginBottom: '2px',
                          }}
                        >
                          {dt.month}
                        </div>
                        <div
                          style={{
                            fontFamily: "'Azonix', 'Anton', sans-serif",
                            fontSize: '22px',
                            color: isSelected ? 'var(--accent)' : 'var(--ink)',
                            lineHeight: 1,
                            marginBottom: '2px',
                          }}
                        >
                          {dt.day}
                        </div>
                        <div
                          style={{
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: '8px',
                            color: 'var(--ink-3)',
                            letterSpacing: '0.06em',
                            marginBottom: '4px',
                          }}
                        >
                          {dt.weekday} · {formatTime(cls.start_time)}
                        </div>
                        <div
                          style={{
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: '8px',
                            color: spotsClr,
                            letterSpacing: '0.06em',
                          }}
                        >
                          {spotsLbl}
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            )}

            {/* Price + book */}
            {selectedSchedule && (
              <>
                <div
                  style={{
                    borderTop: '1px solid var(--line)',
                    paddingTop: '20px',
                    marginBottom: '16px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: '10px',
                        color: 'var(--ink-4)',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        marginBottom: '4px',
                      }}
                    >
                      Drop-in price
                    </div>
                    <div
                      style={{
                        fontFamily: "'Azonix', 'Anton', sans-serif",
                        fontSize: '32px',
                        color: 'var(--ink)',
                      }}
                    >
                      {formatPrice(selectedSchedule.dance_classes.base_price_cents)}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: '10px',
                        color: 'var(--ink-4)',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        marginBottom: '4px',
                      }}
                    >
                      Duration
                    </div>
                    <div
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: '16px',
                        fontWeight: 600,
                        color: 'var(--ink-2)',
                      }}
                    >
                      {selectedSchedule.dance_classes.duration_minutes} min
                    </div>
                  </div>
                </div>

                <Link
                  href={`/checkout?schedule=${selectedSchedule.id}&class=${classId}`}
                  style={{ display: 'block', textDecoration: 'none' }}
                >
                  <button
                    className="btn-accent"
                    style={{
                      width: '100%',
                      padding: '14px',
                      fontSize: '15px',
                      textAlign: 'center',
                      fontFamily: "'Azonix', 'Anton', sans-serif",
                      letterSpacing: '0.06em',
                    }}
                    disabled={spotsLabel(selectedSchedule.dance_classes.capacity, selectedSchedule.booking_count ?? 0) === 'FULL'}
                  >
                    BOOK THIS CLASS →
                  </button>
                </Link>
              </>
            )}

            {/* App upsell card */}
            <div
              style={{
                marginTop: '16px',
                background: 'rgba(139,92,246,0.08)',
                border: '1px solid rgba(139,92,246,0.18)',
                borderRadius: '10px',
                padding: '14px',
              }}
            >
              <div
                style={{
                  fontFamily: "'Azonix', 'Anton', sans-serif",
                  fontSize: '12px',
                  color: 'var(--accent)',
                  letterSpacing: '0.06em',
                  marginBottom: '4px',
                }}
              >
                5-CLASS PACK SAVES YOU $25
              </div>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '12px',
                  color: 'var(--ink-3)',
                  marginBottom: '10px',
                }}
              >
                Get the app and buy in bulk. 5 or 10 class packs at a discount.
              </p>
              <Link href="/the-app">
                <button
                  style={{
                    background: 'transparent',
                    border: '1px solid var(--accent)',
                    color: 'var(--accent)',
                    borderRadius: '6px',
                    padding: '7px 14px',
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Learn more →
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      <style>{`
        @media (max-width: 768px) {
          .class-detail-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  )
}
