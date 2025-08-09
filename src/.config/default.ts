import type { ThemeConfig } from '~/types'

// This is the default configuration for the template, please do not modify it directly.
// You can override this configuration in the `.config/user.ts` file.

export const defaultConfig: ThemeConfig = {
  site: {
    title: 'ᡥᠠᡳᡤᡳᠶᠠ ᡥᠠᠯᠠ·ᠨᡝᡴᠣᡳ ᠵᠠᠯᠠᠨ',
    subtitle: 'OverflowCat\'s Blog',
    author: 'OverflowCat',
    description: 'So fancy is the world, who knows, maybe they sing',
    website: 'https://blog.overflow.cat/',
    pageSize: 5,
    socialLinks: [
      {
        name: 'github',
        href: 'https://about.overflow.cat/',
      },
      {
        name: 'rss',
        href: '/atom.xml',
      },
      {
        name: 'twitter',
        href: 'https://x.com/lazy_static',
      },
      {
        name: 'mastodon',
        href: 'https://mastodon.social/@overflowcat',
      },
      {
        name: 'ideogram-cjk-variant',
        href: 'https://blog.xinshijiededa.men/',
      },
    ],
    navLinks: [
      {
        name: 'Posts',
        href: '/',
      },
      {
        name: 'Archive',
        href: '/archive',
      },
      {
        name: 'Categories',
        href: '/categories',
      },
      {
        name: 'About',
        href: '/about',
      },
    ],
    categoryMap: [
      // { name: '胡适', path: 'hu-shi' }
    ],
    footer: [
      '© %year <a target="_blank" href="%website">%author</a> CC-BY-SA 4.0',
      'Chinese blog: <a target="_blank" href="https://blog.xinshijiededa.men/">新世界的大门</a>',
      'Theme <a target="_blank" href="https://github.com/Moeyua/astro-theme-typography">Typography</a> by <a target="_blank" href="https://moeyua.com">Moeyua</a>',
      'Proudly published with <a target="_blank" href="https://astro.build/">Astro</a>',
    ],
  },
  appearance: {
    theme: 'system',
    locale: 'en-us',
    colorsLight: {
      primary: '#2e405b',
      background: '#ffffff',
    },
    colorsDark: {
      primary: '#FFFFFF',
      background: '#232222',
    },
    fonts: {
      header:
        '"Noto Sans Mongolian", "Mongolian Baiti", "HiraMinProN-W6","Source Han Serif CN","Source Han Serif SC","Source Han Serif TC",serif',
      ui: '"HarmonyOS Sans","Inria Sans","Source Sans Pro","Roboto","Helvetica","Helvetica Neue","Source Han Sans SC","Source Han Sans TC","PingFang SC","PingFang HK","PingFang TC",sans-serif',
    },
  },
  seo: {
    twitter: '@lazy_static',
    meta: [],
    link: [],
  },
  rss: {
    fullText: true,
  },
  comment: {
    // disqus: { shortname: "typography-astro" },
  },
  analytics: {
    googleAnalyticsId: 'G-C0G0C19ZT7',
    umamiAnalyticsId: 'c21cb366-bd01-46dd-ba04-68a349be01fb',
  },
  latex: {
    katex: false,
  },
}
