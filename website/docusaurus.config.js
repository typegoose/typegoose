module.exports = {
  title: 'typegoose',
  tagline: 'Define Mongoose models using TypeScript classes',
  url: 'https://typegoose.github.io',
  baseUrl: '/typegoose/',
  favicon: 'img/favicon.ico',
  organizationName: 'typegoose',
  projectName: 'typegoose',
  themeConfig: {
    algolia: {
      apiKey: '2c49a41064ba9b534e8417089c6cde93',
      indexName: 'typegoose',
      algoliaOptions: {},
    },
    navbar: {
      title: 'typegoose',
      // logo: {
      //   alt: 'Logo',
      //   src: 'img/logo.svg',
      // },
      items: [
        {
          to: 'docs/guides/quick-start-guide',
          activeBasePath: 'guides',
          label: 'Guides',
          position: 'right',
        },
        {
          to: 'docs/api/index-api',
          activeBasePath: 'api',
          label: 'API',
          position: 'right',
        },
        {
          to: 'docs/changelog',
          // activeBasePath: 'api',
          label: 'Changelog',
          position: 'right',
        },
        {
          href: 'https://github.com/typegoose/typegoose',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/typegoose',
            },
            {
              label: 'Discord',
              href: 'https://discord.gg/BpGjTTD',
            }
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/typegoose/typegoose',
            },
          ],
        },
      ],
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          path: '../docs',
          routeBasePath: 'docs',
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/typegoose/typegoose/edit/master/docs',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
