import { defineConfig } from 'vite'
import Laravel from 'laravel-vite-plugin'
import Vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Inspector from 'vite-plugin-vue-inspector'

export default defineConfig({
  resolve: {
    alias: {
      '@': '/resources/scripts',
    },
  },

  plugins: [
    Laravel({
      input: ['resources/scripts/main.ts'],
      valetTls: true,
      refresh: true,
    }),

    Vue({
      reactivityTransform: true,
    }),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: [
        'vue',
        'vue/macros',
        // custom
        {
          '@inertiajs/vue3': [
            'createInertiaApp',
            'useForm',
            'useRemember',
            'usePage',
            'router',
          ],
        },
      ],
      dts: 'resources/scripts/types/auto-imports.d.ts',
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
            return { name: componentName, from: '@inertiajs/vue3' }
        },
      ],
      dts: 'resources/scripts/types/components.d.ts',
    }),

    // https://github.com/webfansplz/vite-plugin-vue-inspector
    Inspector({
      toggleButtonVisibility: 'never',
      appendTo: 'main.ts',
    }),
  ],
})
