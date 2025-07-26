import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: true,
  unocss: true,
  astro: true,
  ignores: [
    '**/*.md',
    '**/*.mdx',
    '**/*.typ',
  ],
})
