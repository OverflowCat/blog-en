import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import swup from '@swup/astro'
import { typst } from 'astro-typst'
import { defineConfig } from 'astro/config'
// @ts-expect-error: no types
import remarkFigureCaption from 'gridsome-remark-figure-caption'
import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'
import UnoCSS from 'unocss/astro'
import devtoolsJson from 'vite-plugin-devtools-json'

import { themeConfig } from './src/.config'

// https://astro.build/config
export default defineConfig({
  site: themeConfig.site.website,
  prefetch: true,
  base: '/',
  vite: {
    plugins: [
      // eslint-disable-next-line ts/ban-ts-comment
      // @ts-ignore
      devtoolsJson(),
    ],
    ssr: {
      external: [
        'fsevents',
      ],
    },
  },
  markdown: {
    remarkPlugins: [
      remarkMath,
      remarkFigureCaption,
    ],
    rehypePlugins: [
      rehypeKatex,
    ],
    shikiConfig: {
      theme: 'dracula',
      wrap: true,
    },
  },
  integrations: [
    UnoCSS({ injectReset: true }),
    mdx({}),
    // robotsTxt(),
    sitemap(),
    swup({
      theme: false,
      animationClass: 'transition-swup-',
      cache: true,
      preload: true,
      accessibility: true,
      smoothScrolling: true,
      updateHead: true,
      updateBodyClass: true,
    }),
    typst({
      options: {
        remPx: 14,
      },
      target: (id: string) => {
        console.debug(`Detecting ${id}`)
        if (id.endsWith('.html.typ') || id.includes('/html/'))
          return 'html'
        return 'svg'
      },
      // emitSvg: true,
      // emitSvgDir: ".astro/typst"
      // fontArgs: [
      //   { fontPaths: ['/system/fonts', '/user/fonts'] },
      //   { fontBlobs: [customFontBuffer] }
      // ],
    }),
  ],
})
