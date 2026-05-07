import AnswerPageLayout from '@/components/AnswerPageLayout'
import Link from 'next/link'

export const metadata = {
  title: 'Directors & Making Tax Digital | Does MTD Apply to Company Directors?',
  description: 'Does Making Tax Digital apply to limited company directors? The answer depends on whether you also have self-employed income.',
}

export default function DirectorMTD() {
  return (
    <AnswerPageLayout h1="Directors & Making Tax Digital">
      <p className="text-lg text-slate-700">If you&apos;re a director of a limited company, whether MTD applies to you depends on your personal income sources.</p>
      <h2>Director&apos;s Salary (PAYE)</h2>
      <p>Your director&apos;s salary goes through PAYE. This is <strong>not</strong> self-employment income and does <strong>not</strong> count toward the MTD threshold.</p>
      <h2>Dividends</h2>
      <p>Dividends from your company are also not self-employment income. They do not count toward the MTD threshold and are not part of MTD filing.</p>
      <h2>When Does MTD Apply to Directors?</h2>
      <p>MTD applies to you personally if you <em>also</em> have self-employment income or rental income outside your company that exceeds the threshold. For example, if you do freelance work personally alongside your company, or if you rent out a property.</p>
      <h2>What About the Limited Company Itself?</h2>
      <p>Limited companies are not currently in scope for MTD for Income Tax. MTD ITSA covers sole traders and landlords only. Your company files corporation tax returns as normal.</p>
      <div className="mt-12 p-8 bg-blue-50 rounded-lg border-l-4 border-blue-500">
        <Link href="/limited-company-mtd"><button className="bg-blue-600 text-white px-6 py-3 rounded font-semibold hover:bg-blue-700">Limited companies & MTD →</button></Link>
      </div>
    </AnswerPageLayout>
  )
}
