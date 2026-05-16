'use client'

import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Compact Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Making Tax Digital?</h1>
          <p className="text-lg md:text-xl mb-2 opacity-90">We'll Explain It.</p>
          <p className="text-base opacity-80">No jargon. No panic. No surprises.</p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-12">
        {/* Calculator CTA - MOVED TO TOP */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-10 rounded-lg mb-12 text-center shadow-lg">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">How Much Will This Actually Cost You?</h2>
          <p className="text-blue-100 mb-6 text-sm md:text-base">Use our calculator to estimate your MTD costs based on your situation.</p>
          <Link href="/calculator">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold text-base hover:bg-slate-100 transition">
              Use the Calculator →
            </button>
          </Link>
        </div>

        {/* Key Context */}
        <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg mb-12">
          <p className="text-slate-700 text-base">
            <strong>780,000 UK freelancers</strong> are facing MTD from 6 April 2026. Only 5% are prepared. We've answered the questions you're actually asking.
          </p>
        </div>

        {/* The 6 Essential Questions */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-1 text-slate-900">The 6 Essential Questions</h2>
          <p className="text-slate-600 mb-6">Start here.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: 'What is Making Tax Digital?', href: '/what-is-mtd', color: 'border-blue-500' },
              { title: 'Do I Have to Comply?', href: '/do-i-comply', color: 'border-green-500' },
              { title: 'Which Software Should I Use?', href: '/which-software', color: 'border-purple-500' },
              { title: 'How Much Will It Cost?', href: '/how-much-cost', color: 'border-amber-500' },
              { title: 'What Are the Deadlines?', href: '/deadlines-2026', color: 'border-red-500' },
              { title: 'What Records Do I Need?', href: '/what-records', color: 'border-indigo-500' },
            ].map((item) => (
              <Link key={item.href} href={item.href}>
                <div className={`bg-white p-6 rounded-lg shadow hover:shadow-lg transition cursor-pointer border-l-4 ${item.color}`}>
                  <h3 className="text-lg font-bold mb-2 text-slate-900">{item.title}</h3>
                  <p className="text-blue-600 font-semibold text-sm">Read →</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* 8 Deep Dives */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-1 text-slate-900">8 Deep Dives</h2>
          <p className="text-slate-600 mb-6">For specific situations.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { title: 'VAT Records', href: '/vat-records' },
              { title: 'Employees & MTD', href: '/employee-records' },
              { title: 'Partnerships & MTD', href: '/partnership-mtd' },
              { title: 'Directors & MTD', href: '/director-mtd' },
              { title: 'Limited Companies', href: '/limited-company-mtd' },
              { title: 'Voluntary MTD', href: '/voluntary-mtd' },
              { title: 'Amendments', href: '/mtd-amendments' },
              { title: 'Penalties & Fines', href: '/mtd-penalties' },
            ].map((item) => (
              <Link key={item.href} href={item.href}>
                <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition cursor-pointer border-l-4 border-slate-300 hover:border-blue-500">
                  <p className="text-slate-900 font-semibold text-sm">{item.title} →</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Premium Toolkit CTA */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-10 rounded-lg border-2 border-amber-300 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 text-slate-900">Ready to Stay Compliant All Year?</h2>
          <p className="text-slate-700 mb-6 text-base">
            Get our <strong>MTD Annual Toolkit</strong> — Excel templates, checklists & trackers for all 4 quarterly deadlines in 2026-2027. Set it up once, use it forever.
          </p>
          <Link href="/premium-checklist">
            <button className="bg-amber-600 text-white px-8 py-3 rounded-lg font-bold text-base hover:bg-amber-700 transition">
              Get the Toolkit (£4.99) →
            </button>
          </Link>
        </div>
      </section>
    </div>
  )
}
