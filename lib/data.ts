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

const CLASS_FIELDS = 'id, name, style, level, instructor_name, start_time, duration_minutes, base_price_cents, capacity, color, flyer_url, description'

async function attachBookingCounts(db: ReturnType<typeof getSupabaseServer>, schedules: Omit<ClassSchedule, 'booking_count'>[]): Promise<ClassSchedule[]> {
  return Promise.all(
    schedules.map(async (schedule) => {
      const { count } = await db
        .from('bookings')
        .select('*', { count: 'exact', head: true })
        .eq('schedule_id', schedule.id)
        .eq('status', 'confirmed')
      return { ...schedule, booking_count: count ?? 0 }
    })
  )
}

export async function getUpcomingSchedules(): Promise<ClassSchedule[]> {
  const db = getSupabaseServer()
  const today = new Date().toISOString().split('T')[0]

  const { data: schedulesData, error: schedulesError } = await db
    .from('class_schedules')
    .select('id, date, status, class_id')
    .eq('status', 'scheduled')
    .gte('date', today)
    .order('date', { ascending: true })
    .limit(60)

  if (schedulesError) {
    console.error('[getUpcomingSchedules] schedules error:', schedulesError.message)
    return []
  }
  if (!schedulesData?.length) return []

  const classIds = [...new Set(schedulesData.map((s: { class_id: string }) => s.class_id))]

  const { data: classesData, error: classesError } = await db
    .from('dance_classes')
    .select(CLASS_FIELDS)
    .in('id', classIds)

  if (classesError) {
    console.error('[getUpcomingSchedules] classes error:', classesError.message)
    return []
  }
  if (!classesData) return []

  const classMap = new Map<string, DanceClass>((classesData as DanceClass[]).map((c) => [c.id, c]))

  const merged = (schedulesData as { id: string; date: string; status: string; class_id: string }[])
    .filter((s) => classMap.has(s.class_id))
    .map((s) => ({
      id: s.id,
      date: s.date,
      status: s.status,
      dance_classes: classMap.get(s.class_id)!,
    }))

  return attachBookingCounts(db, merged)
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
    .select(CLASS_FIELDS)
    .eq('id', id)
    .single()

  if (error || !data) return null
  return data as DanceClass
}

export async function getSchedulesForClass(classId: string): Promise<ClassSchedule[]> {
  const db = getSupabaseServer()
  const today = new Date().toISOString().split('T')[0]

  const { data: schedulesData, error: schedulesError } = await db
    .from('class_schedules')
    .select('id, date, status')
    .eq('class_id', classId)
    .eq('status', 'scheduled')
    .gte('date', today)
    .order('date', { ascending: true })
    .limit(12)

  if (schedulesError || !schedulesData?.length) return []

  const { data: classData, error: classError } = await db
    .from('dance_classes')
    .select(CLASS_FIELDS)
    .eq('id', classId)
    .single()

  if (classError || !classData) return []

  const cls = classData as DanceClass
  const merged = (schedulesData as { id: string; date: string; status: string }[]).map((s) => ({
    id: s.id,
    date: s.date,
    status: s.status,
    dance_classes: cls,
  }))

  return attachBookingCounts(db, merged)
}
