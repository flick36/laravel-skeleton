import { importPageComponent } from './utils'

const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel'

createInertiaApp({
  title: title => `${title} | ${appName}`,
  resolve: name => importPageComponent(name, import.meta.glob('./pages/**/*.vue')),
  setup({ el, app, props, plugin }) {
    createApp({ render: () => h(app, props) })
      .use(plugin)
      .mount(el)
  },
})

InertiaProgress.init({ color: '#4B5563' })
