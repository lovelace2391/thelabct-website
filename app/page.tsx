import Image from 'next/image'
import Link from 'next/link'
import Nav from '@/components/nav'
import Footer from '@/components/footer'
import PhoneMock from '@/components/phone-mock'

const DANCE_STYLES = [
  { num: '01', name: 'Hip-Hop', desc: 'Foundation, freestyle & cypher culture', href: '/schedule' },
  { num: '02', name: 'Heels', desc: 'Sensual movement, power & confidence', href: '/schedule' },
  { num: '03', name: 'Street Jazz', desc: 'Commercial, fusion & urban vernacular', href: '/schedule' },
  { num: '04', name: 'Latin Fusion', desc: 'Salsa, bachata & afro-latin rhythms', href: '/schedule' },
]

export default function HomePage() {
  return (
    <>
      <Nav />

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section
        style={{
          position: 'relative',
          minHeight: '100svh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          overflow: 'hidden',
        }}
      >
        {/* Video background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0,
          }}
        >
          <source src="/video/hero.mp4" type="video/mp4" />
        </video>

        {/* Gradient overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0.15) 100%)',
            zIndex: 1,
          }}
        />

        {/* Content */}
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0 24px 80px',
            width: '100%',
          }}
        >
          {/* Eyebrow */}
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '11px',
              letterSpacing: '0.2em',
              color: 'var(--ink-3)',
              textTransform: 'uppercase',
              marginBottom: '28px',
            }}
          >
            Danbury · Connecticut — Est. 2014
          </div>

          {/* H1 */}
          <h1
            style={{
              fontFamily: "'Azonix', 'Anton', 'Bebas Neue', Impact, sans-serif",
              fontSize: 'clamp(52px, 10vw, 120px)',
              lineHeight: 0.92,
              letterSpacing: '-0.01em',
              color: 'var(--ink)',
              marginBottom: '8px',
            }}
          >
            A CREATIVE
            <br />
            SPACE FOR
          </h1>
          <h1
            style={{
              fontFamily: "'Instrument Serif', Georgia, serif",
              fontStyle: 'italic',
              fontSize: 'clamp(52px, 10vw, 120px)',
              lineHeight: 0.92,
              background: 'linear-gradient(135deg, var(--accent) 0%, var(--accent-2) 50%, var(--accent-hot) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '32px',
            }}
          >
            movement.
          </h1>

          {/* Subtext */}
          <p
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '16px',
              color: 'var(--ink-3)',
              maxWidth: '480px',
              lineHeight: '1.6',
              marginBottom: '36px',
            }}
          >
            Hip-hop, heels, jazz, ballet, contemporary — every body, every level, every week.
          </p>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <Link href="/schedule">
              <button
                className="btn-accent"
                style={{ padding: '14px 28px', fontSize: '15px' }}
              >
                Book a class
              </button>
            </Link>
            <Link href="/the-app">
              <button
                className="btn-ghost"
                style={{ padding: '14px 28px', fontSize: '15px' }}
              >
                Get the app →
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── WHO WE ARE §01 ──────────────────────────────────────── */}
      <section
        id="who-we-are"
        style={{
          background: 'var(--bg-1)',
          borderTop: '1px solid var(--line)',
        }}
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '96px 24px',
            display: 'grid',
            gridTemplateColumns: '160px 1fr',
            gap: '64px',
            alignItems: 'start',
          }}
        >
          {/* Left label */}
          <div>
            <div className="section-label">§01</div>
            <div
              className="section-label"
              style={{ color: 'var(--ink-4)', marginTop: '4px' }}
            >
              Who we are
            </div>
          </div>

          {/* Right content */}
          <div>
            <blockquote
              style={{
                fontFamily: "'Instrument Serif', Georgia, serif",
                fontStyle: 'italic',
                fontSize: 'clamp(28px, 4vw, 48px)',
                lineHeight: 1.25,
                color: 'var(--ink)',
                maxWidth: '720px',
                marginBottom: '32px',
              }}
            >
              &ldquo;We built The Lab because dancers in Connecticut deserved a serious home. Not a hobby space — a creative lab where movement is studied, celebrated, and shared.&rdquo;
            </blockquote>
            <p
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '16px',
                color: 'var(--ink-3)',
                maxWidth: '560px',
                lineHeight: '1.7',
                marginBottom: '32px',
              }}
            >
              Since 2014, we&apos;ve been training dancers across all styles and levels in Danbury, Connecticut. Whether you&apos;re stepping into a studio for the first time or you&apos;ve been dancing for decades, you&apos;ll find your people here.
            </p>
            <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
              {[
                { num: '10+', label: 'Years open' },
                { num: '20+', label: 'Instructors' },
                { num: '500+', label: 'Students' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div
                    style={{
                      fontFamily: "'Azonix', 'Anton', sans-serif",
                      fontSize: '36px',
                      color: 'var(--accent)',
                      lineHeight: 1,
                      marginBottom: '4px',
                    }}
                  >
                    {stat.num}
                  </div>
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '11px',
                      color: 'var(--ink-4)',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FIVE WAYS TO MOVE §02 ────────────────────────────────── */}
      <section
        id="styles"
        style={{
          background: 'var(--bg)',
          borderTop: '1px solid var(--line)',
        }}
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '96px 24px',
          }}
        >
          {/* Header row */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '160px 1fr',
              gap: '64px',
              marginBottom: '64px',
              alignItems: 'end',
            }}
          >
            <div>
              <div className="section-label">§02</div>
              <div className="section-label" style={{ color: 'var(--ink-4)', marginTop: '4px' }}>
                The styles
              </div>
            </div>
            <h2
              style={{
                fontFamily: "'Azonix', 'Anton', 'Bebas Neue', Impact, sans-serif",
                fontSize: 'clamp(40px, 7vw, 88px)',
                lineHeight: 0.9,
                letterSpacing: '-0.01em',
                color: 'var(--ink)',
              }}
            >
              FIVE WAYS<br />TO MOVE
            </h2>
          </div>

          {/* Styles list */}
          <div>
            {DANCE_STYLES.map((style, idx) => (
              <Link
                key={style.num}
                href={style.href}
                style={{ textDecoration: 'none' }}
              >
                <div
                  className="style-row"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '28px 0',
                    borderTop: idx === 0 ? '1px solid var(--line)' : 'none',
                    gap: '24px',
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '12px',
                      color: 'var(--ink-4)',
                      letterSpacing: '0.08em',
                      minWidth: '32px',
                    }}
                  >
                    {style.num}
                  </span>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontFamily: "'Azonix', 'Anton', 'Bebas Neue', Impact, sans-serif",
                        fontSize: 'clamp(28px, 4vw, 52px)',
                        lineHeight: 1,
                        color: 'var(--ink)',
                        letterSpacing: '0.02em',
                      }}
                    >
                      {style.name}
                    </div>
                    <div
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: '14px',
                        color: 'var(--ink-3)',
                        marginTop: '4px',
                      }}
                    >
                      {style.desc}
                    </div>
                  </div>
                  <span
                    className="style-arrow"
                    style={{
                      fontFamily: "'Azonix', 'Anton', sans-serif",
                      fontSize: '24px',
                      color: 'var(--accent)',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── INSTRUCTOR IN FOCUS §03 ──────────────────────────────── */}
      <section
        id="instructor"
        style={{
          background: 'var(--bg-2)',
          borderTop: '1px solid var(--line)',
        }}
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '96px 24px',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '64px',
            alignItems: 'center',
          }}
        >
          {/* Left: photo placeholder */}
          <div style={{ position: 'relative' }}>
            <div
              style={{
                aspectRatio: '3/4',
                background: 'var(--bg-3)',
                borderRadius: '12px',
                overflow: 'hidden',
                border: '1px solid var(--line)',
                position: 'relative',
              }}
            >
              <Image
                src="/images/flyers/tia-lyss.jpg"
                alt="Featured Instructor"
                fill
                style={{ objectFit: 'cover', objectPosition: 'top' }}
              />
              {/* Overlay gradient */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)',
                }}
              />
            </div>

            {/* Label over photo */}
            <div
              style={{
                position: 'absolute',
                bottom: '24px',
                left: '24px',
              }}
            >
              <div className="section-label" style={{ marginBottom: '4px' }}>
                §03
              </div>
              <div className="section-label" style={{ color: 'var(--ink-4)' }}>
                Instructor in focus
              </div>
            </div>
          </div>

          {/* Right: info */}
          <div>
            <h2
              style={{
                fontFamily: "'Azonix', 'Anton', 'Bebas Neue', Impact, sans-serif",
                fontSize: 'clamp(36px, 5vw, 72px)',
                lineHeight: 0.92,
                color: 'var(--ink)',
                marginBottom: '12px',
              }}
            >
              TIA-LYSS
            </h2>
            <div
              style={{
                display: 'flex',
                gap: '8px',
                flexWrap: 'wrap',
                marginBottom: '24px',
              }}
            >
              {['Heels', 'Street Jazz', 'Contemporary'].map((s) => (
                <span
                  key={s}
                  className="pill"
                  style={{
                    background: 'rgba(139,92,246,0.12)',
                    color: 'var(--accent-2)',
                    border: '1px solid rgba(139,92,246,0.2)',
                    fontSize: '10px',
                  }}
                >
                  {s}
                </span>
              ))}
            </div>

            <blockquote
              style={{
                fontFamily: "'Instrument Serif', Georgia, serif",
                fontStyle: 'italic',
                fontSize: '22px',
                lineHeight: 1.4,
                color: 'var(--ink-2)',
                marginBottom: '32px',
                paddingLeft: '20px',
                borderLeft: '2px solid var(--accent)',
              }}
            >
              &ldquo;Dance isn&apos;t a performance. It&apos;s a conversation between your body and the music. I teach people how to listen.&rdquo;
            </blockquote>

            {/* Stats */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '20px',
                marginBottom: '36px',
              }}
            >
              {[
                { num: '8+', label: 'Years teaching' },
                { num: '300+', label: 'Students trained' },
                { num: '4', label: 'Styles taught' },
                { num: '12+', label: 'Workshops/year' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  style={{
                    background: 'var(--bg-3)',
                    borderRadius: '10px',
                    padding: '16px',
                    border: '1px solid var(--line)',
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Azonix', 'Anton', sans-serif",
                      fontSize: '28px',
                      color: 'var(--accent)',
                      lineHeight: 1,
                      marginBottom: '4px',
                    }}
                  >
                    {stat.num}
                  </div>
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '10px',
                      color: 'var(--ink-4)',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <Link href="/schedule">
              <button className="btn-ghost">Meet the full crew →</button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── THE LAB APP §04 ─────────────────────────────────────── */}
      <section
        id="app"
        style={{
          background: 'var(--bg-1)',
          borderTop: '1px solid var(--line)',
        }}
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '96px 24px',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '64px',
            alignItems: 'center',
          }}
        >
          {/* Left text */}
          <div>
            <div className="section-label" style={{ marginBottom: '24px' }}>
              §04 — The Lab App
            </div>
            <h2
              style={{
                fontFamily: "'Azonix', 'Anton', 'Bebas Neue', Impact, sans-serif",
                fontSize: 'clamp(36px, 5vw, 64px)',
                lineHeight: 0.9,
                color: 'var(--ink)',
                marginBottom: '12px',
              }}
            >
              THE STUDIO
              <br />
              NEVER CLOSES
            </h2>
            <p
              style={{
                fontFamily: "'Instrument Serif', Georgia, serif",
                fontStyle: 'italic',
                fontSize: '20px',
                color: 'var(--ink-3)',
                lineHeight: '1.5',
                marginBottom: '32px',
                maxWidth: '420px',
              }}
            >
              Book classes, track your progress, earn rewards and connect with the crew — all from your phone.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '36px' }}>
              {[
                { icon: '◈', title: 'Memberships', desc: 'Unlimited access, monthly billing' },
                { icon: '◷', title: 'Class Packs', desc: '5 or 10 classes, save up to 30%' },
                { icon: '◉', title: 'Chemicals', desc: 'Points that earn real rewards' },
                { icon: '◔', title: 'Crew', desc: 'Connect with instructors & students' },
              ].map((item) => (
                <div key={item.title} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '8px',
                      background: 'rgba(139,92,246,0.12)',
                      border: '1px solid rgba(139,92,246,0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '16px',
                      flexShrink: 0,
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: '14px',
                        fontWeight: 600,
                        color: 'var(--ink)',
                        marginBottom: '2px',
                      }}
                    >
                      {item.title}
                    </div>
                    <div
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '13px',
                        color: 'var(--ink-3)',
                      }}
                    >
                      {item.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Link href="/the-app">
              <button className="btn-accent" style={{ padding: '13px 28px' }}>
                Get the app →
              </button>
            </Link>
          </div>

          {/* Right phone mockup */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
            }}
          >
            {/* Glow */}
            <div
              style={{
                position: 'absolute',
                width: '300px',
                height: '300px',
                background: 'var(--accent-glow)',
                filter: 'blur(80px)',
                borderRadius: '50%',
                pointerEvents: 'none',
              }}
            />
            <PhoneMock rotate={-2} scale={1.1} />
          </div>
        </div>
      </section>

      {/* ── JUST SHOW UP §05 ────────────────────────────────────── */}
      <section
        style={{
          background: 'var(--bg)',
          borderTop: '1px solid var(--line)',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            maxWidth: '960px',
            margin: '0 auto',
            padding: '120px 24px',
          }}
        >
          <div className="section-label" style={{ marginBottom: '32px' }}>
            §05 — Ready when you are
          </div>
          <h2
            style={{
              fontFamily: "'Azonix', 'Anton', 'Bebas Neue', Impact, sans-serif",
              fontSize: 'clamp(64px, 12vw, 144px)',
              lineHeight: 0.85,
              color: 'var(--ink)',
              marginBottom: '8px',
            }}
          >
            JUST
          </h2>
          <h2
            style={{
              fontFamily: "'Instrument Serif', Georgia, serif",
              fontStyle: 'italic',
              fontSize: 'clamp(64px, 12vw, 144px)',
              lineHeight: 0.85,
              background: 'linear-gradient(135deg, var(--accent) 0%, var(--accent-2) 50%, var(--accent-hot) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '48px',
            }}
          >
            show up.
          </h2>
          <p
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '18px',
              color: 'var(--ink-3)',
              lineHeight: '1.6',
              maxWidth: '480px',
              margin: '0 auto 40px',
            }}
          >
            Drop-in classes starting at $20. No experience needed — just show up and move.
          </p>
          <Link href="/schedule">
            <button
              className="btn-accent"
              style={{ padding: '16px 40px', fontSize: '16px', boxShadow: '0 0 40px var(--accent-glow)' }}
            >
              Browse the schedule
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </>
  )
}
