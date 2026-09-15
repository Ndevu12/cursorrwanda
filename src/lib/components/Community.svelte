<script lang="ts">
  import { onMount } from 'svelte'
  import { loadEvents } from '../luma'

  let eventsHosted = $state<number | null>(null)

  onMount(async () => {
    try {
      const payload = await loadEvents()
      eventsHosted = payload.upcoming.length + payload.past.length
    } catch {
      // Keep the stat hidden if events cannot be loaded.
    }
  })
</script>

<section id="community" class="section">
  <div class="container">
    <div class="section-header centered">
      <p class="section-label">Community voices</p>
      <h2>Builders helping builders.</h2>
    </div>

    <div class="stats">
      <div class="stat">
        <span class="stat-value">200+</span>
        <span class="stat-label">Community members</span>
      </div>
      <div class="stat">
        <span class="stat-value">{eventsHosted ?? '—'}</span>
        <span class="stat-label">Events hosted</span>
      </div>
      <div class="stat">
        <span class="stat-value city">Kigali</span>
        <span class="stat-label">City represented</span>
      </div>
    </div>
  </div>
</section>

<style>
  .stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1px;
    background: var(--border);
    border: 1px solid var(--border);
    border-radius: 12px;
    overflow: hidden;
  }

  .stat {
    background: var(--card-01);
    padding: 2rem;
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }

  .stat-value {
    font-size: clamp(2rem, 4vw, 2.75rem);
    letter-spacing: -0.03em;
    color: var(--fg);
  }

  .stat-value.city {
    font-size: clamp(1.75rem, 3.5vw, 2.25rem);
  }

  .stat-label {
    font-size: 0.875rem;
    color: var(--fg-secondary);
  }

  @media (max-width: 640px) {
    .stats {
      grid-template-columns: 1fr;
    }
  }
</style>
