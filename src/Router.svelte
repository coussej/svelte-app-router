<script>
  import { onDestroy, onMount, tick } from 'svelte'
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
      const replacements = [
        // Remove these because they break our JSON.parse
        [/\f/g, ''], [/\n/g, ''],
        // Escape these because they break our JSON.parse
        [/\//g, '\\/'], [/\t/g, '\\t'], [/\r/g, '\\r'],
        // Transform these to make our querystring into JSON
        [/"/g, '\\"'], [/&/g, '","'], [/=/g, '":"'],
      ]
      const parts = replacements
        .reduce((acc, [pattern, replacement]) => {
          return acc.replace(pattern, replacement)
        }, decodeURI(hashParts[1]))

      query = JSON.parse(`{"${parts}"}`)
    }

    return { path, query }
  }

  async function drawRoute () {
    const urlParts = getURLParts()
    const nextRoute = routes[urlParts.path]

    // Destroy the current view if its' not the same view as before
    if (activePath !== urlParts.path && activeComponent.$destroy) {
      activeComponent.$destroy()
    }

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
    if (activePath !== urlParts.path) {
      activeComponent = new nextRoute[0]({
        target: getContainer(),
        props: data
      })
    } else {
      activeComponent.$set(data)
    }

    activePath = urlParts.path
    notFound = false
  }

  onMount(() => {
    if (getContainer().childElementCount) return
    drawRoute()
  })

  onDestroy(() => {
    if (activeComponent.$destroy) {
      activeComponent.$destroy()
    }
  })
</script>

<svelte:window on:hashchange={drawRoute} />

<div class="svelte-app-router" />

{#if notFound}
  <slot>
    <p class="fallback">Route not found</p>
  </slot>
{/if}
