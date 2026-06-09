<script lang="ts">
  let menuOpen = $state(false);

  const navLinks = [
    { href: '/#about', label: 'About' },
    { href: '/#team', label: 'Team' },
    { href: '/#community', label: 'Community' },
    { href: '/#gallery', label: 'Gallery' },
    { href: '/#events', label: 'Events' },
    { href: '/#join', label: 'Join' },
  ];
</script>

<header class="header">
  <div class="container header-inner">
    <a href="/" class="logo" aria-label="Cursor Community Rwanda home">
      <img src="/logos/LOCKUP_HORIZONTAL_2D_DARK.svg" alt="Cursor" width="120" height="28" />
      <span class="region">Rwanda</span>
    </a>

    <nav class="nav" class:open={menuOpen} aria-label="Main">
      {#each navLinks as link}
        <a href={link.href} onclick={() => (menuOpen = false)}>{link.label}</a>
      {/each}
    </nav>

    <div class="actions">
      <a href="/#join" class="btn btn-primary">Join the community</a>
      <button
        class="menu-toggle"
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
        onclick={() => (menuOpen = !menuOpen)}
      >
        <span></span>
        <span></span>
      </button>
    </div>
  </div>
</header>

<style>
  .header {
    position: sticky;
    top: 0;
    z-index: 100;
    height: var(--nav-height);
    border-bottom: 1px solid var(--border);
    background: rgba(20, 18, 11, 0.82);
    backdrop-filter: blur(12px);
  }

  .header-inner {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1.5rem;
  }

  .logo {
    display: flex;
    align-items: center;
    gap: 0.625rem;
    flex-shrink: 0;
  }

  .logo img {
    height: 22px;
    width: auto;
  }

  .region {
    font-size: 0.8125rem;
    color: var(--fg-secondary);
    padding-left: 0.625rem;
    border-left: 1px solid var(--border-strong);
  }

  .nav {
    display: flex;
    align-items: center;
    gap: 2rem;
  }

  .nav a {
    font-size: 0.9375rem;
    color: var(--fg-secondary);
    transition: color 0.2s ease;
  }

  .nav a:hover {
    color: var(--fg);
  }

  .actions {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .actions .btn-primary {
    padding: 0.5rem 0.875rem;
    font-size: 0.875rem;
  }

  .menu-toggle {
    display: none;
    width: 2rem;
    height: 2rem;
    flex-direction: column;
    justify-content: center;
    gap: 6px;
    padding: 0;
  }

  .menu-toggle span {
    display: block;
    width: 100%;
    height: 1.5px;
    background: var(--fg);
    transition: transform 0.2s ease;
  }

  @media (max-width: 768px) {
    .nav {
      position: fixed;
      inset: var(--nav-height) 0 auto 0;
      flex-direction: column;
      align-items: stretch;
      padding: 1.5rem 1.5rem 2rem;
      background: var(--bg);
      border-bottom: 1px solid var(--border);
      transform: translateY(-110%);
      opacity: 0;
      pointer-events: none;
      transition:
        transform 0.25s ease,
        opacity 0.25s ease;
    }

    .nav.open {
      transform: translateY(0);
      opacity: 1;
      pointer-events: auto;
    }

    .nav a {
      padding: 0.75rem 0;
      border-bottom: 1px solid var(--border);
    }

    .menu-toggle {
      display: flex;
    }

    .actions .btn-primary {
      display: none;
    }
  }
</style>
