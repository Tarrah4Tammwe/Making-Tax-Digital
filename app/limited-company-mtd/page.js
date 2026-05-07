import AnswerPageLayout from '../../components/AnswerPageLayout.js'
import Link from 'next/link'

export const metadata = {
  title: 'Limited Companies & Making Tax Digital | Do Ltd Companies Need MTD?',
  description: 'Does Making Tax Digital apply to limited companies? The current rules and what may change in future.',
}

export default function LimitedCompanyMTD() {
  return (
    <AnswerPageLayout h1="Limited Companies & Making Tax Digital">
      <p className="text-lg text-slate-700">The short answer: limited companies are <strong>not</strong> currently included in Making Tax Digital for Income Tax.</p>
      <h2>Why Are Limited Companies Excluded?</h2>
      <p>MTD for Income Tax covers self-employed individuals (sole traders) and landlords. Limited companies pay Corporation Tax, not Income Tax — so they fall under different rules.</p>
      <h2>Will This Change?</h2>
      <p>HMRC has indicated that MTD for Corporation Tax is being considered for future years, but no mandatory date has been set. For now, limited companies continue to file annual corporation tax returns as usual.</p>
      <h2>What If I&apos;m a Director With Personal Income?</h2>
      <p>If you personally earn self-employment income or rental income above the threshold (separate from your company), you would need to register for MTD in your personal capacity. See our directors guide for details.</p>
      <div className="mt-12 p-8 bg-blue-50 rounded-lg border-l-4 border-blue-500">
        <Link href="/director-mtd"><button className="bg-blue-600 text-white px-6 py-3 rounded font-semibold hover:bg-blue-700">Directors & MTD →</button></Link>
      </div>
    </AnswerPageLayout>
  )
}
