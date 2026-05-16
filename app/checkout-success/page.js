'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

function SuccessContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [status, setStatus] = useState('loading') // loading | valid | invalid
  const [downloading, setDownloading] = useState(false)

  useEffect(() => {
    if (!sessionId) {
      setStatus('invalid')
      return
    }

    fetch(`/api/verify-payment?session_id=${sessionId}`)
      .then(r => r.json())
      .then(data => {
        if (data.valid) {
          localStorage.setItem('mtd_premium', 'true')
          setStatus('valid')
        } else {
          setStatus('invalid')
        }
      })
      .catch(() => setStatus('invalid'))
  }, [sessionId])

  const handleDownload = async () => {
    setDownloading(true)
    try {
      const response = await fetch('/api/download-toolkit')
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'MTD-Annual-Toolkit-2026.zip'
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (err) {
      alert('Download failed. Please try again.')
      console.error(err)
    } finally {
      setDownloading(false)
    }
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4">⏳</div>
          <p className="text-xl text-slate-600">Confirming your payment…</p>
        </div>
      </div>
    )
  }

  if (status === 'invalid') {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="text-5xl mb-4">❌</div>
          <h1 className="text-2xl font-bold mb-4">We couldn't confirm your payment</h1>
          <p className="text-slate-600 mb-6">
            If you did pay, email us at{' '}
            <a href="mailto:hello@makingtaxdigitalexplained.com" className="text-blue-600">
              hello@makingtaxdigitalexplained.com
            </a>
            {' '}and we'll sort it immediately.
          </p>
          <Link href="/premium-checklist">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold">
              Try again →
            </button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-6xl mb-6">🎉</div>
          <h1 className="text-4xl font-bold mb-4 text-slate-900">Payment confirmed!</h1>
          <p className="text-xl text-slate-600">
            Your MTD Annual Toolkit is ready to download.
          </p>
        </div>

        {/* What's Inside */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-10">
          <h2 className="font-bold text-lg mb-6 text-slate-900">What's in your toolkit:</h2>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="text-2xl">✅</span>
              <span className="text-slate-700">Month-by-month action plan (now through April 2026)</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">✅</span>
              <span className="text-slate-700">Every quarterly deadline for 2026/27</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">✅</span>
              <span className="text-slate-700">Software comparison with honest costs</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">✅</span>
              <span className="text-slate-700">All HMRC-accepted expense categories</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">✅</span>
              <span className="text-slate-700">Common mistakes to avoid</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">✅</span>
              <span className="text-slate-700">Printable checklist format</span>
            </div>
          </div>
        </div>

        {/* Download Button */}
        <button
          onClick={handleDownload}
          disabled={downloading}
          className="w-full bg-green-600 text-white px-10 py-6 rounded-lg font-bold text-xl hover:bg-green-700 disabled:opacity-60 transition flex items-center justify-center gap-3 mb-8"
        >
          <span className="text-3xl">⬇</span>
          {downloading ? 'Preparing your download…' : 'Download Your Toolkit (ZIP)'}
        </button>

        {/* Footer Info */}
        <p className="text-sm text-slate-600 text-center">
          Your toolkit includes both Excel spreadsheet and PDF checklist. 
          Access is saved in this browser. If you clear your browser data,{' '}
          <a href="mailto:hello@makingtaxdigitalexplained.com" className="text-blue-600">
            contact us
          </a>
          {' '}to restore it.
        </p>
      </div>
    </div>
  )
}

export default function CheckoutSuccess() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-slate-600">Loading…</p>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  )
}
