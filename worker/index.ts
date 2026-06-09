import {
  getSiteEvents,
  isEventsPayloadEmpty,
  normalizeLumaApiKey,
  type SiteEventsPayload,
} from '../server/luma'

function normalizePathname(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith('/')) {
    return pathname.slice(0, -1)
  }
  return pathname
}

const EVENTS_CACHE_HEADERS = {
  'content-type': 'application/json',
  'cache-control': 'public, max-age=300',
}

function isEventsPayload(value: unknown): value is SiteEventsPayload {
  return (
    typeof value === 'object' &&
    value !== null &&
    'upcoming' in value &&
    'past' in value &&
    Array.isArray((value as SiteEventsPayload).upcoming) &&
    Array.isArray((value as SiteEventsPayload).past)
  )
}

async function readStaticEventsSnapshot(
  request: Request,
  env: Env,
): Promise<SiteEventsPayload | null> {
  const assetResponse = await env.ASSETS.fetch(
    new Request(new URL('/events.json', request.url), request),
  )
  const contentType = assetResponse.headers.get('content-type') ?? ''

  if (!assetResponse.ok || !contentType.includes('json')) {
    return null
  }

  try {
    const payload: unknown = await assetResponse.json()
    if (isEventsPayload(payload)) return payload
  } catch {
    return null
  }

  return null
}

function jsonEventsResponse(payload: SiteEventsPayload): Response {
  return Response.json(payload, { headers: EVENTS_CACHE_HEADERS })
}

async function serveEvents(request: Request, env: Env): Promise<Response> {
  const snapshot = await readStaticEventsSnapshot(request, env)
  const apiKey = normalizeLumaApiKey(env.LUMA_API_KEY)

  if (apiKey) {
    try {
      const live = await getSiteEvents(apiKey)
      if (!isEventsPayloadEmpty(live)) {
        return jsonEventsResponse(live)
      }

      console.warn('Luma API returned no events; using committed events.json snapshot.')
    } catch (error) {
      console.error(
        'Luma API fetch failed; using committed events.json snapshot.',
        error instanceof Error ? error.message : error,
      )
    }
  }

  if (snapshot) return jsonEventsResponse(snapshot)

  return Response.json({ error: 'Events snapshot is not available' }, { status: 503 })
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const pathname = normalizePathname(new URL(request.url).pathname)

    if (pathname === '/api/events' || pathname === '/events.json') {
      return serveEvents(request, env)
    }

    return env.ASSETS.fetch(request)
  },
} satisfies ExportedHandler<Env>
