import { getSupabaseServer } from './supabase-server'

export interface DanceClass {
  id: string
  name: string
  style: string
  level: string
  instructor_name: string
  start_time: string        // HH:MM:SS — lives on dance_classes, not class_schedules
  duration_minutes: number
  base_price_cents: number
  capacity: number
  color: string | null
  flyer_url: string | null
  description: string | null
}

export interface ClassSchedule {
  id: string
  date: string
  status: string
  dance_classes: DanceClass
  booking_count?: number
}

export interface ScheduleGroup {
  date: string
  schedules: ClassSchedule[]
}

export async function getUpcomingSchedules(): Promise<ClassSchedule[]> {
  const db = getSupabaseServer()
  const today = new Date().toISOString().split('T')[0]

  const { data, error } = await db
    .from('class_schedules')
    .select(`
      id, date, status,
      dance_classes!inner(
        id, name, style, level, instructor_name, start_time, duration_minutes,
        base_price_cents, capacity, color, flyer_url, description
      )
    `)
    .eq('status', 'scheduled')
    .gte('date', today)
    .order('date', { ascending: true })
    .limit(60)

  if (error) {
    console.error('[getUpcomingSchedules] Supabase error:', error.message)
    return []
  }
  if (!data) return []

  // Fetch booking counts for each schedule
  const schedules = await Promise.all(
    (data as unknown as ClassSchedule[]).map(async (schedule) => {
      const { count } = await db
        .from('bookings')
        .select('*', { count: 'exact', head: true })
        .eq('schedule_id', schedule.id)
        .eq('status', 'confirmed')
      return { ...schedule, booking_count: count ?? 0 }
    })
  )

  return schedules
}

export function groupSchedulesByDate(schedules: ClassSchedule[]): ScheduleGroup[] {
  const groups: Record<string, ClassSchedule[]> = {}
  for (const s of schedules) {
    if (!groups[s.date]) groups[s.date] = []
    groups[s.date].push(s)
  }
  return Object.entries(groups).map(([date, schedules]) => ({ date, schedules }))
}

export function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(0)}`
}

export function getSpotsLeft(capacity: number, booked: number): number {
  return Math.max(0, capacity - booked)
}

export function spotsLabel(capacity: number, booked: number): string {
  const left = getSpotsLeft(capacity, booked)
  if (left === 0) return 'FULL'
  if (left < 10) return `${left} left`
  return 'OPEN'
}

export function spotsColor(capacity: number, booked: number): string {
  const left = getSpotsLeft(capacity, booked)
  if (left === 0) return 'var(--ink-4)'
  if (left < 5) return '#ef4444'
  if (left < 10) return '#f59e0b'
  return 'var(--ink-3)'
}

export async function getClassById(id: string): Promise<DanceClass | null> {
  const db = getSupabaseServer()
  const { data, error } = await db
    .from('dance_classes')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !data) return null
  return data as DanceClass
}

export async function getSchedulesForClass(classId: string): Promise<ClassSchedule[]> {
  const db = getSupabaseServer()
  const today = new Date().toISOString().split('T')[0]

  const { data, error } = await db
    .from('class_schedules')
    .select(`
      id, date, status,
      dance_classes!inner(
        id, name, style, level, instructor_name, start_time, duration_minutes,
        base_price_cents, capacity, color, flyer_url, description
      )
    `)
    .eq('class_id', classId)
    .eq('status', 'scheduled')
    .gte('date', today)
    .order('date', { ascending: true })
    .limit(12)

  if (error || !data) return []

  const schedules = await Promise.all(
    (data as unknown as ClassSchedule[]).map(async (schedule) => {
      const { count } = await db
        .from('bookings')
        .select('*', { count: 'exact', head: true })
        .eq('schedule_id', schedule.id)
        .eq('status', 'confirmed')
      return { ...schedule, booking_count: count ?? 0 }
    })
  )

  return schedules
}
