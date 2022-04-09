import { defineConfig } from 'vite'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import Laravel from 'vite-plugin-laravel'
import Vue from '@vitejs/plugin-vue'
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
  ],
})
