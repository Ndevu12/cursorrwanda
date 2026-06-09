<footer class="footer">
  <div class="container footer-inner">
    <div class="footer-brand">
      <img src="/logos/LOCKUP_HORIZONTAL_2D_DARK.svg" alt="Cursor" width="100" height="24" />
      <p>
        Meetups, workshops, and build nights for developers in Rwanda.
        Supported through the
        <a href="https://cursor.com/ambassadors" target="_blank" rel="noreferrer">Cursor Ambassadors Program</a>.
      </p>
    </div>

    <div class="footer-links">
      <div>
        <h4>Community</h4>
        <a href="/#about">About</a>
        <a href="/#team">Team</a>
        <a href="/#gallery">Gallery</a>
        <a href="/#events">Events</a>
        <a href="/#join">Join</a>
      </div>
      <div>
        <h4>Cursor</h4>
        <a href="https://cursor.com" target="_blank" rel="noreferrer">Website</a>
        <a href="https://cursor.com/docs" target="_blank" rel="noreferrer">Docs</a>
        <a href="https://cursor.com/ambassadors" target="_blank" rel="noreferrer">Ambassadors</a>
        <a href="https://forum.cursor.com" target="_blank" rel="noreferrer">Forum</a>
      </div>
    </div>
  </div>

  <div class="footer-bottom">
    <div class="container">
      <p>© {new Date().getFullYear()} Cursor Community Rwanda · Kigali, Rwanda</p>
    </div>
  </div>
</footer>

<style>
  .footer {
    border-top: 1px solid var(--border);
  }

  .footer-inner {
    display: grid;
    grid-template-columns: 1.5fr 1fr;
    gap: 3rem;
    padding-block: 3rem;
  }

  .footer-brand img {
    height: 20px;
    width: auto;
    margin-bottom: 1rem;
    opacity: 0.7;
  }

  .footer-brand p {
    font-size: 0.8125rem;
    line-height: 1.6;
    color: var(--fg-secondary);
    max-width: 28rem;
  }

  .footer-brand a {
    color: var(--fg-secondary);
    text-decoration: underline;
    text-underline-offset: 2px;
    text-decoration-color: var(--border-strong);
    transition: color 0.2s ease, text-decoration-color 0.2s ease;
  }

  .footer-brand a:hover {
    color: var(--fg);
    text-decoration-color: var(--fg-secondary);
  }

  .footer-links {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }

  .footer-links h4 {
    font-size: 0.8125rem;
    font-weight: 400;
    color: var(--fg-secondary);
    margin-bottom: 0.75rem;
  }

  .footer-links a {
    display: block;
    font-size: 0.875rem;
    color: var(--fg-secondary);
    padding: 0.25rem 0;
    transition: color 0.2s ease;
  }

  .footer-links a:hover {
    color: var(--fg);
  }

  .footer-bottom {
    border-top: 1px solid var(--border);
    padding-block: 1.25rem;
  }

  .footer-bottom p {
    font-size: 0.8125rem;
    color: var(--fg-secondary);
  }

  @media (max-width: 640px) {
    .footer-inner {
      grid-template-columns: 1fr;
      gap: 2rem;
    }
  }
</style>
