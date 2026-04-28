import { Suspense } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Nav from '@/components/nav'
import Footer from '@/components/footer'
import PhoneMock from '@/components/phone-mock'

interface Props {
  searchParams: Promise<{ ref?: string }>
}

async function ConfirmationContent({ bookingRef }: { bookingRef: string | undefined }) {
  const displayRef = bookingRef ?? 'LAB' + Math.random().toString(36).slice(2, 8).toUpperCase()

  return (
    <>
      {/* Hero */}
      <section style={{ background: 'var(--bg)', paddingTop: '120px', paddingBottom: '80px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
          {/* Check */}
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'rgba(139,92,246,0.15)',
              border: '1px solid rgba(139,92,246,0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 32px',
              fontSize: '28px',
            }}
          >
            ✓
          </div>

          <h1
            style={{
              fontFamily: "'Azonix', 'Anton', 'Bebas Neue', Impact, sans-serif",
              fontSize: 'clamp(52px, 10vw, 120px)',
              lineHeight: 0.88,
              color: 'var(--ink)',
              marginBottom: '8px',
            }}
          >
            {"YOU'RE"}
          </h1>
          <h1
            style={{
              fontFamily: "'Instrument Serif', Georgia, serif",
              fontStyle: 'italic',
              fontSize: 'clamp(52px, 10vw, 120px)',
              lineHeight: 0.88,
              background: 'linear-gradient(135deg, var(--accent) 0%, var(--accent-2) 50%, var(--accent-hot) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '32px',
            }}
          >
            in.
          </h1>

          <p
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '16px',
              color: 'var(--ink-3)',
              lineHeight: '1.6',
              marginBottom: '8px',
            }}
          >
            Your booking is confirmed. A confirmation email is on its way to your inbox.
          </p>
          <p
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '15px',
              color: 'var(--ink-4)',
            }}
          >
            Please check your spam folder if you don&apos;t see it within a few minutes.
          </p>
        </div>
      </section>

      {/* Ticket card */}
      <section style={{ background: 'var(--bg-1)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', padding: '60px 24px' }}>
          <div
            style={{
              background: 'var(--bg-2)',
              border: '1px solid var(--line-2)',
              borderRadius: '20px',
              overflow: 'hidden',
            }}
          >
            {/* Ticket top */}
            <div
              style={{
                background: 'linear-gradient(135deg, rgba(91,33,182,0.4) 0%, rgba(139,92,246,0.2) 100%)',
                padding: '32px',
                borderBottom: '2px dashed rgba(255,255,255,0.1)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '10px',
                      letterSpacing: '0.15em',
                      color: 'var(--accent)',
                      textTransform: 'uppercase',
                      marginBottom: '8px',
                    }}
                  >
                    Booking Reference
                  </div>
                  <div
                    style={{
                      fontFamily: "'Azonix', 'Anton', sans-serif",
                      fontSize: '32px',
                      color: 'var(--ink)',
                      letterSpacing: '0.04em',
                    }}
                  >
                    #{displayRef}
                  </div>
                </div>
                <Image
                  src="/images/lab-symbol-color.png"
                  alt="The Lab CT"
                  width={40}
                  height={40}
                  style={{ objectFit: 'contain', opacity: 0.7 }}
                />
              </div>
            </div>

            {/* Ticket body */}
            <div style={{ padding: '28px 32px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
                {[
                  { label: 'Date', value: 'Your booked date' },
                  { label: 'Class', value: 'Your booked class' },
                  { label: 'Time', value: 'Your booked time' },
                  { label: 'Instructor', value: 'Your instructor' },
                ].map((item) => (
                  <div key={item.label}>
                    <div
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: '9px',
                        color: 'var(--ink-4)',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        marginBottom: '4px',
                      }}
                    >
                      {item.label}
                    </div>
                    <div
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: '15px',
                        fontWeight: 600,
                        color: 'var(--ink-2)',
                      }}
                    >
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Address */}
              <div
                style={{
                  background: 'var(--bg-3)',
                  borderRadius: '10px',
                  padding: '16px',
                  marginBottom: '24px',
                  border: '1px solid var(--line)',
                }}
              >
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '9px',
                    color: 'var(--ink-4)',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    marginBottom: '6px',
                  }}
                >
                  Studio Address
                </div>
                <div
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '15px',
                    fontWeight: 600,
                    color: 'var(--ink)',
                    marginBottom: '4px',
                  }}
                >
                  The Lab CT
                </div>
                <div
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '14px',
                    color: 'var(--ink-3)',
                  }}
                >
                  118 South St, Danbury, CT 06810
                </div>
              </div>

              {/* Check-in instructions */}
              <div
                style={{
                  borderTop: '1px solid var(--line)',
                  paddingTop: '20px',
                  marginBottom: '24px',
                }}
              >
                <div
                  style={{
                    fontFamily: "'Azonix', 'Anton', sans-serif",
                    fontSize: '12px',
                    letterSpacing: '0.08em',
                    color: 'var(--ink-3)',
                    marginBottom: '10px',
                  }}
                >
                  CHECK-IN INSTRUCTIONS
                </div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {[
                    'Arrive 5–10 minutes before class starts',
                    'Show your booking reference at the front desk',
                    'Water and changing rooms available on site',
                  ].map((item) => (
                    <li
                      key={item}
                      style={{
                        display: 'flex',
                        gap: '8px',
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '13px',
                        color: 'var(--ink-3)',
                      }}
                    >
                      <span style={{ color: 'var(--accent)' }}>·</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action buttons */}
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <button
                  className="btn-ghost"
                  style={{ fontSize: '13px', padding: '10px 18px' }}
                >
                  📅 Add to Calendar
                </button>
                <a
                  href="https://maps.google.com/?q=118+South+St+Danbury+CT+06810"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none' }}
                >
                  <button
                    className="btn-ghost"
                    style={{ fontSize: '13px', padding: '10px 18px' }}
                  >
                    📍 Get directions
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* App push section */}
      <section
        style={{
          background: 'var(--bg)',
          borderBottom: '1px solid var(--line)',
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '80px 24px' }}>
          <div
            style={{
              borderRadius: '24px',
              background: 'linear-gradient(135deg, #1a0a2e 0%, #0d0520 40%, #0a0a0c 100%)',
              border: '1px solid rgba(139,92,246,0.25)',
              padding: '60px 48px',
              display: 'grid',
              gridTemplateColumns: '1fr auto',
              gap: '48px',
              alignItems: 'center',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            {/* Glow */}
            <div
              style={{
                position: 'absolute',
                top: '-40px',
                right: '200px',
                width: '300px',
                height: '300px',
                background: 'rgba(139,92,246,0.15)',
                filter: 'blur(80px)',
                borderRadius: '50%',
                pointerEvents: 'none',
              }}
            />

            {/* Left text */}
            <div style={{ position: 'relative' }}>
              <div className="section-label" style={{ marginBottom: '20px' }}>
                While you&apos;re here
              </div>
              <h2
                style={{
                  fontFamily: "'Azonix', 'Anton', 'Bebas Neue', Impact, sans-serif",
                  fontSize: 'clamp(36px, 5vw, 64px)',
                  lineHeight: 0.9,
                  color: 'var(--ink)',
                  marginBottom: '8px',
                }}
              >
                GET THE APP.
              </h2>
              <h2
                style={{
                  fontFamily: "'Instrument Serif', Georgia, serif",
                  fontStyle: 'italic',
                  fontSize: 'clamp(36px, 5vw, 64px)',
                  lineHeight: 0.9,
                  background: 'linear-gradient(135deg, var(--accent) 0%, var(--accent-2) 50%, var(--accent-hot) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  marginBottom: '36px',
                }}
              >
                earn chemicals.
              </h2>

              {/* 4 pillars */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '16px',
                  marginBottom: '32px',
                  maxWidth: '480px',
                }}
              >
                {[
                  { icon: '◈', title: 'MEMBERSHIPS', desc: 'Unlimited monthly access' },
                  { icon: '◷', title: 'CLASS PACKS', desc: '5 or 10 at a discount' },
                  { icon: '◉', title: 'CHEMICALS', desc: 'Points → real rewards' },
                  { icon: '◔', title: 'CREW', desc: 'Your dance community' },
                ].map((pillar) => (
                  <div
                    key={pillar.title}
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      borderRadius: '10px',
                      padding: '14px',
                      border: '1px solid var(--line)',
                    }}
                  >
                    <div style={{ fontSize: '20px', marginBottom: '6px' }}>{pillar.icon}</div>
                    <div
                      style={{
                        fontFamily: "'Azonix', 'Anton', sans-serif",
                        fontSize: '11px',
                        color: 'var(--ink)',
                        letterSpacing: '0.06em',
                        marginBottom: '3px',
                      }}
                    >
                      {pillar.title}
                    </div>
                    <div
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '11px',
                        color: 'var(--ink-3)',
                      }}
                    >
                      {pillar.desc}
                    </div>
                  </div>
                ))}
              </div>

              <Link href="/the-app">
                <button
                  className="btn-accent"
                  style={{ padding: '13px 28px', boxShadow: '0 0 30px var(--accent-glow)' }}
                >
                  Get the app →
                </button>
              </Link>
            </div>

            {/* Right: phone */}
            <div style={{ position: 'relative' }}>
              <PhoneMock rotate={-3} scale={0.95} />
            </div>
          </div>
        </div>
      </section>

      {/* What's next */}
      <section style={{ background: 'var(--bg-1)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '80px 24px' }}>
          <div className="section-label" style={{ textAlign: 'center', marginBottom: '48px' }}>
            What&apos;s next
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '20px',
            }}
          >
            {[
              {
                icon: '◷',
                title: 'Browse More Classes',
                desc: 'Explore the full schedule and discover new styles.',
                cta: 'View schedule →',
                href: '/schedule',
              },
              {
                icon: '◔',
                title: 'Bring a Friend',
                desc: 'Classes are better with a partner. Share this and book together.',
                cta: 'Share →',
                href: '#',
              },
              {
                icon: '◈',
                title: 'Visit the Studio',
                desc: 'Get directions, hours, and everything you need for your first visit.',
                cta: 'Plan your visit →',
                href: '/visit',
              },
            ].map((card) => (
              <div
                key={card.title}
                style={{
                  background: 'var(--bg-2)',
                  borderRadius: '14px',
                  padding: '28px',
                  border: '1px solid var(--line)',
                }}
              >
                <div style={{ fontSize: '24px', marginBottom: '12px' }}>{card.icon}</div>
                <h3
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '18px',
                    fontWeight: 700,
                    color: 'var(--ink)',
                    marginBottom: '8px',
                  }}
                >
                  {card.title}
                </h3>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '14px',
                    color: 'var(--ink-3)',
                    lineHeight: '1.6',
                    marginBottom: '20px',
                  }}
                >
                  {card.desc}
                </p>
                <Link href={card.href} style={{ textDecoration: 'none' }}>
                  <span
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: '14px',
                      fontWeight: 600,
                      color: 'var(--accent)',
                    }}
                  >
                    {card.cta}
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default async function ConfirmationPage({ searchParams }: Props) {
  const { ref } = await searchParams

  return (
    <>
      <Nav />
      <Suspense fallback={null}>
        <ConfirmationContent bookingRef={ref} />
      </Suspense>
      <Footer />
    </>
  )
}
