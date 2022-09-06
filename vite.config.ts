import { defineConfig } from 'vite'
import Laravel from 'laravel-vite-plugin'
import Vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
  resolve: {
    alias: {
      '@': '/resources/scripts',
    },
  },

  plugins: [
    Laravel({
      input: ['resources/scripts/main.ts'],
      refresh: true,
    }),

    Vue({
      reactivityTransform: true,
      template: {
        transformAssetUrls: {
          base: null,
          includeAbsolute: false,
        },
      },
    }),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: [
        'vue',
        'vue/macros',
        // custom
        {
          '@inertiajs/inertia': ['Inertia'],
          '@inertiajs/progress': ['InertiaProgress'],
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
      vueTemplate: true,
    }),

    // https://github.com/antfu/unplugin-vue-components
    Components({
      // relative paths to the directory to search for components.
      dirs: ['resources/scripts/components'],
      resolvers: [
        (componentName) => {
          // importing Head and Link from Inertia
          if (['Head', 'Link'].includes(componentName))
            return { name: componentName, from: '@inertiajs/inertia-vue3' }
        },
      ],
      dts: 'resources/scripts/components.d.ts',
    }),
  ],
})
