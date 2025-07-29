import { createApp } from 'vue'
import { expect, it } from 'vitest'
import '@/main.js'
import App from '@/App.vue'

it('monta o app e verifica se a div #app está no DOM', () => {
  document.body.innerHTML = '<div id="app"></div>'

  createApp(App).mount('#app')

  const appDiv = document.querySelector('#app')
  expect(appDiv).not.toBeNull()
})
