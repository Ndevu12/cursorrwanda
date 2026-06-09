<script lang="ts">
  import Header from './lib/components/Header.svelte'
  import Footer from './lib/components/Footer.svelte'
  import HackathonPromo from './lib/components/HackathonPromo.svelte'
  import HomePage from './lib/pages/HomePage.svelte'
</script>

<Header />
<HackathonPromo />
<main>
  <HomePage />
</main>
<Footer />

<style>
  main {
    display: flex;
    flex-direction: column;
  }
</style>
