import AnswerPageLayout from '../../components/AnswerPageLayout.js'
import Link from 'next/link'

export const metadata = {
  title: 'What Records Do I Need for Making Tax Digital?',
  description: 'Exactly what records you need to keep for MTD. Income records, expense records, and how long to keep them.',
}

export default function WhatRecords() {
  return (
    <AnswerPageLayout h1="What Records Do I Need to Keep for MTD?">
      <p className="text-xl font-semibold text-slate-700">The short version: the same records you should already be keeping — just stored digitally in approved software.</p>
      <h2>Income Records</h2>
      <ul>
        <li><strong>Invoices you sent:</strong> Date, amount, client name, what it was for</li>
        <li><strong>Payment receipts:</strong> PayPal/Stripe receipts, bank confirmations</li>
        <li><strong>Bank statements:</strong> Showing deposits matching your invoices</li>
      </ul>
      <h2>Expense Records</h2>
      <ul>
        <li><strong>Receipts:</strong> Till receipts, supplier invoices, or bank transactions</li>
        <li><strong>Mileage log:</strong> If you claim car expenses — date, miles, purpose</li>
        <li><strong>Utility bills:</strong> If you claim home office costs</li>
        <li><strong>Professional fees:</strong> Accountant invoices, membership fees, training</li>
      </ul>
      <h2>How Long Do You Keep Them?</h2>
      <p>HMRC can ask for records up to 6 years after the year they relate to. Keep everything for at least 6 years to be safe.</p>
      <h2>Best Way to Organise Digitally</h2>
      <ul>
        <li>Use your MTD software to photograph receipts on your phone immediately</li>
        <li>Set up a business bank account so personal and business money don&apos;t mix</li>
        <li>Connect your bank feed to your software — it imports transactions automatically</li>
      </ul>
      <div className="mt-12 p-8 bg-blue-50 rounded-lg border-l-4 border-blue-500">
        <Link href="/premium-checklist">
          <button className="bg-blue-600 text-white px-6 py-3 rounded font-semibold hover:bg-blue-700">Get your month-by-month action plan →</button>
        </Link>
      </div>
    </AnswerPageLayout>
  )
}
