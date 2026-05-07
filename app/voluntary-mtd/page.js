import AnswerPageLayout from '../../components/AnswerPageLayout.js'
import Link from 'next/link'

export const metadata = {
  title: 'Voluntary MTD | Can I Join Making Tax Digital Early?',
  description: 'Can you voluntarily sign up for Making Tax Digital before it\'s mandatory? The benefits and how to do it.',
}

export default function VoluntaryMTD() {
  return (
    <AnswerPageLayout h1="Voluntary MTD — Joining Before It&apos;s Mandatory">
      <p className="text-lg text-slate-700">Yes, you can sign up for MTD even if your income is below the threshold. Here&apos;s why some people choose to.</p>
      <h2>Why Join Early?</h2>
      <ul>
        <li><strong>Get ahead of it:</strong> Better to learn the system now than scramble when it becomes mandatory</li>
        <li><strong>Better records:</strong> Digital record-keeping often leads to finding more legitimate expenses</li>
        <li><strong>Fewer January surprises:</strong> Quarterly updates mean you know roughly what you owe throughout the year</li>
        <li><strong>Software is useful anyway:</strong> Most MTD software is good accounting software regardless of MTD</li>
      </ul>
      <h2>Who Should Consider Joining Early?</h2>
      <ul>
        <li>Anyone whose income is growing toward £50,000 — get ready now</li>
        <li>Anyone who finds the January tax return stressful</li>
        <li>Anyone who wants to get on top of their business finances</li>
      </ul>
      <h2>How to Join Voluntarily</h2>
      <p>Sign up at gov.uk/sign-up-for-making-tax-digital-for-income-tax — the same process as mandatory sign-up. Choose your software first, then connect it to HMRC.</p>
      <div className="mt-12 p-8 bg-blue-50 rounded-lg border-l-4 border-blue-500">
        <Link href="/which-software"><button className="bg-blue-600 text-white px-6 py-3 rounded font-semibold hover:bg-blue-700">Which software should I use? →</button></Link>
      </div>
    </AnswerPageLayout>
  )
}
