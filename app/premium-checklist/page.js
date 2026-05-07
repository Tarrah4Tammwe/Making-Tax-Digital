'use client'
import AnswerPageLayout from '@/components/AnswerPageLayout.js'
import { useState } from 'react'

export default function PremiumChecklist() {
  const [loading, setLoading] = useState(false)

  const handleCheckout = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/create-checkout', { method: 'POST' })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        alert('Something went wrong. Please try again.')
      }
    } catch {
      alert('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnswerPageLayout h1="MTD Annual Toolkit">
      <p className="text-xl font-semibold text-slate-700">£4.99 one-off payment. Instant Excel download. Works in Excel, Google Sheets, Numbers.</p>
      
      <h2>What's Inside</h2>
      <div className="bg-amber-50 p-8 rounded-lg border-l-4 border-amber-600 my-6">
        <div className="space-y-4">
          <div>
            <h3 className="font-bold text-lg text-slate-900 mb-2">📊 Quarterly Timeline Dashboard</h3>
            <p className="text-slate-700">Visual countdown to all 4 deadlines (Aug 7, Nov 7, Feb 7, May 7). Click to see what needs doing each week.</p>
          </div>
          <div>
            <h3 className="font-bold text-lg text-slate-900 mb-2">📝 Record-Keeping Templates</h3>
            <p className="text-slate-700">Pre-built expense categories (travel, equipment, home office, software) — exactly what HMRC wants. Start logging now.</p>
          </div>
          <div>
            <h3 className="font-bold text-lg text-slate-900 mb-2">💰 Income & Expense Tracker</h3>
            <p className="text-slate-700">12-month tracker with auto-profit formula. Log once, see your tax liability before the deadline.</p>
          </div>
          <div>
            <h3 className="font-bold text-lg text-slate-900 mb-2">🔧 Software Comparison</h3>
            <p className="text-slate-700">FreeAgent vs Xero vs QuickBooks vs Wave — real costs, features, and which is best for your situation.</p>
          </div>
          <div>
            <h3 className="font-bold text-lg text-slate-900 mb-2">⚠️ Penalty Calculator</h3>
            <p className="text-slate-700">See exactly how much you'll be fined if you miss a deadline. Real numbers to focus your mind.</p>
          </div>
        </div>
      </div>

      <h2>Why Excel? Why Now?</h2>
      <div className="bg-slate-50 p-6 rounded-lg border-l-4 border-blue-500 my-6">
        <ul>
          <li>✅ Works everywhere — Excel, Google Sheets, Numbers, or even print it</li>
          <li>✅ Build it once, use it every quarter for the next year</li>
          <li>✅ No software subscriptions — you own it</li>
          <li>✅ Faster than typing into your MTD software blind</li>
          <li>✅ Proof you've got your records organized if HMRC ever asks</li>
          <li>✅ Reusable templates you can adapt for your business</li>
        </ul>
      </div>

      <h2>Who Is This For?</h2>
      <ul>
        <li><strong>Freelancers hitting £50k+</strong> who just registered or about to register</li>
        <li><strong>Partnerships and directors</strong> facing MTD for the first time</li>
        <li><strong>Anyone who hates faffing with software</strong> — get the data ready first, feed it in later</li>
        <li><strong>People who want a paper trail</strong> — this is it</li>
      </ul>

      <div className="mt-12 p-8 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border-2 border-amber-300">
        <h3 className="text-2xl font-bold mb-2 text-slate-900">MTD Annual Toolkit</h3>
        <p className="text-lg font-semibold text-amber-900 mb-6">£4.99 — Use it forever</p>
        <button
          onClick={handleCheckout}
          disabled={loading}
          className="bg-amber-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-amber-700 disabled:opacity-60 w-full transition transform hover:scale-105"
        >
          {loading ? 'Redirecting to checkout…' : 'Get the Toolkit (£4.99) →'}
        </button>
        <p className="text-sm text-slate-600 mt-4">✓ Secure Stripe payment ✓ Instant download ✓ No email needed ✓ Works forever</p>
      </div>
    </AnswerPageLayout>
  )
}
