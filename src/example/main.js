import Example from './Example.svelte'

const app = new Example({
  target: document.body
})

window.app = app

export default app
