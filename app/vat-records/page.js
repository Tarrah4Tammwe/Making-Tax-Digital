import AnswerPageLayout from '@/components/AnswerPageLayout.js'
import Link from 'next/link'

export const metadata = {
  title: 'VAT Records for Making Tax Digital | Complete Guide',
  description: 'What VAT records you need for MTD. Invoice requirements, VAT return data, and how MTD links to your VAT obligations.',
}

export default function VATRecords() {
  return (
    <AnswerPageLayout h1="VAT Records for Making Tax Digital">
      <p className="text-lg text-slate-700">If you&apos;re VAT registered, your MTD quarterly updates include VAT data automatically. Here&apos;s what you need to track.</p>
      <h2>What&apos;s Different With VAT & MTD?</h2>
      <p>VAT registration doesn&apos;t change whether you need MTD — that&apos;s based on your income threshold. But if you&apos;re VAT registered, your accounting software handles both MTD income tax filings and VAT returns together.</p>
      <h2>VAT Invoices You Must Keep</h2>
      <ul>
        <li>Every invoice you issue must show VAT separately</li>
        <li>Must include your VAT registration number</li>
        <li>Must include the customer&apos;s VAT number (if they&apos;re registered)</li>
        <li>Keep supplier VAT invoices — these prove the VAT you can reclaim</li>
      </ul>
      <h2>How MTD Handles VAT</h2>
      <p>Your accounting software calculates and tracks VAT automatically. Each quarter it files both your income update and your VAT return to HMRC in one step.</p>
      <div className="mt-12 p-8 bg-blue-50 rounded-lg border-l-4 border-blue-500">
        <Link href="/what-records"><button className="bg-blue-600 text-white px-6 py-3 rounded font-semibold hover:bg-blue-700">Back to records overview →</button></Link>
      </div>
    </AnswerPageLayout>
  )
}
