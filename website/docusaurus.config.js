const deployInfo = require('../scripts/getDeployInfo.js')();

console.log(`Deploying editBranch "${deployInfo.branch}" and deployPath "${deployInfo.deployPath}" deployName "${deployInfo.deployName}"`);

let baseUrl = '/typegoose/' + deployInfo.deployPath;

if (!baseUrl.endsWith('/')) {
  baseUrl += '/';
}

module.exports = {
  title: 'typegoose',
  tagline: 'Define Mongoose models using TypeScript classes',
  url: 'https://typegoose.github.io',
  baseUrl: baseUrl,
  favicon: 'img/favicon.ico',
  organizationName: 'typegoose',
  projectName: 'typegoose',
  themeConfig: {
    algolia: {
      apiKey: '27478265b7cee23844ccb8cf79943e2c',
      appId: 'E5557YWQXF',
      indexName: 'typegoose',
      contextualSearch: false, // since docusaurus v2.beta-15, it is defaulted to "true", but somehow breaks current search
      searchParameters: {
        facetFilters: [`version:${deployInfo.searchName}`],
      },
    },
    navbar: {
      title: 'typegoose',
      // logo: {
      //   alt: 'Logo',
      //   src: 'img/logo.svg',
      // },
      items: [
        {
          type: 'custom-beta-notice',
          position: 'left',
        },
        {
          // cannot use "docsVersionDropdown" because we are not using docusaurus' versioning system
          type: 'custom-versions-selector',
          position: 'right',
          label: deployInfo.deployName,
        },
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
          href: 'https://github.com/typegoose/typegoose/blob/master/CHANGELOG.md',
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
              label: 'Github Discussions',
              href: 'https://github.com/typegoose/typegoose/discussions',
            },
            {
              label: 'Discord',
              href: 'https://discord.gg/BpGjTTD',
            },
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
          editUrl: `https://github.com/typegoose/typegoose/edit/${deployInfo.branch}/docs`,
          remarkPlugins: [[require('@docusaurus/remark-plugin-npm2yarn'), { sync: true }]],
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
  customFields: {
    deployInfo: deployInfo,
  },
};
