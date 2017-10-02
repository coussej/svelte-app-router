# Svelte App Router

A simple router for your Single Page Application.

[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)

## Features

* Hash based routing
* Data can be set for components when declaring routes
* Querystring parameters are passed to component when mounted (optional)
* No special `<link>` components needed, just use standard `<a>`.

## Installation

```
npm install --save svelte-app-router
```

## Usage:

Routes should be specified as on object where each key is a route, and each value is an array containing a component as first element and optionally an data-object as second element.

```html
<!-- Links. These can be here or anywhere else in your app. -->
<a href="#/home">Home</a>
<a href="#/contact">Contact</a>
<a href="#/notfound">Does not exist</a>

<!-- The Router component. Content between Router start and end tag will be 
     shown in case of navigation to a non-existing route.-->
<Router routes="{{ routes }}">
  <div class="error">
    Houston, we have a problem! This page was not found.
  </div>
</Router>

<script>
  import Router from 'svelte-app-router'
  import Home from './pages/Home.html'
  import Contact from './pages/Contact.html'

  export default {

    data () {
      return {
        routes: {
          '/': [Home, {message: 'from "/" path'}],
          '/home' [Home, {message: 'from "/home" path'}]
          '/contact': [Contact]
        }
      }
    },

    components: {
      Router
    }
  
  }
</script>
```

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request

## Credits

* Jeroen Coussement - [@coussej](https://twitter.com/coussej) - [coussej.github.io](http://coussej.github.io)

## License

MIT
