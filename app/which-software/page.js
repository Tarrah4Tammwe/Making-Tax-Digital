import AnswerPageLayout from '../../components/AnswerPageLayout.js'
import Link from 'next/link'

export const metadata = {
  title: 'Best MTD Software 2026 | Xero vs FreeAgent vs QuickBooks',
  description: 'Compare Xero, FreeAgent, QuickBooks, and Wave for MTD. Find the right software for your business in under 5 minutes.',
}

export default function WhichSoftware() {
  return (
    <AnswerPageLayout h1="Which Making Tax Digital Software Should I Use?">
      <p className="text-xl font-semibold text-slate-700">The honest answer: Any HMRC-approved software will work. But some are better than others depending on what you do.</p>
      <h2>FreeAgent</h2>
      <div className="bg-slate-50 p-6 rounded-lg mb-6 border-l-4 border-green-500">
        <p className="font-bold text-lg mb-3">Best for: UK freelancers and sole traders who want the most hand-holding.</p>
        <ul>
          <li><strong>Cost:</strong> From £8.33/month (paid annually) — free with NatWest/RBS</li>
          <li><strong>Pros:</strong> UK tax calendar built in, simple interface, great for beginners</li>
          <li><strong>Cons:</strong> Less powerful if your affairs get complicated</li>
        </ul>
      </div>
      <h2>Xero</h2>
      <div className="bg-slate-50 p-6 rounded-lg mb-6 border-l-4 border-blue-500">
        <p className="font-bold text-lg mb-3">Best for: Freelancers with multiple income streams, landlords, people who like clean interfaces.</p>
        <ul>
          <li><strong>Cost:</strong> From £30/month</li>
          <li><strong>Pros:</strong> Very intuitive, handles multiple business types, great mobile app</li>
          <li><strong>Cons:</strong> More expensive, overkill for simple freelancers</li>
        </ul>
      </div>
      <h2>QuickBooks</h2>
      <div className="bg-slate-50 p-6 rounded-lg mb-6 border-l-4 border-purple-500">
        <p className="font-bold text-lg mb-3">Best for: Freelancers who want powerful features at a mid-range price.</p>
        <ul>
          <li><strong>Cost:</strong> From £22/month</li>
          <li><strong>Pros:</strong> Powerful, good mobile app, mileage tracking built in</li>
          <li><strong>Cons:</strong> Interface takes getting used to</li>
        </ul>
      </div>
      <h2>Wave</h2>
      <div className="bg-slate-50 p-6 rounded-lg mb-6 border-l-4 border-amber-500">
        <p className="font-bold text-lg mb-3">Best for: Absolute beginners who want to spend nothing upfront.</p>
        <ul>
          <li><strong>Cost:</strong> Free</li>
          <li><strong>Pros:</strong> Genuinely free accounting software, good invoicing</li>
          <li><strong>Cons:</strong> Fewer features, less UK-specific support</li>
        </ul>
      </div>
      <div className="mt-12 p-8 bg-blue-50 rounded-lg border-l-4 border-blue-500">
        <Link href="/how-much-cost">
          <button className="bg-blue-600 text-white px-6 py-3 rounded font-semibold hover:bg-blue-700">How much will MTD cost me? →</button>
        </Link>
      </div>
    </AnswerPageLayout>
  )
}
