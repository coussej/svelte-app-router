<script>
  import { onMount, tick } from 'svelte'
  export let routes = {}
  export let notFound = false
  export let includeQueryParameters = true
  export let activePath = ''
  export let activeComponent = {}

  function getContainer () {
    return document.querySelector('.svelte-app-router')
  }

  function getURLParts () {
    const hashParts = (window.location.hash.slice(1) || '/').split('?')
    const path = hashParts[0]
    let query = {}
    if (hashParts[1]) {
      const parts = decodeURI(hashParts[1])
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"')
      query = JSON.parse(`{"${parts}"}`)
    }

    return { path, query }
  }

  async function route () {
    const urlParts = getURLParts()
    const nextRoute = routes[urlParts.path]

    // Destroy the current view
    if (activeComponent.$destroy) activeComponent.$destroy()

    // No matching route is found
    if (!nextRoute) {
      activeComponent = {}
      activePath = urlParts.path
      notFound = true
      return
    }

    // Set current view to the component defined by the route
    const data = nextRoute[1] || {}
    if (includeQueryParameters) {
      for (const key in urlParts.query) {
        if (Object.prototype.hasOwnProperty.call(urlParts.query, key)) {
          data[key] = urlParts.query[key]
        }
      }
    }

    await tick()
    activeComponent = new nextRoute[0]({
      target: getContainer(),
      props: data
    })
    activePath = urlParts.path
    notFound = false
  }

  onMount(() => {
    if (getContainer().childElementCount) return
    route()
  })
</script>

<svelte:window on:hashchange={route} />

<div class="svelte-app-router" />

{#if notFound}
  <slot>
    <p class="fallback">Route not found</p>
  </slot>
{/if}
