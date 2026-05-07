import AnswerPageLayout from '@/components/AnswerPageLayout.js'
import Calculator from '@/components/Calculator.js'
import Link from 'next/link'

export const metadata = {
  title: 'How Much Does Making Tax Digital Cost? [Calculator]',
  description: 'Calculate your total MTD costs including software, time, and support. See actual figures for your situation.',
}

export default function HowMuchCost() {
  return (
    <AnswerPageLayout h1="How Much Will Making Tax Digital Cost?">
      <p className="text-xl font-semibold text-slate-700">The answer depends on three things: software choice, how long it takes you, and whether you need support.</p>
      <h2>Software Costs (Annual)</h2>
      <ul>
        <li><strong>FreeAgent:</strong> ~£100/year (most affordable paid option)</li>
        <li><strong>Wave:</strong> Free to start</li>
        <li><strong>QuickBooks:</strong> ~£264/year</li>
        <li><strong>Xero:</strong> ~£360/year</li>
      </ul>
      <h2>Use the Calculator</h2>
      <Calculator />
      <h2>There May Be a Saving</h2>
      <p>If you use an accountant now, MTD might actually cost you less in the long run — because tidier records mean less accountant time, and quarterly updates mean fewer surprises in January.</p>
      <div className="mt-12 p-8 bg-blue-50 rounded-lg border-l-4 border-blue-500">
        <Link href="/deadlines-2026">
          <button className="bg-blue-600 text-white px-6 py-3 rounded font-semibold hover:bg-blue-700">What are the deadlines? →</button>
        </Link>
      </div>
    </AnswerPageLayout>
  )
}
