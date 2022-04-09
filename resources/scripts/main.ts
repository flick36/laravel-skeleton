import { InertiaProgress } from '@inertiajs/progress'

const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel'

createInertiaApp({
  title: title => `${title} - ${appName}`,
  resolve: async(name) => {
    return (await import(`./pages/${name}.vue`)).default
  },
  setup({ el, app, props, plugin }) {
    createApp({ render: () => h(app, props) })
      .use(plugin)
      .mount(el)
  },
})

InertiaProgress.init({ color: '#4B5563' })
