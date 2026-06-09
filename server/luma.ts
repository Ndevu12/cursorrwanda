export type LumaGeoAddress = {
  address?: string | null
  city?: string | null
  city_state?: string | null
  full_address?: string | null
}

export type LumaEventEntry = {
  platform: string
  id: string
  name: string
  description?: string
  description_md?: string
  start_at: string
  end_at: string
  url: string
  timezone?: string
  geo_address_json?: LumaGeoAddress | null
  meeting_url?: string | null
}

export type LumaEventsResponse = {
  entries: LumaEventEntry[]
  has_more: boolean
  next_cursor?: string
}

export type SiteEvent = {
  id: string
  title: string
  date: string
  location: string
  description: string
  status: 'Upcoming' | 'Past'
  url: string
}

export type SiteEventsPayload = {
  upcoming: SiteEvent[]
  past: SiteEvent[]
  fetchedAt: string
}

const LUMA_API_BASE = 'https://public-api.luma.com/v1'

export function normalizeLumaApiKey(apiKey: string | undefined): string | undefined {
  const trimmed = apiKey?.trim()
  return trimmed || undefined
}

export function isEventsPayloadEmpty(payload: SiteEventsPayload): boolean {
  return payload.upcoming.length === 0 && payload.past.length === 0
}

function formatEventDate(iso: string, timezone = 'Africa/Kigali'): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: timezone,
  }).format(new Date(iso))
}

function formatLocation(entry: LumaEventEntry): string {
  const geo = entry.geo_address_json
  if (geo?.full_address) return geo.full_address
  if (geo?.address && geo?.city_state) return `${geo.address}, ${geo.city_state}`
  if (geo?.address) return geo.address
  if (entry.meeting_url) return 'Online'
  return 'Kigali, Rwanda'
}

function stripMarkdown(text: string): string {
  return text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[#*_>`~]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function toSiteEvent(entry: LumaEventEntry, status: 'Upcoming' | 'Past'): SiteEvent {
  const description =
    stripMarkdown(entry.description_md || entry.description || '') ||
    'Community event on the Cursor Kigali calendar.'

  return {
    id: entry.id,
    title: entry.name,
    date: formatEventDate(entry.start_at, entry.timezone),
    location: formatLocation(entry),
    description,
    status,
    url: entry.url,
  }
}

export async function fetchAllLumaEvents(apiKey: string): Promise<LumaEventEntry[]> {
  const events: LumaEventEntry[] = []
  let cursor: string | undefined

  do {
    const params = new URLSearchParams({
      pagination_limit: '50',
      sort_column: 'start_at',
      sort_direction: 'desc',
      status: 'approved',
    })

    if (cursor) params.set('pagination_cursor', cursor)

    const response = await fetch(`${LUMA_API_BASE}/calendar/list-events?${params}`, {
      headers: {
        'x-luma-api-key': apiKey,
        accept: 'application/json',
      },
    })

    if (!response.ok) {
      const body = await response.text()
      throw new Error(`Luma API error ${response.status}: ${body}`)
    }

    const data = (await response.json()) as LumaEventsResponse
    events.push(...data.entries)
    cursor = data.has_more ? data.next_cursor : undefined
  } while (cursor)

  return events
}

export function partitionEvents(entries: LumaEventEntry[]): SiteEventsPayload {
  const now = Date.now()

  const upcoming = entries
    .filter((entry) => new Date(entry.end_at).getTime() >= now)
    .sort((a, b) => new Date(a.start_at).getTime() - new Date(b.start_at).getTime())
    .map((entry) => toSiteEvent(entry, 'Upcoming'))

  const past = entries
    .filter((entry) => new Date(entry.end_at).getTime() < now)
    .sort((a, b) => new Date(b.start_at).getTime() - new Date(a.start_at).getTime())
    .map((entry) => toSiteEvent(entry, 'Past'))

  return {
    upcoming,
    past,
    fetchedAt: new Date().toISOString(),
  }
}

export async function getSiteEvents(apiKey: string): Promise<SiteEventsPayload> {
  const normalizedKey = normalizeLumaApiKey(apiKey)
  if (!normalizedKey) {
    throw new Error('LUMA_API_KEY is not configured')
  }

  const entries = await fetchAllLumaEvents(normalizedKey)
  return partitionEvents(entries)
}
