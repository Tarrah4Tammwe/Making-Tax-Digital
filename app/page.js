'use client'

import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 text-white py-24 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-6xl md:text-7xl font-bold mb-4">Making Tax Digital?</h1>
          <p className="text-2xl md:text-3xl mb-2 opacity-90">We&apos;ll Explain It.</p>
          <p className="text-xl opacity-80">No jargon. No panic. No surprises.</p>
          <p className="text-lg mt-8 max-w-3xl mx-auto opacity-75">
            780,000 UK freelancers are facing MTD from 6 April 2026. Only 5% are prepared. We&apos;ve answered the questions you&apos;re actually asking.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="mb-16">
          <h2 className="text-4xl font-bold mb-2 text-slate-900">The 6 Essential Questions</h2>
          <p className="text-slate-600 mb-8">Start here.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'What is Making Tax Digital?', href: '/what-is-mtd', color: 'border-blue-500' },
              { title: 'Do I Have to Comply?', href: '/do-i-comply', color: 'border-green-500' },
              { title: 'Which Software Should I Use?', href: '/which-software', color: 'border-purple-500' },
              { title: 'How Much Will It Cost?', href: '/how-much-cost', color: 'border-amber-500' },
              { title: 'What Are the Deadlines?', href: '/deadlines-2026', color: 'border-red-500' },
              { title: 'What Records Do I Need?', href: '/what-records', color: 'border-indigo-500' },
            ].map((item) => (
              <Link key={item.href} href={item.href}>
                <div className={`bg-white p-8 rounded-lg shadow-md hover:shadow-2xl transition cursor-pointer border-l-4 ${item.color}`}>
                  <h3 className="text-xl font-bold mb-3 text-slate-900">{item.title}</h3>
                  <p className="text-blue-600 font-semibold">Read →</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-4xl font-bold mb-2 text-slate-900">8 Deep Dives</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition cursor-pointer border-l-4 border-slate-300 hover:border-blue-500">
                  <p className="text-slate-900 font-semibold">{item.title} →</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-blue-600 text-white p-12 rounded-lg mb-16 text-center">
          <h2 className="text-3xl font-bold mb-4">How Much Will This Actually Cost You?</h2>
          <Link href="/calculator">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-slate-100">
              Use the Calculator →
            </button>
          </Link>
        </div>

 <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-12 rounded-lg border-2 border-amber-300">
          <h2 className="text-3xl font-bold mb-4 text-slate-900">Ready to Stay Compliant All Year?</h2>
          <p className="text-lg text-slate-700 mb-6">Get our <strong>MTD Annual Toolkit</strong> — Excel templates, checklists & trackers for all 4 quarterly deadlines in 2026-2027. Set it up once, use it forever.</p>
          <Link href="/premium-checklist">
            <button className="bg-amber-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-amber-700">
              Get the Toolkit (£4.99) →
            </button>
          </Link>
        </div>
      </section>
    </div>
  )
}
