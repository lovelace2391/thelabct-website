import Nav from '@/components/nav'
import Footer from '@/components/footer'
import PhoneMock from '@/components/phone-mock'

export default function TheAppPage() {
  const PILLARS = [
    {
      num: '01',
      title: 'MEMBERSHIPS',
      desc: 'Unlimited classes, monthly billing. The best value if you train more than twice a week. Cancel anytime.',
      icon: '◈',
    },
    {
      num: '02',
      title: 'CLASS PACKS',
      desc: '5-class or 10-class packs at a significant discount vs drop-in. Share packs with family members.',
      icon: '◷',
    },
    {
      num: '03',
      title: 'CHEMICALS',
      desc: 'Our rewards program. Earn points for every class, referral, and milestone. Redeem for free classes, merch, and more.',
      icon: '◉',
    },
    {
      num: '04',
      title: 'CREW',
      desc: 'Connect with instructors, see class schedules, get notified of new classes and workshops.',
      icon: '◔',
    },
  ]

  const COMPARISON = [
    { feature: 'Browse schedule', web: true, app: true },
    { feature: 'Drop-in booking', web: true, app: true },
    { feature: 'Class packs (5 or 10)', web: false, app: true },
    { feature: 'Memberships', web: false, app: true },
    { feature: 'Chemicals rewards', web: false, app: true },
    { feature: 'Push notifications', web: false, app: true },
    { feature: 'Booking history', web: false, app: true },
    { feature: 'Crew chat', web: false, app: true },
  ]

  return (
    <>
      <Nav />

      {/* Hero */}
      <section
        style={{
          background: 'var(--bg)',
          paddingTop: '120px',
          paddingBottom: '80px',
          borderBottom: '1px solid var(--line)',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Background glow */}
        <div
          style={{
            position: 'absolute',
            top: '100px',
            right: '10%',
            width: '500px',
            height: '500px',
            background: 'rgba(139,92,246,0.12)',
            filter: 'blur(120px)',
            borderRadius: '50%',
            pointerEvents: 'none',
          }}
        />

        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0 24px',
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            gap: '64px',
            alignItems: 'center',
          }}
        >
          <div style={{ position: 'relative' }}>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '11px',
                letterSpacing: '0.2em',
                color: 'var(--accent)',
                textTransform: 'uppercase',
                marginBottom: '24px',
              }}
            >
              The Lab App — iOS & Android
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
              THE STUDIO,
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
              in your pocket.
            </h1>
            <p
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '18px',
                color: 'var(--ink-3)',
                maxWidth: '500px',
                lineHeight: '1.6',
                marginBottom: '40px',
              }}
            >
              Book classes, buy packs, earn rewards, and stay connected to the crew — all from one app.
            </p>
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <button
                className="btn-accent"
                style={{ padding: '14px 28px', fontSize: '15px' }}
              >
                Download on iOS →
              </button>
              <button
                className="btn-ghost"
                style={{ padding: '14px 28px', fontSize: '15px' }}
              >
                Get on Android →
              </button>
            </div>
          </div>

          {/* Phone */}
          <div style={{ position: 'relative' }}>
            <PhoneMock rotate={-2} scale={1.2} />
          </div>
        </div>
      </section>

      {/* 4 Pillars */}
      <section style={{ background: 'var(--bg-1)', borderBottom: '1px solid var(--line)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '96px 24px' }}>
          <div className="section-label" style={{ marginBottom: '48px' }}>
            What&apos;s inside
          </div>

          {PILLARS.map((pillar, idx) => (
            <div
              key={pillar.num}
              style={{
                display: 'grid',
                gridTemplateColumns: '60px 80px 1fr',
                alignItems: 'center',
                gap: '24px',
                padding: '32px 0',
                borderTop: '1px solid var(--line)',
                borderBottom: idx === PILLARS.length - 1 ? '1px solid var(--line)' : 'none',
              }}
            >
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '13px',
                  color: 'var(--ink-4)',
                  letterSpacing: '0.08em',
                }}
              >
                {pillar.num}
              </span>
              <div
                style={{
                  fontFamily: "'Azonix', 'Anton', 'Bebas Neue', Impact, sans-serif",
                  fontSize: 'clamp(22px, 3vw, 36px)',
                  color: 'var(--ink)',
                  letterSpacing: '0.02em',
                }}
              >
                {pillar.title}
              </div>
              <p
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '16px',
                  color: 'var(--ink-3)',
                  lineHeight: '1.6',
                  maxWidth: '560px',
                }}
              >
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Web vs App Comparison */}
      <section style={{ background: 'var(--bg)', borderBottom: '1px solid var(--line)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '96px 24px' }}>
          <div className="section-label" style={{ textAlign: 'center', marginBottom: '16px' }}>
            Which is right for you?
          </div>
          <h2
            style={{
              fontFamily: "'Azonix', 'Anton', 'Bebas Neue', Impact, sans-serif",
              fontSize: 'clamp(36px, 6vw, 72px)',
              color: 'var(--ink)',
              textAlign: 'center',
              marginBottom: '56px',
              lineHeight: 0.9,
            }}
          >
            WEB VS APP
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: '0',
              border: '1px solid var(--line-2)',
              borderRadius: '16px',
              overflow: 'hidden',
            }}
          >
            {/* Header row */}
            <div
              style={{
                padding: '20px',
                background: 'var(--bg-3)',
                borderBottom: '1px solid var(--line-2)',
              }}
            >
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '11px',
                  color: 'var(--ink-4)',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                }}
              >
                Feature
              </div>
            </div>
            {[
              { label: 'Web', icon: '🌐', sub: 'thelabct.com' },
              { label: 'App', icon: '📱', sub: 'iOS & Android', accent: true },
            ].map((col) => (
              <div
                key={col.label}
                style={{
                  padding: '20px',
                  background: col.accent ? 'rgba(139,92,246,0.08)' : 'var(--bg-3)',
                  borderBottom: '1px solid var(--line-2)',
                  borderLeft: '1px solid var(--line-2)',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: '20px', marginBottom: '4px' }}>{col.icon}</div>
                <div
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '15px',
                    fontWeight: 700,
                    color: col.accent ? 'var(--accent-2)' : 'var(--ink)',
                  }}
                >
                  {col.label}
                </div>
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '10px',
                    color: 'var(--ink-4)',
                    letterSpacing: '0.08em',
                  }}
                >
                  {col.sub}
                </div>
              </div>
            ))}

            {/* Rows */}
            {COMPARISON.map((row, i) => (
              <>
                <div
                  key={row.feature + 'label'}
                  style={{
                    padding: '16px 20px',
                    background: i % 2 === 0 ? 'var(--bg-2)' : 'var(--bg)',
                    borderBottom: i < COMPARISON.length - 1 ? '1px solid var(--line)' : 'none',
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '14px',
                    color: 'var(--ink-2)',
                  }}
                >
                  {row.feature}
                </div>
                {[row.web, row.app].map((val, j) => (
                  <div
                    key={row.feature + j}
                    style={{
                      padding: '16px 20px',
                      background: j === 1
                        ? (i % 2 === 0 ? 'rgba(139,92,246,0.06)' : 'rgba(139,92,246,0.04)')
                        : (i % 2 === 0 ? 'var(--bg-2)' : 'var(--bg)'),
                      borderBottom: i < COMPARISON.length - 1 ? '1px solid var(--line)' : 'none',
                      borderLeft: '1px solid var(--line-2)',
                      textAlign: 'center',
                      fontSize: '18px',
                    }}
                  >
                    {val ? '✓' : '—'}
                  </div>
                ))}
              </>
            ))}
          </div>
        </div>
      </section>

      {/* QR Section */}
      <section
        style={{
          background: 'var(--bg-1)',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: '640px', margin: '0 auto', padding: '96px 24px' }}>
          <div className="section-label" style={{ marginBottom: '24px' }}>
            Download now
          </div>
          <h2
            style={{
              fontFamily: "'Azonix', 'Anton', 'Bebas Neue', Impact, sans-serif",
              fontSize: 'clamp(40px, 7vw, 80px)',
              lineHeight: 0.9,
              color: 'var(--ink)',
              marginBottom: '8px',
            }}
          >
            POINT YOUR
          </h2>
          <h2
            style={{
              fontFamily: "'Instrument Serif', Georgia, serif",
              fontStyle: 'italic',
              fontSize: 'clamp(40px, 7vw, 80px)',
              lineHeight: 0.9,
              background: 'linear-gradient(135deg, var(--accent) 0%, var(--accent-2) 50%, var(--accent-hot) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '48px',
            }}
          >
            camera.
          </h2>

          {/* QR placeholder */}
          <div
            style={{
              width: '200px',
              height: '200px',
              margin: '0 auto 32px',
              borderRadius: '16px',
              background: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '16px',
              boxShadow: '0 0 40px var(--accent-glow)',
            }}
          >
            {/* QR pattern placeholder */}
            <div
              style={{
                width: '100%',
                height: '100%',
                display: 'grid',
                gridTemplateColumns: 'repeat(7, 1fr)',
                gridTemplateRows: 'repeat(7, 1fr)',
                gap: '2px',
              }}
            >
              {Array.from({ length: 49 }).map((_, i) => {
                const row = Math.floor(i / 7)
                const col = i % 7
                const isCorner =
                  (row < 3 && col < 3) ||
                  (row < 3 && col > 3) ||
                  (row > 3 && col < 3)
                const isRandom = Math.sin(i * 13.7) > 0
                return (
                  <div
                    key={i}
                    style={{
                      background: isCorner || isRandom ? '#000' : 'transparent',
                      borderRadius: '1px',
                    }}
                  />
                )
              })}
            </div>
          </div>

          <p
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '16px',
              color: 'var(--ink-3)',
              marginBottom: '32px',
            }}
          >
            Scan with your phone camera to download The Lab App
          </p>

          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn-accent" style={{ padding: '13px 24px' }}>
              App Store →
            </button>
            <button className="btn-ghost" style={{ padding: '13px 24px' }}>
              Google Play →
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
