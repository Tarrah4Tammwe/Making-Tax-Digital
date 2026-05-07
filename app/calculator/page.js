import AnswerPageLayout from '../../components/AnswerPageLayout.js'
import Calculator from '../../components/Calculator.js'

export const metadata = {
  title: 'MTD Cost Calculator | Calculate Your Making Tax Digital Costs',
  description: 'Interactive calculator to work out your exact annual costs for Making Tax Digital, including software, time, and support.',
}

export default function CalculatorPage() {
  return (
    <AnswerPageLayout h1="MTD Cost Calculator">
      <p className="text-xl font-semibold text-slate-700">Work out your exact annual costs for Making Tax Digital — software, time, and support.</p>
      <Calculator />
      <div className="mt-8 bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
        <h3 className="text-xl font-bold mb-3">What This Means</h3>
        <p>This is your estimated cost per year. For many people, this is actually <strong>less</strong> than what they pay an accountant to do their full annual return.</p>
        <p className="mt-3">All software costs are deductible as a business expense — so the real cost is lower still.</p>
      </div>
    </AnswerPageLayout>
  )
}
