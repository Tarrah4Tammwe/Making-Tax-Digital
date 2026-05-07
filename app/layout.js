import './globals.css'
import Header from '../../components/Header.js'
import Footer from '../../components/Footer.js'

export const metadata = {
  title: {
    default: 'Making Tax Digital Explained | Plain English Guide for UK Freelancers',
    template: '%s | Making Tax Digital Explained',
  },
  description: 'Making Tax Digital from April 2026. Plain English. No jargon. No panic. For UK freelancers and sole traders facing MTD compliance.',
  metadataBase: new URL('https://makingtaxdigitalexplained.com'),
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://makingtaxdigitalexplained.com',
    siteName: 'Making Tax Digital Explained',
    title: 'Making Tax Digital Explained | Plain English for UK Freelancers',
    description: 'MTD from April 2026. Plain English. No jargon. No panic. 780,000 freelancers affected — find out what you need to do.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Making Tax Digital Explained',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Making Tax Digital Explained',
    description: 'Plain English MTD guides for UK freelancers. Free.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://makingtaxdigitalexplained.com',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': 'https://makingtaxdigitalexplained.com/#website',
      url: 'https://makingtaxdigitalexplained.com',
      name: 'Making Tax Digital Explained',
      description: 'Plain English MTD guides for UK freelancers and sole traders',
      inLanguage: 'en-GB',
    },
    {
      '@type': 'Organization',
      '@id': 'https://makingtaxdigitalexplained.com/#organization',
      name: 'Making Tax Digital Explained',
      url: 'https://makingtaxdigitalexplained.com',
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is Making Tax Digital?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Making Tax Digital (MTD) is a UK government initiative requiring self-employed people and landlords earning over £50,000 to keep digital records and submit quarterly updates to HMRC instead of one annual tax return.',
          },
        },
        {
          '@type': 'Question',
          name: 'Do I need to sign up for Making Tax Digital?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'If you are self-employed or a landlord with gross income over £50,000 you must sign up for MTD for Income Tax from April 2026. Those earning over £30,000 must join by April 2027.',
          },
        },
        {
          '@type': 'Question',
          name: 'What software do I need for Making Tax Digital?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'You need HMRC-approved MTD software such as FreeAgent, QuickBooks, Xero, or Wave. Spreadsheets can also be used with bridging software.',
          },
        },
        {
          '@type': 'Question',
          name: 'What are the MTD deadlines?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The first quarterly update for MTD starters in April 2026 is due by 7 August 2026. Subsequent deadlines are 7 November, 7 February, and 7 May.',
          },
        },
      ],
    },
  ],
}

export default function RootLayout({ children }) {
  return (
    <html lang="en-GB">
      <head>
        {/* Google AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=pub-8935274984783226"
          crossOrigin="anonymous"
        />
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-slate-50">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
