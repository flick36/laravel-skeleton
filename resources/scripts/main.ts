import '@/css/app.css'
import { createInertiaApp } from '@inertiajs/inertia-vue3'
import { InertiaProgress } from '@inertiajs/progress'
import { createApp, h } from 'vue'

createInertiaApp({
  resolve: async (name) => {
    return (await import(`./Pages/${name}.vue`)).default
  },
  setup({ el, app, props, plugin }) {
    createApp({ render: () => h(app, props) })
      .use(plugin)
      .mount(el)
  },
})

InertiaProgress.init({ color: '#4B5563' })
