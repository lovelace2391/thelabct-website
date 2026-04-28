'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { ScheduleGroup } from '@/lib/data'
import { formatPrice, spotsLabel, spotsColor } from '@/lib/data'

const STYLES = ['All', 'Heels', 'Hip-Hop', 'Street Jazz', 'Latin Fusion']

function formatDateDisplay(dateStr: string) {
  const d = new Date(dateStr + 'T00:00:00')
  return {
    day: d.toLocaleDateString('en-US', { weekday: 'long' }),
    date: d.getDate(),
    month: d.toLocaleDateString('en-US', { month: 'short' }),
    year: d.getFullYear(),
    full: d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }),
  }
}

function formatTime(timeStr: string | undefined) {
  if (!timeStr) return ''
  const [h, m] = timeStr.split(':')
  const hour = parseInt(h)
  const ampm = hour >= 12 ? 'PM' : 'AM'
  const hour12 = hour % 12 || 12
  return `${hour12}:${m} ${ampm}`
}

interface Props {
  groups: ScheduleGroup[]
}

export default function ScheduleClient({ groups }: Props) {
  const [activeStyle, setActiveStyle] = useState('All')

  const filteredGroups = groups
    .map((group) => ({
      ...group,
      schedules: group.schedules.filter((s) => {
        if (activeStyle === 'All') return true
        return s.dance_classes.style?.toLowerCase() === activeStyle.toLowerCase()
      }),
    }))
    .filter((g) => g.schedules.length > 0)

  return (
    <div>
      {/* Filter bar */}
      <div
        style={{
          position: 'sticky',
          top: '64px',
          zIndex: 40,
          background: 'rgba(0,0,0,0.92)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid var(--line)',
          padding: '0 24px',
        }}
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            display: 'flex',
            gap: '8px',
            padding: '12px 0',
            overflowX: 'auto',
          }}
        >
          {STYLES.map((style) => (
            <button
              key={style}
              onClick={() => setActiveStyle(style)}
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '13px',
                fontWeight: 600,
                letterSpacing: '0.02em',
                padding: '7px 16px',
                borderRadius: '100px',
                border: `1px solid ${activeStyle === style ? 'var(--accent)' : 'var(--line-2)'}`,
                background: activeStyle === style ? 'var(--accent)' : 'transparent',
                color: activeStyle === style ? '#fff' : 'var(--ink-3)',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s',
              }}
            >
              {style}
            </button>
          ))}
        </div>
      </div>

      {/* Schedule groups */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        {filteredGroups.length === 0 ? (
          <div
            style={{
              padding: '80px 0',
              textAlign: 'center',
              color: 'var(--ink-3)',
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            No classes scheduled for this style right now. Check back soon.
          </div>
        ) : (
          filteredGroups.map((group) => {
            const dt = formatDateDisplay(group.date)
            return (
              <div key={group.date} style={{ paddingTop: '48px', paddingBottom: '8px' }}>
                {/* Date header */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-end',
                    gap: '16px',
                    marginBottom: '20px',
                    paddingBottom: '16px',
                    borderBottom: '1px solid var(--line)',
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Azonix', 'Anton', 'Bebas Neue', Impact, sans-serif",
                      fontSize: '72px',
                      lineHeight: 1,
                      color: 'var(--ink)',
                    }}
                  >
                    {dt.date}
                  </span>
                  <div style={{ paddingBottom: '8px' }}>
                    <div
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: '12px',
                        color: 'var(--ink-3)',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                      }}
                    >
                      {dt.day}
                    </div>
                    <div
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: '12px',
                        color: 'var(--ink-4)',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                      }}
                    >
                      {dt.month} · {dt.year}
                    </div>
                  </div>
                </div>

                {/* Class rows */}
                {group.schedules.map((schedule) => {
                  const cls = schedule.dance_classes
                  const spotsLbl = spotsLabel(cls.capacity, schedule.booking_count ?? 0)
                  const spotsClr = spotsColor(cls.capacity, schedule.booking_count ?? 0)
                  const isFull = spotsLbl === 'FULL'

                  return (
                    <Link
                      key={schedule.id}
                      href={`/class/${cls.id}?schedule=${schedule.id}`}
                      style={{ textDecoration: 'none' }}
                    >
                      <div
                        className="class-row"
                        style={{
                          display: 'grid',
                          gridTemplateColumns: '100px 1fr auto auto auto',
                          alignItems: 'center',
                          gap: '16px',
                          padding: '18px 0',
                          opacity: isFull ? 0.5 : 1,
                        }}
                      >
                        {/* Time */}
                        <div
                          style={{
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: '13px',
                            color: 'var(--ink-2)',
                            letterSpacing: '0.04em',
                          }}
                        >
                          {formatTime(cls.start_time)}
                        </div>

                        {/* Class info */}
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                            <span
                              className="pill"
                              style={{
                                background: 'rgba(139,92,246,0.12)',
                                color: 'var(--accent-2)',
                                border: '1px solid rgba(139,92,246,0.2)',
                                fontSize: '9px',
                              }}
                            >
                              {cls.style}
                            </span>
                            <span
                              style={{
                                fontFamily: "'Space Grotesk', sans-serif",
                                fontSize: '16px',
                                fontWeight: 600,
                                color: 'var(--ink)',
                              }}
                            >
                              {cls.name}
                            </span>
                          </div>
                          <div
                            style={{
                              fontFamily: "'Inter', sans-serif",
                              fontSize: '13px',
                              color: 'var(--ink-3)',
                            }}
                          >
                            {cls.instructor_name} · {cls.duration_minutes} min
                          </div>
                        </div>

                        {/* Spots */}
                        <div
                          style={{
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: '11px',
                            fontWeight: 500,
                            color: spotsClr,
                            letterSpacing: '0.06em',
                            textAlign: 'right',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {spotsLbl}
                        </div>

                        {/* Price */}
                        <div
                          style={{
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontSize: '16px',
                            fontWeight: 700,
                            color: 'var(--ink)',
                            textAlign: 'right',
                          }}
                        >
                          {formatPrice(cls.base_price_cents)}
                        </div>

                        {/* Arrow */}
                        <div
                          style={{
                            color: 'var(--ink-4)',
                            fontSize: '18px',
                            transition: 'transform 0.2s, color 0.2s',
                          }}
                        >
                          →
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
