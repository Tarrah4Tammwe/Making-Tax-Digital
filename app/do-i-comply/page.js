import AnswerPageLayout from '../components/AnswerPageLayout.js'
import Link from 'next/link'

export const metadata = {
  title: 'Do I Have to Comply with Making Tax Digital?',
  description: 'Check if you legally have to use Making Tax Digital. Simple yes/no answer based on your income and business type.',
}

export default function DoIComply() {
  return (
    <AnswerPageLayout h1="Do I Have to Comply with Making Tax Digital?">
      <p className="text-xl font-semibold text-slate-700">The simple answer: Check your income.</p>
      <div className="bg-green-50 border-l-4 border-green-500 p-6 my-6 rounded">
        <p className="text-lg font-bold text-slate-900">If you&apos;re a UK sole trader or landlord earning <strong>£50,000 or more</strong> (gross), you legally have to use Making Tax Digital from 6 April 2026.</p>
      </div>
      <h2>How to Count Your Income</h2>
      <ul>
        <li>Income from your main self-employed work</li>
        <li>Income from side gigs</li>
        <li>Rental income (if you&apos;re a landlord)</li>
        <li>Income from selling goods online as a business</li>
      </ul>
      <h2>What If You&apos;re Below £50k?</h2>
      <p>You don&apos;t have to do MTD yet. But the government is lowering the threshold — those earning over £30,000 must join by April 2027, and over £20,000 by April 2028.</p>
      <h2>What If You Don&apos;t Comply?</h2>
      <p>If you should be using MTD and you don&apos;t, HMRC will issue penalty points leading to fines. The points-based system means one missed deadline won&apos;t immediately cost you — but they stack up.</p>
      <div className="mt-12 p-8 bg-blue-50 rounded-lg border-l-4 border-blue-500">
        <Link href="/which-software">
          <button className="bg-blue-600 text-white px-6 py-3 rounded font-semibold hover:bg-blue-700">Which software should I use? →</button>
        </Link>
      </div>
    </AnswerPageLayout>
  )
}
