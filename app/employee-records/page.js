import AnswerPageLayout from '@/components/AnswerPageLayout.js'
import Link from 'next/link'

export const metadata = {
  title: 'Employees & Making Tax Digital | What You Need to Know',
  description: 'How MTD affects freelancers who also employ people. What records you need for employee payments under MTD.',
}

export default function EmployeeRecords() {
  return (
    <AnswerPageLayout h1="Employees & Making Tax Digital">
      <p className="text-lg text-slate-700">If you pay employees as well as being self-employed, MTD and PAYE are separate systems — but here&apos;s what you need to know.</p>
      <h2>MTD vs PAYE — Two Separate Systems</h2>
      <p>MTD for Income Tax covers your <em>self-employment income</em>. Your employees&apos; pay goes through PAYE (Real Time Information), which is a different HMRC system. You need to manage both.</p>
      <h2>Employee Records You Must Keep</h2>
      <ul>
        <li>Payslips for every employee for every pay period</li>
        <li>RTI submissions to HMRC (your payroll software does this)</li>
        <li>P60s at the end of each tax year</li>
        <li>Evidence of National Insurance and tax deductions</li>
      </ul>
      <h2>Does Paying Employees Affect My MTD Threshold?</h2>
      <p>No. Employee wages are an expense in your self-employment accounts, not income. Your MTD threshold is based on your gross income only.</p>
      <div className="mt-12 p-8 bg-blue-50 rounded-lg border-l-4 border-blue-500">
        <Link href="/what-records"><button className="bg-blue-600 text-white px-6 py-3 rounded font-semibold hover:bg-blue-700">Back to records overview →</button></Link>
      </div>
    </AnswerPageLayout>
  )
}
