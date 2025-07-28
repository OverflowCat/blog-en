import type { Options } from 'rehype-autolink-headings'
import { rehypeHeadingIds } from '@astrojs/markdown-remark'
import mdx from '@astrojs/mdx'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import swup from '@swup/astro'
import { typst } from 'astro-typst'
import { defineConfig } from 'astro/config'
// @ts-expect-error: no types
import remarkFigureCaption from 'gridsome-remark-figure-caption'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
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
      /**
       * You can customize these heading IDs by adding a rehype plugin that
       * injects id attributes (e.g. rehype-slug). Your custom IDs, instead
       * of Astro’s defaults, will be reflected in the HTML output and the
       * items returned by getHeadings().
       *
       * By default, Astro injects idattributes after your rehype plugins
       * have run. If one of your custom rehype plugins needs to access the
       * IDs injected by Astro, you can import and use Astro’s
       * `rehypeHeadingIds` plugin directly. Be sure to add `rehypeHeadingIds`
       * before any plugins that rely on it:
       */
      rehypeHeadingIds,
      [
        rehypeAutolinkHeadings,
        {
          content: [
            {
              type: 'element',
              tagName: 'span',
              properties: { className: ['anchor'] },
              children: [{ type: 'text', value: '#' }],
            },
          ],
          behavior: 'append',
        } satisfies Options,
      ],
    ],
    shikiConfig: {
      theme: 'dracula',
      wrap: true,
    },
  },
  integrations: [UnoCSS({ injectReset: true }), mdx({}), // robotsTxt(),
    sitemap(), swup({
      theme: false,
      animationClass: 'transition-swup-',
      cache: true,
      preload: true,
      accessibility: true,
      smoothScrolling: true,
      updateHead: true,
      updateBodyClass: true,
    }), typst({
      options: {
        remPx: 14,
      },
      target: (id: string) => {
        console.debug(`Detecting ${id}`)
        if (id.endsWith('.html.typ') || id.includes('/html/') || id.includes('/documents/'))
          return 'html'
        return 'svg'
      },
    // emitSvg: true,
    // emitSvgDir: ".astro/typst"
    // fontArgs: [
    //   { fontPaths: ['/system/fonts', '/user/fonts'] },
    //   { fontBlobs: [customFontBuffer] }
    // ],
    }), react()],
})
