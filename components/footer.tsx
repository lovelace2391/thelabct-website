'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{ background: 'var(--bg-1)', borderTop: '1px solid var(--line)' }}>
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '64px 24px 0',
        }}
      >
        {/* 4-column grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '48px',
            paddingBottom: '64px',
          }}
        >
          {/* Col 1: Logo + address */}
          <div>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', marginBottom: '20px' }}>
              <Image
                src="/images/lab-symbol-color.png"
                alt="The Lab CT"
                width={28}
                height={28}
                style={{ objectFit: 'contain' }}
              />
              <span
                style={{
                  fontFamily: "'Azonix', 'Anton', 'Bebas Neue', Impact, sans-serif",
                  fontSize: '16px',
                  color: 'var(--ink)',
                  letterSpacing: '0.05em',
                }}
              >
                The Lab
              </span>
              <span
                className="pill"
                style={{
                  background: 'rgba(139,92,246,0.12)',
                  color: 'var(--accent-2)',
                  border: '1px solid rgba(139,92,246,0.2)',
                  fontSize: '9px',
                  padding: '2px 7px',
                }}
              >
                CT
              </span>
            </Link>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '13px',
                color: 'var(--ink-3)',
                lineHeight: '1.7',
              }}
            >
              118 South St<br />
              Danbury, CT 06810<br />
              Est. 2014
            </p>
          </div>

          {/* Col 2: STUDIO */}
          <div>
            <p
              className="section-label"
              style={{ marginBottom: '20px', fontSize: '10px' }}
            >
              Studio
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                { label: 'Who We Are', href: '/#who-we-are' },
                { label: 'Styles', href: '/#styles' },
                { label: 'Instructors', href: '/#instructor' },
                { label: 'Schedule', href: '/schedule' },
                { label: 'Visit', href: '/visit' },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '14px',
                    color: 'var(--ink-3)',
                    textDecoration: 'none',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) => ((e.target as HTMLElement).style.color = 'var(--ink)')}
                  onMouseLeave={(e) => ((e.target as HTMLElement).style.color = 'var(--ink-3)')}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Col 3: CREW */}
          <div>
            <p
              className="section-label"
              style={{ marginBottom: '20px', fontSize: '10px' }}
            >
              Crew
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                { label: 'Instructors', href: '/#instructor' },
                { label: 'Hip-Hop Classes', href: '/schedule' },
                { label: 'Heels Classes', href: '/schedule' },
                { label: 'Book a Class', href: '/schedule' },
              ].map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '14px',
                    color: 'var(--ink-3)',
                    textDecoration: 'none',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) => ((e.target as HTMLElement).style.color = 'var(--ink)')}
                  onMouseLeave={(e) => ((e.target as HTMLElement).style.color = 'var(--ink-3)')}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Col 4: LAB APP */}
          <div>
            <p
              className="section-label"
              style={{ marginBottom: '20px', fontSize: '10px' }}
            >
              Lab App
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                { label: 'Download the App', href: '/the-app' },
                { label: 'Memberships', href: '/the-app' },
                { label: 'Class Packs', href: '/the-app' },
                { label: 'Chemicals (Rewards)', href: '/the-app' },
              ].map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '14px',
                    color: 'var(--ink-3)',
                    textDecoration: 'none',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) => ((e.target as HTMLElement).style.color = 'var(--ink)')}
                  onMouseLeave={(e) => ((e.target as HTMLElement).style.color = 'var(--ink-3)')}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright bar */}
        <div
          style={{
            borderTop: '1px solid var(--line)',
            padding: '20px 0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <p
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '11px',
              color: 'var(--ink-4)',
              letterSpacing: '0.04em',
            }}
          >
            © {year} The Lab CT. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '24px' }}>
            {['Privacy Policy', 'Terms of Service'].map((l) => (
              <span
                key={l}
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '11px',
                  color: 'var(--ink-4)',
                  letterSpacing: '0.04em',
                  cursor: 'pointer',
                }}
              >
                {l}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
