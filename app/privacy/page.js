import AnswerPageLayout from '../../components/AnswerPageLayout.js'

export const metadata = {
  title: 'Privacy Policy | Making Tax Digital Explained',
  description: 'Privacy policy for Making Tax Digital Explained. We store no personal data. Payments handled by Stripe.',
}

export default function Privacy() {
  return (
    <AnswerPageLayout h1="Privacy Policy">
      <p className="text-slate-500 text-sm">Last updated: May 2026</p>

      <h2>What we collect</h2>
      <p>We collect as little as possible. Here is exactly what happens on this site:</p>
      <ul>
        <li><strong>Calculator inputs</strong> — entered in your browser only. Never sent to our servers. Never stored anywhere.</li>
        <li><strong>Payment data</strong> — handled entirely by Stripe. We never see your card number, name, or email address. We only receive confirmation that a payment was successful.</li>
        <li><strong>Analytics</strong> — we use Google Analytics to understand page views and general traffic. No personal data is stored.</li>
        <li><strong>Advertising</strong> — we use Google AdSense which may set cookies for ad personalisation. You can opt out via Google's Ad Settings.</li>
      </ul>

      <h2>What we do NOT collect</h2>
      <ul>
        <li>Your name</li>
        <li>Your email address</li>
        <li>Your income or financial details</li>
        <li>Anything you type into the calculator</li>
        <li>Any form submissions (we have no forms except payment)</li>
      </ul>

      <h2>Premium purchase</h2>
      <p>When you buy the MTD Preparation Checklist (£4.99), payment is processed by Stripe. We receive only a confirmation that payment was successful — nothing else. No name, no email, no card details ever touch our servers.</p>
      <p>Your premium access is stored in your browser's local storage only. It never leaves your device.</p>

      <h2>Cookies</h2>
      <p>We use cookies from Google Analytics and Google AdSense. These are standard industry cookies used to measure traffic and serve relevant ads. You can disable cookies in your browser settings.</p>

      <h2>Third party links</h2>
      <p>This site links to HMRC (gov.uk), software providers, and other third parties. We are not responsible for their privacy practices.</p>

      <h2>Your rights</h2>
      <p>Under UK GDPR, you have the right to access, correct, or delete any personal data we hold. Since we hold no personal data, there is nothing to access or delete. If you have questions, contact us.</p>

      <h2>Contact</h2>
      <p>
        Email:{' '}
        <a href="mailto:hello@makingtaxdigitalexplained.com">
          hello@makingtaxdigitalexplained.com
        </a>
      </p>
    </AnswerPageLayout>
  )
}
