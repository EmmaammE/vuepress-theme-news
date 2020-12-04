module.exports = {
  title: 'VuePress Blog',
  description: 'Just play around',
  markdown: {
    // markdown-it-anchor 的选项
    anchor: { permalink: false },
    // markdown-it-toc 的选项
    toc: { includeLevel: [1, 2] },

    extractHeaders: [ 'h1', 'h2', 'h3' ]
  },

  plugins: ['@vuepress/active-header-links', {
    sidebarLinkSelector: '.sidebar-link',
    headerAnchorSelector: '.header-anchor'
  }]
}