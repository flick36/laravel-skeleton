import { defineConfig } from 'vite'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import Laravel from 'vite-plugin-laravel'
import Vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
  plugins: [
    Vue({
      reactivityTransform: true,
    }),

    Laravel({
      postcss: [
        tailwindcss(),
        autoprefixer(),
      ],
    }),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: [
        'vue',
        'vue/macros',
        // custom
        {
          '@inertiajs/inertia': ['Inertia'],
          '@inertiajs/inertia-vue3': [
            'App',
            'plugin',
            'createInertiaApp',
            'useForm',
            'useRemember',
            'usePage',
          ],
        },
      ],
      dts: 'resources/scripts/auto-imports.d.ts',
    }),

    // https://github.com/antfu/unplugin-vue-components
    Components({
      // importing from 'resources/scripts/components/**' excluding the Jetstream Folder
      globs: ['resources/scripts/components/!(Jetstream)/**'],
      resolvers: [
        (componentName) => {
          // importing Head and Link from Inertia
          if (['Head', 'Link'].includes(componentName))
            return { name: componentName, from: '@inertiajs/inertia-vue3' }

          // importing laravel/jetstream components
          if (componentName.startsWith('Jet'))
            return `/resources/scripts/components/Jetstream/${componentName.slice(3)}.vue`
        },
      ],
      dts: 'resources/scripts/components.d.ts',
    }),
  ],
})
