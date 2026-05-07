import AnswerPageLayout from '@/components/AnswerPageLayout'
import Link from 'next/link'

export const metadata = {
  title: 'Partnerships & Making Tax Digital | How MTD Affects Business Partners',
  description: 'How Making Tax Digital works for business partnerships. Who files, when, and what counts toward the income threshold.',
}

export default function PartnershipMTD() {
  return (
    <AnswerPageLayout h1="Partnerships & Making Tax Digital">
      <p className="text-lg text-slate-700">If you run a business in partnership with someone else, MTD applies differently to you than to a sole trader. Here&apos;s how.</p>
      <h2>Does the Partnership Threshold or My Share?</h2>
      <p>The MTD threshold is based on your <em>individual</em> total income — your share of the partnership profit, plus any other self-employment or rental income you have personally.</p>
      <h2>Who Files the Quarterly Updates?</h2>
      <p>Each partner files their own MTD quarterly updates individually, based on their share of the partnership income. The partnership itself also files a partnership return — this is separate.</p>
      <h2>What Records Does the Partnership Need?</h2>
      <ul>
        <li>Partnership income and expenses — kept digitally in MTD software</li>
        <li>Each partner&apos;s profit share calculation</li>
        <li>The partnership agreement (HMRC may ask for this)</li>
      </ul>
      <div className="mt-12 p-8 bg-blue-50 rounded-lg border-l-4 border-blue-500">
        <Link href="/do-i-comply"><button className="bg-blue-600 text-white px-6 py-3 rounded font-semibold hover:bg-blue-700">Check if I need to comply →</button></Link>
      </div>
    </AnswerPageLayout>
  )
}
