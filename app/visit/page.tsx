import Nav from '@/components/nav'
import Footer from '@/components/footer'
import Link from 'next/link'

export default function VisitPage() {
  const HOURS = [
    { days: 'Monday – Tuesday', hours: '5:00 PM – 9:30 PM' },
    { days: 'Wednesday – Thursday', hours: '5:00 PM – 9:30 PM' },
    { days: 'Friday', hours: '5:00 PM – 9:00 PM' },
    { days: 'Saturday', hours: '10:00 AM – 4:00 PM' },
    { days: 'Sunday', hours: 'Closed' },
  ]

  return (
    <>
      <Nav />

      {/* Hero */}
      <section
        style={{
          background: 'var(--bg)',
          paddingTop: '120px',
          paddingBottom: '64px',
          borderBottom: '1px solid var(--line)',
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
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
            Find us — Cheshire, Connecticut
          </div>
          <h1
            style={{
              fontFamily: "'Azonix', 'Anton', 'Bebas Neue', Impact, sans-serif",
              fontSize: 'clamp(48px, 9vw, 112px)',
              lineHeight: 0.88,
              color: 'var(--ink)',
              marginBottom: '8px',
            }}
          >
            VISIT
          </h1>
          <h1
            style={{
              fontFamily: "'Instrument Serif', Georgia, serif",
              fontStyle: 'italic',
              fontSize: 'clamp(48px, 9vw, 112px)',
              lineHeight: 0.88,
              background: 'linear-gradient(135deg, var(--accent) 0%, var(--accent-2) 50%, var(--accent-hot) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '36px',
            }}
          >
            the studio.
          </h1>
          <p
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '18px',
              color: 'var(--ink-3)',
              maxWidth: '480px',
              lineHeight: '1.6',
            }}
          >
            We&apos;re in Cheshire, CT. Come early, bring water, and be ready to move.
          </p>
        </div>
      </section>

      {/* Main content */}
      <section style={{ background: 'var(--bg)' }}>
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '80px 24px',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '80px',
          }}
        >
          {/* Left column */}
          <div>
            {/* Address */}
            <div style={{ marginBottom: '48px' }}>
              <div className="section-label" style={{ marginBottom: '20px' }}>
                Address
              </div>
              <div
                style={{
                  background: 'var(--bg-2)',
                  borderRadius: '14px',
                  padding: '28px',
                  border: '1px solid var(--line-2)',
                  marginBottom: '16px',
                }}
              >
                <div
                  style={{
                    fontFamily: "'Azonix', 'Anton', sans-serif",
                    fontSize: '24px',
                    color: 'var(--ink)',
                    letterSpacing: '0.04em',
                    marginBottom: '8px',
                  }}
                >
                  THE LAB CT
                </div>
                <div
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '18px',
                    color: 'var(--ink-2)',
                    marginBottom: '4px',
                  }}
                >
                  490 Cornwall Ave
                </div>
                <div
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '18px',
                    color: 'var(--ink-2)',
                    marginBottom: '20px',
                  }}
                >
                  Cheshire, CT 06410
                </div>
                <a
                  href="https://maps.google.com/?q=490+Cornwall+Ave+Cheshire+CT+06410"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none' }}
                >
                  <button className="btn-accent" style={{ padding: '10px 20px', fontSize: '14px' }}>
                    📍 Get directions →
                  </button>
                </a>
              </div>
            </div>

            {/* Hours */}
            <div style={{ marginBottom: '48px' }}>
              <div className="section-label" style={{ marginBottom: '20px' }}>
                Studio Hours
              </div>
              <div
                style={{
                  background: 'var(--bg-2)',
                  borderRadius: '14px',
                  border: '1px solid var(--line-2)',
                  overflow: 'hidden',
                }}
              >
                {HOURS.map((h, i) => (
                  <div
                    key={h.days}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '16px 24px',
                      borderBottom: i < HOURS.length - 1 ? '1px solid var(--line)' : 'none',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: '14px',
                        color: 'var(--ink-2)',
                        fontWeight: 500,
                      }}
                    >
                      {h.days}
                    </span>
                    <span
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: '13px',
                        color: h.hours === 'Closed' ? 'var(--ink-4)' : 'var(--accent)',
                        letterSpacing: '0.04em',
                      }}
                    >
                      {h.hours}
                    </span>
                  </div>
                ))}
              </div>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '12px',
                  color: 'var(--ink-4)',
                  marginTop: '10px',
                }}
              >
                Hours may vary during holidays and special events. Check the schedule for class times.
              </p>
            </div>
          </div>

          {/* Right column */}
          <div>
            {/* Parking */}
            <div style={{ marginBottom: '48px' }}>
              <div className="section-label" style={{ marginBottom: '20px' }}>
                Parking
              </div>
              <div
                style={{
                  background: 'var(--bg-2)',
                  borderRadius: '14px',
                  padding: '28px',
                  border: '1px solid var(--line-2)',
                }}
              >
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {[
                    'Free parking open in the plaza',
                    'Accessible spots available — contact us if you need assistance',
                  ].map((item) => (
                    <li
                      key={item}
                      style={{
                        display: 'flex',
                        gap: '12px',
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

            {/* Contact */}
            <div style={{ marginBottom: '48px' }}>
              <div className="section-label" style={{ marginBottom: '20px' }}>
                Contact
              </div>
              <div
                style={{
                  background: 'var(--bg-2)',
                  borderRadius: '14px',
                  padding: '28px',
                  border: '1px solid var(--line-2)',
                }}
              >
                {[
                  { label: 'Email', value: 'info@thelabct.net', href: 'mailto:info@thelabct.net' },
                  { label: 'Instagram', value: '@thelabcreativespace', href: 'https://instagram.com/thelabcreativespace' },
                ].map((contact) => (
                  <div
                    key={contact.label}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '12px 0',
                      borderBottom: '1px solid var(--line)',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: '11px',
                        color: 'var(--ink-4)',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                      }}
                    >
                      {contact.label}
                    </span>
                    <a
                      href={contact.href}
                      target={contact.href.startsWith('http') ? '_blank' : undefined}
                      rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: '15px',
                        fontWeight: 500,
                        color: 'var(--accent)',
                        textDecoration: 'none',
                      }}
                    >
                      {contact.value}
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div
              style={{
                background: 'rgba(139,92,246,0.08)',
                border: '1px solid rgba(139,92,246,0.2)',
                borderRadius: '14px',
                padding: '28px',
              }}
            >
              <h3
                style={{
                  fontFamily: "'Azonix', 'Anton', sans-serif",
                  fontSize: '20px',
                  color: 'var(--ink)',
                  letterSpacing: '0.04em',
                  marginBottom: '8px',
                }}
              >
                READY TO DANCE?
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
                Browse the schedule and book your first class. Drop-in starting at $20.
              </p>
              <Link href="/schedule">
                <button className="btn-accent">Browse the schedule →</button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
