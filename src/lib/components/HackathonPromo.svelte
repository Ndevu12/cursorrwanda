<script lang="ts">
  import { HACKATHON_DATE_LABEL, HACKATHON_TITLE } from '../config'
</script>

<a href="/#events" class="promo">
  <div class="container promo-inner">
    <span class="promo-label">Up next</span>
    <span class="promo-title">{HACKATHON_TITLE}</span>
    <span class="promo-date">{HACKATHON_DATE_LABEL}</span>
    <span class="promo-link" aria-hidden="true">
      <svg viewBox="0 0 16 16" fill="none">
        <path
          d="M3 8h10M9 4l4 4-4 4"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </span>
  </div>
</a>

<style>
  .promo {
    display: block;
    border-bottom: 1px solid var(--border);
    background: var(--card-01);
    transition: background 0.2s ease;
  }

  .promo:hover {
    background: var(--card-02);
  }

  .promo-inner {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding-block: 0.875rem;
    font-size: 0.875rem;
  }

  .promo-label {
    color: var(--accent);
    letter-spacing: 0.04em;
    text-transform: uppercase;
    font-size: 0.6875rem;
  }

  .promo-title {
    color: var(--fg);
  }

  .promo-date {
    color: var(--fg-secondary);
  }

  .promo-link {
    margin-left: auto;
    color: var(--fg-secondary);
    transition: color 0.2s ease, transform 0.2s ease;
  }

  .promo-link svg {
    width: 0.875rem;
    height: 0.875rem;
  }

  .promo:hover .promo-link {
    color: var(--fg);
    transform: translateX(2px);
  }

  @media (max-width: 640px) {
    .promo-inner {
      flex-wrap: wrap;
      gap: 0.35rem 0.75rem;
    }

    .promo-link {
      margin-left: 0;
    }
  }
</style>
