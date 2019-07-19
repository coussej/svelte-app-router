<script>
  import { onMount } from 'svelte'
  export let routes = {}
  export let notFound = false
  export let includeQueryParameters = true
  export let activePath =  ''
  export let activeComponent = {}
  export let view

  function getURLParts() {
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

  function route () {
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
        if (urlParts.query.hasOwnProperty(key)) {
          data[key] = urlParts.query[key]
        }
      }
    }

    activeComponent = new nextRoute[0]({
      target: view,
      data: data
    })
    activePath = urlParts.path,
    notFound = false
  }

  onMount(() => {
    if (view.childElementCount) return
    route()
  })
</script>

<svelte:window on:hashchange={route} />

<div bind:this={view} />

{#if notFound}
  <slot>
    <p class="fallback">Route {{ activePath }} not found</p>
  </slot>
{/if}