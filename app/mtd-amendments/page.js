import AnswerPageLayout from '@/components/AnswerPageLayout.js'
import Link from 'next/link'

export const metadata = {
  title: 'MTD Amendments | Can I Correct a Quarterly Update?',
  description: 'How to correct or amend a Making Tax Digital quarterly update after you\'ve submitted it. What the rules are.',
}

export default function MTDAmendments() {
  return (
    <AnswerPageLayout h1="Correcting & Amending MTD Submissions">
      <p className="text-lg text-slate-700">Made a mistake in a quarterly update? Don&apos;t panic — you can correct it.</p>
      <h2>Can I Amend a Quarterly Update?</h2>
      <p>Yes. You can submit a corrected quarterly update at any time before your end-of-year declaration. Your MTD software will let you resubmit an updated figure for any previous quarter.</p>
      <h2>What If I Notice a Mistake After Year End?</h2>
      <p>You can amend your end-of-year declaration within 12 months of the filing deadline. After that, you need to contact HMRC directly to make a correction.</p>
      <h2>Will HMRC Penalise Me for Corrections?</h2>
      <p>Correcting genuine mistakes is not penalised. HMRC distinguishes between errors made in good faith and deliberate inaccuracies. If you spot a mistake and fix it promptly, you&apos;re doing the right thing.</p>
      <h2>Best Practice</h2>
      <ul>
        <li>Review your quarterly totals before submitting — takes 5 minutes</li>
        <li>Keep receipts so you can verify figures if questioned</li>
        <li>If you find a mistake, correct it in the next quarter&apos;s update at the latest</li>
      </ul>
      <div className="mt-12 p-8 bg-blue-50 rounded-lg border-l-4 border-blue-500">
        <Link href="/mtd-penalties"><button className="bg-blue-600 text-white px-6 py-3 rounded font-semibold hover:bg-blue-700">What are the penalties? →</button></Link>
      </div>
    </AnswerPageLayout>
  )
}
