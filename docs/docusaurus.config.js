/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Airbnb Application',
  tagline: 'Airbnb data analysis application',
  url: 'https://aaron5670.github.io/Airbnb-data-analysis-application/',
  baseUrl: '/Airbnb-data-analysis-application/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'aaron5670', // Usually your GitHub org/user name.
  projectName: 'Airbnb-data-analysis-application', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'Airbnb application',
      logo: {
        alt: 'Airbnb application',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'doc',
          docId: 'inleiding',
          position: 'left',
          label: 'Documentatie',
        },
        {
          href: 'https://github.com/aaron5670/Airbnb-data-analysis-application',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'Airbnb-data-analysis-application/edit/master/docs/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
