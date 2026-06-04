import AnswerPageLayout from '@/components/AnswerPageLayout.js'

export const metadata = {
  title: 'Contact | Making Tax Digital Explained',
  description: 'Get in touch with Making Tax Digital Explained. Questions, feedback, or issues with your premium purchase.',
  alternates: {
    canonical: 'https://makingtaxdigitalexplained.com/contact',
  },
}

export default function Contact() {
  return (
    <AnswerPageLayout h1="Contact Us">
      <p className="text-xl text-slate-700">Have a question about Making Tax Digital, spotted an error on the site, or had an issue with your premium purchase? We want to hear from you.</p>

      <h2>Email Us</h2>
      <p>
        <a href="mailto:hello@makingtaxdigitalexplained.com" className="text-blue-600 font-semibold text-lg">
          hello@makingtaxdigitalexplained.com
        </a>
      </p>
      <p>We aim to reply within 1 business day, Monday to Friday.</p>

      <h2>Premium Purchase Issues</h2>
      <p>If you paid for the MTD Compliance Checklist but cannot access your download, email us with the subject line <strong>"Premium Access"</strong>. We can look up your purchase on our end — you do not need to provide a receipt or screenshot. We will restore access immediately.</p>
      <p>Issues are rare but they do happen. Please do not worry — no one has ever been left without their purchase.</p>

      <h2>Content Questions and Corrections</h2>
      <p>MTD rules are updated regularly by HMRC. If you spot something on the site that looks outdated or incorrect, please let us know with the page URL and what you believe has changed. We review and update the site regularly but reader corrections are always welcome.</p>
      <p>We also welcome general questions about how Making Tax Digital works. We cannot give personal tax advice (see below), but if you are confused about something on the site or want something explained more clearly, we are happy to help.</p>

      <h2>Feedback and Suggestions</h2>
      <p>If there is a topic you wish we covered, or a question you could not find an answer to, tell us. This site exists to make MTD understandable to ordinary people — your feedback directly shapes what we write next.</p>

      <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded mt-8">
        <p className="font-semibold text-slate-800">We are not a tax advice service.</p>
        <p className="text-slate-600 mt-2">We cannot answer personal tax questions, calculate what you owe, or tell you what to do in your specific situation. For personal advice, speak to a qualified accountant or tax adviser. You can find one via the <a href="https://www.icaew.com/about-icaew/find-a-chartered-accountant" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">ICAEW directory</a> or <a href="https://www.tax.org.uk/public/find-tax-adviser" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">CIOT adviser search</a>.</p>
      </div>

      <h2>Response Times</h2>
      <p>We are a small independent site. Emails are checked daily on weekdays. If you have not heard back within 2 business days, please send a follow-up — occasionally emails end up in spam.</p>
    </AnswerPageLayout>
  )
}
