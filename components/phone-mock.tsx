interface PhoneMockProps {
  rotate?: number
  scale?: number
}

export default function PhoneMock({ rotate = 0, scale = 1 }: PhoneMockProps) {
  return (
    <div
      style={{
        transform: `rotate(${rotate}deg) scale(${scale})`,
        transformOrigin: 'center center',
        width: '240px',
        height: '480px',
        position: 'relative',
      }}
    >
      {/* Phone frame */}
      <div
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '36px',
          border: '2px solid rgba(255,255,255,0.12)',
          background: 'linear-gradient(145deg, #1a1a1f 0%, #0a0a0c 100%)',
          boxShadow: `
            0 40px 80px rgba(0,0,0,0.6),
            0 0 0 1px rgba(255,255,255,0.05),
            inset 0 1px 0 rgba(255,255,255,0.08)
          `,
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Notch */}
        <div
          style={{
            position: 'absolute',
            top: '12px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '80px',
            height: '22px',
            borderRadius: '12px',
            background: '#000',
            zIndex: 10,
          }}
        />

        {/* Screen content */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            padding: '56px 16px 24px',
            background: 'var(--bg-1)',
          }}
        >
          {/* App header */}
          <div style={{ marginBottom: '20px' }}>
            <div
              style={{
                fontSize: '10px',
                fontFamily: "'Azonix', 'Anton', sans-serif",
                color: 'var(--ink)',
                letterSpacing: '0.08em',
                marginBottom: '4px',
              }}
            >
              THE LAB
            </div>
            <div
              style={{
                fontSize: '8px',
                fontFamily: "'JetBrains Mono', monospace",
                color: 'var(--accent)',
                letterSpacing: '0.12em',
              }}
            >
              DANBURY · CT
            </div>
          </div>

          {/* Mock class card */}
          {[
            { style: 'HEELS', name: "Beginner Heels", time: "7:30 PM", color: '#A855F7' },
            { style: 'HIP-HOP', name: "Foundation Hip-Hop", time: "6:00 PM", color: '#8B5CF6' },
            { style: 'JAZZ', name: "Street Jazz", time: "8:00 PM", color: '#7C3AED' },
          ].map((cls, i) => (
            <div
              key={i}
              style={{
                background: 'var(--bg-3)',
                borderRadius: '10px',
                padding: '10px 12px',
                marginBottom: '8px',
                border: '1px solid var(--line)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div
                    style={{
                      fontSize: '7px',
                      fontFamily: "'JetBrains Mono', monospace",
                      color: cls.color,
                      letterSpacing: '0.1em',
                      marginBottom: '3px',
                    }}
                  >
                    {cls.style}
                  </div>
                  <div
                    style={{
                      fontSize: '9px',
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontWeight: 600,
                      color: 'var(--ink)',
                    }}
                  >
                    {cls.name}
                  </div>
                </div>
                <div
                  style={{
                    fontSize: '8px',
                    fontFamily: "'JetBrains Mono', monospace",
                    color: 'var(--ink-3)',
                  }}
                >
                  {cls.time}
                </div>
              </div>
            </div>
          ))}

          {/* Bottom nav mock */}
          <div
            style={{
              marginTop: 'auto',
              display: 'flex',
              justifyContent: 'space-around',
              paddingTop: '12px',
              borderTop: '1px solid var(--line)',
            }}
          >
            {['◈', '◷', '◉', '◔'].map((icon, i) => (
              <div
                key={i}
                style={{
                  fontSize: '14px',
                  color: i === 0 ? 'var(--accent)' : 'var(--ink-4)',
                }}
              >
                {icon}
              </div>
            ))}
          </div>
        </div>

        {/* Purple glow */}
        <div
          style={{
            position: 'absolute',
            bottom: '-20px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '120px',
            height: '60px',
            background: 'var(--accent-glow)',
            filter: 'blur(30px)',
            borderRadius: '50%',
            pointerEvents: 'none',
          }}
        />
      </div>
    </div>
  )
}
