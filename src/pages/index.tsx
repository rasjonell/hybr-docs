import { useState, type ReactNode } from 'react';
import Head from '@docusaurus/Head';
import Layout from '@theme/Layout';

import styles from './index.module.css';

export default function Home(): ReactNode {
  const [isCopied, setIsCopied] = useState(false);
  const command = 'curl -sSL https://hybr.dev/install.sh | bash';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <Layout wrapperClassName={styles.body}>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* Primary Meta Tags */}
        <title>hybr - Open Source Platform for Digital Independence</title>
        <meta
          name="title"
          content="hybr - Open Source Platform for Digital Independence"
        />
        <meta
          name="description"
          content="hybr is an open-source platform that gives you complete control over your digital services. Achieve true digital independence and reduce reliance on third-party providers."
        />
        <meta
          name="keywords"
          content="hybr, digital independence, open source platform, self-hosted services, digital sovereignty, third-party alternatives, self-hosted infrastructure, digital autonomy, open source infrastructure, data privacy, digital self-reliance, personal cloud, private cloud platform, decentralized services, data control, open source hosting, digital freedom, secure hosting, independent hosting, private infrastructure"
        />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://hybr.dev/" />
        <meta
          property="og:title"
          content="hybr - Open Source Platform for Digital Independence"
        />
        <meta
          property="og:description"
          content="Take control of your digital services with hybr - an open-source platform for true digital independence."
        />
        <meta property="og:image" content="https://hybr.dev/og-image.png" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://hybr.dev/" />
        <meta
          property="twitter:title"
          content="hybr - Open Source Platform for Digital Independence"
        />
        <meta
          property="twitter:description"
          content="Take control of your digital services with hybr - an open-source platform for true digital independence."
        />
        <meta property="twitter:image" content="https://hybr.dev/twitter-image.png" />

        {/* Additional SEO Tags */}
        <link rel="canonical" href="https://hybr.dev" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="hybr" />
        <meta name="theme-color" content="#FF3B3B" />

        {/* Schema.org markup for Google */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "hybr",
            description:
              "An open-source platform that gives you complete control over your digital services. Achieve true digital independence and reduce reliance on third-party providers.",
            operatingSystem: "Cross-platform",
            applicationCategory: "DevelopmentTools",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            sourceOrganization: {
              "@type": "Organization",
              name: "hybr",
              url: "https://hybr.dev",
            },
          })}
        </script>

        <title>hybr - Digital Independence</title>
      </Head>

      <div className={styles.backgroundContainer}>
        <img src="/img/bg.png" alt="Background" className={styles.background} />
      </div>
      <div className={styles.content}>
        <pre className={styles.codeStyle}>hybr</pre>
        <p className={styles.description}>
          an open-source platform that puts you in complete control of your digital
          services.
          <br />
          Say goodbye to relying on third-party providers and say hello to true digital
          independence.
        </p>
        <div className={styles.section}>
          <div className={styles.installSection}>
            <pre className={styles.installCommand}>
              {command}
              <svg
                tabIndex={0}
                className={`${styles.copyIcon} ${isCopied ? styles.success : ""}`}
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                onClick={handleCopy}
              >
                {!isCopied ? (
                  <>
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </>
                ) : (
                  <path d="M20 6L9 17l-5-5" />
                )}
              </svg>
            </pre>
            <a
              href="https://github.com/rasjonell/hybr"
              className={styles.ctaButton}
              target="_blank"
              tabIndex={1}
              rel="noopener noreferrer"
            >
              <span className={styles.githubText}>Check Out The Project</span>
              <svg className={styles.githubLogo} viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
          </div>
          <a
            tabIndex={2}
            href='/docs/intro'
            className={styles.button}
            rel="noopener noreferrer"
          >
            <span className={styles.buttonText}>Get Started</span>
          </a>
        </div>
      </div>
    </Layout>
  );
}
