import Link from 'next/link'

export default function AppPushStrip() {
  return (
    <div
      style={{
        background: 'linear-gradient(90deg, rgba(91,33,182,0.15) 0%, rgba(139,92,246,0.08) 50%, rgba(91,33,182,0.15) 100%)',
        borderTop: '1px solid rgba(139,92,246,0.2)',
        borderBottom: '1px solid rgba(139,92,246,0.2)',
        padding: '20px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '24px',
        flexWrap: 'wrap',
      }}
    >
      <div>
        <span
          style={{
            fontFamily: "'Azonix', 'Anton', sans-serif",
            fontSize: '14px',
            color: 'var(--ink)',
            letterSpacing: '0.04em',
          }}
        >
          BOOK FASTER.{' '}
        </span>
        <span
          style={{
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontStyle: 'italic',
            fontSize: '15px',
            color: 'var(--accent-2)',
          }}
        >
          earn chemicals.
        </span>
        <span
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '13px',
            color: 'var(--ink-3)',
            marginLeft: '12px',
          }}
        >
          5-class packs · memberships · rewards — only in the app.
        </span>
      </div>
      <Link href="/the-app">
        <button className="btn-accent" style={{ padding: '8px 20px', fontSize: '13px', whiteSpace: 'nowrap' }}>
          Get the app →
        </button>
      </Link>
    </div>
  )
}
