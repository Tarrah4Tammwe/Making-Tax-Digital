'use client'

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

function SuccessContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [status, setStatus] = useState('valid')
  const [downloading, setDownloading] = useState(false)
  const [done, setDone] = useState(false)

  const triggerDownload = (url, filename) => {
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  const handleDownload = async () => {
    setDownloading(true)
    try {
      triggerDownload('/api/download-excel', 'MTD-Annual-Toolkit-2026.xlsx')
      await new Promise(r => setTimeout(r, 800))
      triggerDownload('/api/download-pdf', 'MTD-Preparation-Checklist.pdf')
      setDone(true)
    } catch (err) {
      alert('Download failed. Please try again or contact hello@makingtaxdigitalexplained.com')
    } finally {
      setDownloading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-6xl mb-6">🎉</div>
          <h1 className="text-4xl font-bold mb-4 text-slate-900">Payment confirmed!</h1>
          <p className="text-xl text-slate-600">Your MTD Annual Toolkit is ready to download.</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-10">
          <h2 className="font-bold text-lg mb-6 text-slate-900">What's in your toolkit:</h2>
          <div className="space-y-3">
            {[
              '📊 Excel toolkit — Dashboard, Record Keeper, Quarterly Summary, Software Comparison, Penalty Guide',
              '📋 PDF checklist — Every deadline and action step for 2026/27',
              '✅ All 4 quarterly deadlines covered',
              '✅ Working formulas — Days left calculates automatically',
              '✅ HMRC-accepted expense categories',
              '✅ Software comparison with honest costs',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="text-slate-700">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handleDownload}
          disabled={downloading}
          className="w-full bg-green-600 text-white px-10 py-6 rounded-lg font-bold text-xl hover:bg-green-700 disabled:opacity-60 transition flex items-center justify-center gap-3 mb-4"
        >
          <span className="text-3xl">⬇</span>
          {downloading ? 'Preparing your files…' : done ? '✅ Files downloaded!' : 'Download Your Toolkit'}
        </button>

        {done && (
          <p className="text-center text-green-700 font-semibold mb-6">
            Two files have been sent to your downloads folder: the Excel toolkit and the PDF checklist.
          </p>
        )}

        <p className="text-sm text-slate-500 text-center">
          Two files will download: Excel spreadsheet + PDF checklist.
          Problems? Email <a href="mailto:hello@makingtaxdigitalexplained.com" className="text-blue-600">hello@makingtaxdigitalexplained.com</a>
        </p>
      </div>
    </div>
  )
}

export default function CheckoutSuccess() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><p className="text-xl text-slate-600">Loading…</p></div>}>
      <SuccessContent />
    </Suspense>
  )
}
