import AnswerPageLayout from '@/components/AnswerPageLayout'
import Link from 'next/link'

export const metadata = {
  title: 'What is Making Tax Digital? | Plain English Guide',
  description: 'Making Tax Digital explained in plain English. What it is, why HMRC is doing it, and what you actually have to do.',
}

export default function WhatIsMTD() {
  return (
    <AnswerPageLayout h1="What is Making Tax Digital?">
      <p className="text-xl font-semibold text-slate-700">In short: Making Tax Digital (MTD) is a new HMRC system that makes you file your tax records digitally instead of on paper. It starts 6 April 2026.</p>
      <h2>The Actual Change</h2>
      <p>Right now, you might do your tax return once a year on paper or in a spreadsheet. With MTD, HMRC wants you to:</p>
      <ul>
        <li>Keep your records in digital format (spreadsheet, accounting software, whatever)</li>
        <li>Send updates to HMRC four times a year instead of once</li>
        <li>Use MTD-approved software to do it</li>
      </ul>
      <h2>Why Is HMRC Doing This?</h2>
      <ol>
        <li>Catch tax errors earlier</li>
        <li>Make sure people pay the right tax</li>
        <li>Stop people &quot;forgetting&quot; to declare income</li>
      </ol>
      <h2>Who Has to Do This?</h2>
      <p>If you&apos;re a UK sole trader or landlord earning more than £50,000 a year (gross), you have to use MTD from April 2026.</p>
      <div className="mt-12 p-8 bg-blue-50 rounded-lg border-l-4 border-blue-500">
        <Link href="/do-i-comply">
          <button className="bg-blue-600 text-white px-6 py-3 rounded font-semibold hover:bg-blue-700">Check if you have to comply →</button>
        </Link>
      </div>
    </AnswerPageLayout>
  )
}
