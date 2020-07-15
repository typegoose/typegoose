module.exports = {
  title: 'typegoose',
  tagline: 'Define Mongoose models using TypeScript classes',
  url: 'https://typegoose.github.io',
  baseUrl: '/typegoose/',
  favicon: 'img/favicon.ico',
  organizationName: 'typegoose',
  projectName: 'typegoose',
  // algolia: {
  //   apiKey: 'api-key',
  //   indexName: 'index-name',
  //   appId: 'app-id', // Optional, if you run the DocSearch crawler on your own
  //   algoliaOptions: {}, // Optional, if provided by Algolia
  // },
  themeConfig: {
    navbar: {
      title: 'typegoose',
      // logo: {
      //   alt: 'Logo',
      //   src: 'img/logo.svg',
      // },
      links: [
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
