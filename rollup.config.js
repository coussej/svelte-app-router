import svelte from 'rollup-plugin-svelte';

export default {
  input: 'src/Router.html',
  output: {
    file: 'dist/svelte-app-router.js',
    format: 'cjs'
  },
  plugins: [
    svelte({
      include: 'src/**/*.html'
    })
  ]
}