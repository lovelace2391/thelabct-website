'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav
      className="nav-glass fixed top-0 left-0 right-0 z-50"
      style={{ height: '64px' }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 24px',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <Image
            src="/images/lab-symbol-color.png"
            alt="The Lab"
            width={32}
            height={32}
            style={{ objectFit: 'contain' }}
          />
          <span
            style={{
              fontFamily: "'Azonix', 'Anton', 'Bebas Neue', Impact, sans-serif",
              fontSize: '18px',
              color: 'var(--ink)',
              letterSpacing: '0.05em',
            }}
          >
            The Lab
          </span>
          <span
            className="pill"
            style={{
              background: 'rgba(139, 92, 246, 0.15)',
              color: 'var(--accent-2)',
              border: '1px solid rgba(139, 92, 246, 0.25)',
              fontSize: '9px',
              padding: '2px 8px',
            }}
          >
            CT
          </span>
        </Link>

        {/* Desktop nav links */}
        <div
          className="hidden md:flex"
          style={{ alignItems: 'center', gap: '32px' }}
        >
          {[
            { label: 'Studio', href: '/#who-we-are' },
            { label: 'Schedule', href: '/schedule' },
            { label: 'App', href: '/the-app' },
            { label: 'Visit', href: '/visit' },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '14px',
                fontWeight: 500,
                color: 'var(--ink-3)',
                textDecoration: 'none',
                letterSpacing: '0.01em',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = 'var(--ink)')}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = 'var(--ink-3)')}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTAs */}
        <div className="hidden md:flex" style={{ alignItems: 'center', gap: '12px' }}>
          <Link href="/schedule">
            <button className="btn-ghost" style={{ padding: '8px 18px', fontSize: '13px' }}>
              Book a class
            </button>
          </Link>
          <Link href="/the-app">
            <button className="btn-accent" style={{ padding: '8px 18px', fontSize: '13px' }}>
              Get the app →
            </button>
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--ink)',
            cursor: 'pointer',
            padding: '8px',
          }}
          aria-label="Toggle menu"
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            {menuOpen ? (
              <>
                <line x1="3" y1="3" x2="19" y2="19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="19" y1="3" x2="3" y2="19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="19" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="3" y1="11" x2="19" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="3" y1="16" x2="19" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            background: 'rgba(0,0,0,0.96)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid var(--line)',
            padding: '20px 24px 28px',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {[
              { label: 'Studio', href: '/#who-we-are' },
              { label: 'Schedule', href: '/schedule' },
              { label: 'App', href: '/the-app' },
              { label: 'Visit', href: '/visit' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '16px',
                  fontWeight: 500,
                  color: 'var(--ink-2)',
                  textDecoration: 'none',
                }}
              >
                {link.label}
              </Link>
            ))}
            <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
              <Link href="/schedule" onClick={() => setMenuOpen(false)}>
                <button className="btn-ghost" style={{ fontSize: '13px', padding: '8px 16px' }}>
                  Book a class
                </button>
              </Link>
              <Link href="/the-app" onClick={() => setMenuOpen(false)}>
                <button className="btn-accent" style={{ fontSize: '13px', padding: '8px 16px' }}>
                  Get the app →
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
