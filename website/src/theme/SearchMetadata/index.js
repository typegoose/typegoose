import React from 'react';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function SearchMetadata({ locale, tag }) {
  const { siteConfig } = useDocusaurusContext();
  const deployInfo = siteConfig.customFields?.deployInfo ?? {};
  // if "deployPath" is empty, use deployName "current" and tag "current"
  const deployPath = deployInfo?.deployPath ?? '';
  const deployName = deployPath.length === 0 ? 'current' : deployInfo?.deployName ?? 'current';

  tag = tag.replace('current', deployName); // replace "docs-default-current" with something like "docs-default-YourVersion"

  return (
    <Head>
      {/*
        Docusaurus metadata, used by third-party search plugin
        See https://github.com/cmfcmf/docusaurus-search-local/issues/99
        */}
      {locale && <meta name="docusaurus_locale" content={locale} />}
      {<meta name="docusaurus_version" content={deployName} />}
      {tag && <meta name="docusaurus_tag" content={tag} />}

      {/* Algolia DocSearch metadata */}
      {locale && <meta name="docsearch:language" content={locale} />}
      {<meta name="docsearch:version" content={deployName} />}
      {tag && <meta name="docsearch:docusaurus_tag" content={tag} />}
    </Head>
  );
}
