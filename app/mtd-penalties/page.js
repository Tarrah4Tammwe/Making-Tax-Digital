import AnswerPageLayout from '@/components/AnswerPageLayout'
import Link from 'next/link'

export const metadata = {
  title: 'MTD Penalties & Fines | What Happens If You Miss a Deadline',
  description: 'The MTD penalty points system explained. How fines work, how much they are, and how to avoid them.',
}

export default function MTDPenalties() {
  return (
    <AnswerPageLayout h1="MTD Penalties & Fines Explained">
      <p className="text-lg text-slate-700">HMRC uses a points-based system for MTD penalties. Here&apos;s exactly how it works.</p>
      <h2>The Points System</h2>
      <p>Each time you miss a deadline, you get 1 penalty point. When you reach 4 points, you receive an automatic £200 fine. After that, each further missed deadline is another £200.</p>
      <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-500 my-6">
        <ul className="list-none space-y-2">
          <li>1 missed deadline = 1 point (no fine yet)</li>
          <li>2 missed deadlines = 2 points (no fine yet)</li>
          <li>3 missed deadlines = 3 points (no fine yet)</li>
          <li>4 missed deadlines = 4 points = <strong>£200 fine</strong></li>
          <li>5th missed deadline = <strong>another £200 fine</strong></li>
        </ul>
      </div>
      <h2>How Do Points Expire?</h2>
      <p>Points expire after 24 months of full compliance — meaning you&apos;ve submitted everything on time for 2 years. You also need to have filed all outstanding returns before the clock starts.</p>
      <h2>Late Payment Penalties (Separate)</h2>
      <ul>
        <li><strong>30 days late:</strong> 2% of tax owed</li>
        <li><strong>6 months late:</strong> Additional 2% (total 4%)</li>
        <li><strong>12 months late:</strong> Additional 4% (total 8%)</li>
        <li>Plus interest at Bank of England base rate + 2.5%</li>
      </ul>
      <h2>The Simple Way to Avoid All Penalties</h2>
      <p>File on time, every time. Set calendar reminders for 7 August, 7 November, 7 February, and 7 May. Your software will also remind you.</p>
      <div className="mt-12 p-8 bg-blue-50 rounded-lg border-l-4 border-blue-500">
        <Link href="/deadlines-2026"><button className="bg-blue-600 text-white px-6 py-3 rounded font-semibold hover:bg-blue-700">See all MTD deadlines →</button></Link>
      </div>
    </AnswerPageLayout>
  )
}
