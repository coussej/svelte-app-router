<script>
  import Router from '../Router.svelte'
  import Home from './Home.svelte'
  import Contact from './Contact.svelte'

  const routes = {
    '/': [Home, { message: 'from "/" path' }],
    '/home': [Home, { message: 'from "/home" path' }],
    '/contact': [Contact]
  }
</script>

<a href="#/home">Home</a>
<a href="#/contact">Contact</a>
<a href="#/notfound">Does not exist</a>

<Router routes={routes}>
  <!--
    Content between Router start and end tag will be shown incase of navigation
    to a non-existing route.
   -->
  <div class="error">
    Houston, we have a problem! This page was not found.
  </div>
</Router>
