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
    <AnswerPageLayout h1="MTD Preparation Checklist">
      <p className="text-xl font-semibold text-slate-700">£4.99 one-off payment. Instant PDF download. No account needed.</p>
      <h2>What&apos;s Inside</h2>
      <div className="bg-slate-50 p-6 rounded-lg border-l-4 border-blue-500 my-6">
        <ul>
          <li>✅ Month-by-month action plan (now through April 2026)</li>
          <li>✅ Every quarterly deadline for 2026/27</li>
          <li>✅ Software comparison with honest costs</li>
          <li>✅ All HMRC-accepted expense categories</li>
          <li>✅ Common mistakes to avoid</li>
          <li>✅ Printable records checklist</li>
          <li>✅ Deadline reference card — print and stick on your wall</li>
        </ul>
      </div>
      <h2>Why Buy This?</h2>
      <ul>
        <li>Saves you hours of research</li>
        <li>Clear action plan — no guessing what to do next</li>
        <li>Removes the panic about missing something important</li>
        <li>Cheaper than one hour of accountant time</li>
        <li>One-off payment — not a subscription</li>
      </ul>
      <div className="mt-12 p-8 bg-amber-50 rounded-lg border-2 border-amber-300">
        <h3 className="text-2xl font-bold mb-4 text-slate-900">Get It Now (£4.99)</h3>
        <p className="text-slate-700 mb-6">One-off payment. Instant download. Never expires. No email required.</p>
        <button
          onClick={handleCheckout}
          disabled={loading}
          className="bg-amber-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-amber-700 disabled:opacity-60 w-full"
        >
          {loading ? 'Redirecting to checkout…' : 'Get the Checklist (£4.99) →'}
        </button>
        <p className="text-sm text-slate-600 mt-4">Secure payment via Stripe. We never see your card details.</p>
      </div>
    </AnswerPageLayout>
  )
}
