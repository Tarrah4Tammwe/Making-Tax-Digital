import AnswerPageLayout from '@/components/AnswerPageLayout'
import Link from 'next/link'

export const metadata = {
  title: 'Making Tax Digital Deadlines 2026–2027 | Full Timeline',
  description: 'All MTD deadlines for 2026–2027. Quarterly updates, final return dates, and what happens if you miss them.',
}

export default function Deadlines2026() {
  return (
    <AnswerPageLayout h1="Making Tax Digital Deadlines 2026 & Timeline">
      <h2>Mark These in Your Calendar Now</h2>
      <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-500 my-6">
        <ul className="list-none space-y-3">
          <li className="text-lg font-bold">📅 <strong>6 April 2026:</strong> MTD officially starts — you must be registered</li>
          <li className="text-lg font-bold">📅 <strong>7 August 2026:</strong> First quarterly update due (April–June)</li>
          <li className="text-lg font-bold">📅 <strong>7 November 2026:</strong> Second quarterly update due (July–September)</li>
          <li className="text-lg font-bold">📅 <strong>7 February 2027:</strong> Third quarterly update due (October–December)</li>
          <li className="text-lg font-bold">📅 <strong>7 May 2027:</strong> Fourth quarterly update due (January–March)</li>
          <li className="text-lg font-bold">📅 <strong>31 January 2028:</strong> End of year declaration + tax payment due</li>
        </ul>
      </div>
      <h2>What Does &quot;Quarterly Update&quot; Actually Mean?</h2>
      <p>It&apos;s not a full tax return. You&apos;re just telling HMRC a summary of what you earned and spent in those three months. Your software does most of the work. If your records are tidy, it takes about 30 minutes.</p>
      <h2>What Happens If You Miss a Deadline?</h2>
      <p>HMRC uses a points-based system. Each missed deadline earns a penalty point. Once you hit 4 points, you get a £200 fine. After that, each further miss is another £200.</p>
      <p>The good news: one missed deadline won&apos;t immediately hurt you. But don&apos;t make a habit of it.</p>
      <div className="mt-12 p-8 bg-blue-50 rounded-lg border-l-4 border-blue-500">
        <Link href="/what-records">
          <button className="bg-blue-600 text-white px-6 py-3 rounded font-semibold hover:bg-blue-700">What records do I need to keep? →</button>
        </Link>
      </div>
    </AnswerPageLayout>
  )
}
