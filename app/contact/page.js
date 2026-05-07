import AnswerPageLayout from '../components/AnswerPageLayout.js'

export const metadata = {
  title: 'Contact | Making Tax Digital Explained',
  description: 'Get in touch with Making Tax Digital Explained. Questions, feedback, or premium purchase issues.',
}

export default function Contact() {
  return (
    <AnswerPageLayout h1="Contact">
      <p className="text-xl text-slate-700">Questions, feedback, or an issue with your premium purchase? Get in touch.</p>

      <h2>Email</h2>
      <p>
        <a href="mailto:hello@makingtaxdigitalexplained.com" className="text-blue-600 font-semibold text-lg">
          hello@makingtaxdigitalexplained.com
        </a>
      </p>
      <p>We aim to reply within 1 business day.</p>

      <h2>Premium purchase issues</h2>
      <p>If you paid but can't access your checklist, email us with the subject line "Premium Access" and we'll restore it for you immediately. You don't need to provide a receipt — we can look it up on our end.</p>

      <h2>Content corrections</h2>
      <p>MTD rules change. If you spot something outdated or incorrect on the site, please let us know — we'll update it.</p>

      <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded mt-8">
        <p className="font-semibold text-slate-800">Note: We are not a tax advice service.</p>
        <p className="text-slate-600 mt-1">We can't answer personal tax questions or tell you what you specifically should do. For personal advice, speak to a qualified accountant.</p>
      </div>
    </AnswerPageLayout>
  )
}
