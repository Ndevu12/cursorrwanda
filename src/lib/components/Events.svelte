<script lang="ts">
  import { onMount } from 'svelte'
  import { LUMA_CALENDAR_URL } from '../config'
  import { loadEvents, type SiteEvent } from '../luma'

  function isHackathonEvent(event: SiteEvent): boolean {
    const title = event.title.toLowerCase()
    return title.includes('hackathon') || title.includes('hackthon')
  }

  let upcoming = $state<SiteEvent[]>([])
  let past = $state<SiteEvent[]>([])
  let loading = $state(true)
  let error = $state<string | null>(null)

  onMount(async () => {
    try {
      const payload = await loadEvents()
      upcoming = payload.upcoming
      past = payload.past
    } catch (e) {
      error = e instanceof Error ? e.message : 'Failed to load events'
    } finally {
      loading = false
    }
  })
</script>

<section id="events" class="section">
  <div class="container">
    <div class="section-header">
      <p class="section-label">Events</p>
      <h2>Upcoming events.</h2>
      <p class="section-intro">
        Meetups, workshops, and build nights across Kigali.
      </p>
    </div>

    {#if loading}
      <div class="state-card">Loading events…</div>
    {:else if error}
      <div class="state-card">
        <p>{error}</p>
        <a href={LUMA_CALENDAR_URL} target="_blank" rel="noreferrer" class="btn btn-secondary">
          View calendar on Luma
        </a>
      </div>
    {:else}
      <div class="events-block">
        <div class="block-header">
          <h3>Upcoming</h3>
          <a href={LUMA_CALENDAR_URL} target="_blank" rel="noreferrer" class="link-arrow">
            Subscribe on Luma
            <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </a>
        </div>

        {#if upcoming.length === 0}
          <div class="state-card empty">
            <p>No upcoming events yet.</p>
            <a href={LUMA_CALENDAR_URL} target="_blank" rel="noreferrer" class="btn btn-primary">
              Subscribe for updates
            </a>
          </div>
        {:else}
          <div class="event-list">
            {#each upcoming as event}
              {@const hackathon = isHackathonEvent(event)}
              <a
                href={event.url}
                target="_blank"
                rel="noreferrer"
                class="event"
                class:featured={hackathon}
              >
                <div class="event-date">{event.date}</div>
                <div class="event-content">
                  <div class="event-top">
                    <h4>{event.title}</h4>
                    <span class="badge upcoming">{hackathon ? 'Hackathon' : 'Upcoming'}</span>
                  </div>
                  <p class="event-location">{event.location}</p>
                  {#if !hackathon}
                    <p class="event-desc">{event.description}</p>
                  {/if}
                </div>
              </a>
            {/each}
          </div>
        {/if}
      </div>

      {#if past.length > 0}
        <div class="events-block past-block">
          <div class="block-header">
            <h3>Past events</h3>
          </div>
          <div class="event-list">
            {#each past as event}
              <a href={event.url} target="_blank" rel="noreferrer" class="event past">
                <div class="event-date">{event.date}</div>
                <div class="event-content">
                  <div class="event-top">
                    <h4>{event.title}</h4>
                    <span class="badge">Past</span>
                  </div>
                  <p class="event-location">{event.location}</p>
                  <p class="event-desc">{event.description}</p>
                </div>
              </a>
            {/each}
          </div>
        </div>
      {/if}
    {/if}

    <a href={LUMA_CALENDAR_URL} target="_blank" rel="noreferrer" class="link-arrow events-link">
      View full calendar on Luma
      <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </a>
  </div>
</section>

<style>
  .events-block + .events-block {
    margin-top: 3rem;
  }

  .block-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .block-header h3 {
    font-size: 1.125rem;
    font-weight: 400;
    color: var(--fg);
  }

  .state-card {
    padding: 2rem;
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 12px;
    color: var(--fg-secondary);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .state-card.empty {
    align-items: center;
    text-align: center;
  }

  .event-list {
    display: flex;
    flex-direction: column;
    gap: 1px;
    background: var(--border);
    border: 1px solid var(--border);
    border-radius: 12px;
    overflow: hidden;
  }

  .event {
    display: grid;
    grid-template-columns: 140px 1fr;
    gap: 2rem;
    padding: 1.75rem 2rem;
    background: var(--card);
    transition: background 0.2s ease;
    color: inherit;
    text-decoration: none;
  }

  .event:hover {
    background: var(--card-01);
  }

  .event.featured .event-date {
    color: var(--accent);
  }

  .event.past {
    opacity: 0.55;
  }

  .event-date {
    font-size: 0.875rem;
    color: var(--fg-secondary);
    padding-top: 0.15rem;
  }

  .event-top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 1rem;
    margin-bottom: 0.35rem;
  }

  .event-top h4 {
    font-size: 1.125rem;
    font-weight: 400;
    line-height: 1.3;
    margin: 0;
  }

  .badge {
    flex-shrink: 0;
    font-size: 0.6875rem;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    padding: 0.25rem 0.5rem;
    border-radius: 999px;
    border: 1px solid var(--border-strong);
    color: var(--fg-secondary);
  }

  .badge.upcoming {
    border-color: rgba(245, 78, 0, 0.35);
    color: var(--accent);
  }

  .event-location {
    font-size: 0.875rem;
    color: var(--fg-secondary);
    margin-bottom: 0.5rem;
  }

  .event-desc {
    font-size: 0.9375rem;
    line-height: 1.55;
    color: var(--fg-secondary);
    margin: 0;
  }

  .events-link {
    display: inline-flex;
    margin-top: 2rem;
  }

  @media (max-width: 640px) {
    .event {
      grid-template-columns: 1fr;
      gap: 0.75rem;
      padding: 1.25rem 1.5rem;
    }

    .block-header {
      flex-direction: column;
      align-items: flex-start;
    }
  }
</style>
