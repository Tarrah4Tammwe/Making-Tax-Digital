'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

function SuccessContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [status, setStatus] = useState('loading') // loading | valid | invalid
  const [pdfLoading, setPdfLoading] = useState(false)

  useEffect(() => {
    if (!sessionId) {
      setStatus('invalid')
      return
    }

    fetch(`/api/verify-payment?session_id=${sessionId}`)
      .then(r => r.json())
      .then(data => {
        if (data.valid) {
          // Store in localStorage — no server, no database, no email
          localStorage.setItem('mtd_premium', 'true')
          setStatus('valid')
        } else {
          setStatus('invalid')
        }
      })
      .catch(() => setStatus('invalid'))
  }, [sessionId])

  const handleDownloadPDF = async () => {
    setPdfLoading(true)
    try {
      const { jsPDF } = await import('jspdf')
      const doc = new jsPDF()

      // Header bar
      doc.setFillColor(15, 23, 42) // slate-900
      doc.rect(0, 0, 210, 32, 'F')
      doc.setTextColor(255, 255, 255)
      doc.setFontSize(18)
      doc.setFont('helvetica', 'bold')
      doc.text('MTD Preparation Checklist', 20, 14)
      doc.setFontSize(11)
      doc.setFont('helvetica', 'normal')
      doc.text('Making Tax Digital Explained — makingtaxdigitalexplained.com', 20, 25)

      doc.setTextColor(30, 30, 30)
      let y = 46

      const addSection = (title, items) => {
        if (y > 255) { doc.addPage(); y = 20 }
        doc.setFillColor(37, 99, 235) // blue-600
        doc.rect(0, y - 6, 210, 10, 'F')
        doc.setTextColor(255, 255, 255)
        doc.setFontSize(12)
        doc.setFont('helvetica', 'bold')
        doc.text(title, 20, y + 1)
        doc.setTextColor(30, 30, 30)
        doc.setFont('helvetica', 'normal')
        doc.setFontSize(11)
        y += 14

        for (const item of items) {
          if (y > 270) { doc.addPage(); y = 20 }
          doc.text(`☐  ${item}`, 22, y)
          y += 8
        }
        y += 6
      }

      addSection('NOW — Before You Do Anything Else', [
        'Check your gross income: is it over £50,000? (Use last year\'s figures)',
        'If yes: you must register for MTD before 6 April 2026',
        'Choose your MTD software (see software section below)',
        'Tell your accountant you\'re going MTD (if you have one)',
      ])

      addSection('April 2026 — Registration', [
        'Sign up for MTD at gov.uk/sign-up-for-making-tax-digital-for-income-tax',
        'Connect your software to HMRC (OAuth authorisation)',
        'Set up your business bank feed in the software',
        'Migrate any existing 2025/26 income & expenses into the software',
        'Confirm your software is on HMRC\'s approved list',
      ])

      addSection('April–July 2026 — First Quarter', [
        'Log all income within 7 days of receiving it',
        'Photograph and log all business receipts immediately',
        'Categorise expenses correctly (travel, equipment, home office, etc.)',
        'Review your records at end of each month (takes ~30 mins)',
        'Check your software shows correct income/expense totals',
      ])

      addSection('7 August 2026 — First Quarterly Deadline', [
        'Open your software and go to MTD submissions',
        'Review the Q1 summary (6 April – 5 July)',
        'Check for any missing or miscategorised items',
        'Submit Q1 update to HMRC via your software',
        'Save/screenshot your submission confirmation',
      ])

      addSection('Remaining 2026/27 Deadlines', [
        'Q2 deadline: 7 November 2026 (period: 6 July – 5 October)',
        'Q3 deadline: 7 February 2027 (period: 6 October – 5 January)',
        'Q4 deadline: 7 May 2027 (period: 6 January – 5 April)',
        'End of year declaration: 31 January 2028',
        'Tax payment deadline: 31 January 2028',
      ])

      addSection('Software Comparison', [
        'FreeAgent: ~£100/year. Best for UK freelancers. Free with NatWest/RBS.',
        'QuickBooks Self-Employed: ~£264/year. Simple, good mobile app.',
        'Xero: ~£360/year. Most powerful. Good if you have complex needs.',
        'Wave: Free. Basic but functional. Good starting point.',
        'Spreadsheets + bridging software: Cheapest. More manual work.',
      ])

      addSection('Expense Categories HMRC Accepts', [
        'Office costs (stationery, phone, broadband)',
        'Travel costs (fuel, train, parking — not commuting)',
        'Clothing (only uniforms/protective gear — not regular clothes)',
        'Staff costs (if you pay anyone)',
        'Things you buy to sell on',
        'Financial costs (bank charges, insurance)',
        'Marketing (website, ads, business cards)',
        'Training directly related to your work',
        'Home office (a portion of heating, electricity, broadband)',
      ])

      addSection('Common Mistakes to Avoid', [
        'Using personal accounts for business (open a separate one)',
        'Missing the quarterly deadline (set calendar reminders NOW)',
        'Claiming non-business expenses (HMRC audits these)',
        'Not keeping receipts (software can photograph them)',
        'Confusing gross income with profit for threshold calculation',
        'Assuming MTD replaces your end-of-year return (it doesn\'t)',
      ])

      // Footer
      const pageCount = doc.getNumberOfPages()
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i)
        doc.setFontSize(9)
        doc.setTextColor(150, 150, 150)
        doc.text(`Page ${i} of ${pageCount}`, 180, 290)
        doc.text('makingtaxdigitalexplained.com — Information only, not tax advice.', 20, 290)
      }

      doc.save('MTD-Preparation-Checklist.pdf')
    } catch (err) {
      alert('PDF download failed. Please refresh and try again.')
    } finally {
      setPdfLoading(false)
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
            </a>{' '}
            and we'll sort it immediately.
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
      <div className="max-w-2xl mx-auto text-center">
        <div className="text-6xl mb-6">🎉</div>
        <h1 className="text-4xl font-bold mb-4 text-slate-900">Payment confirmed!</h1>
        <p className="text-xl text-slate-600 mb-8">
          Your MTD Preparation Checklist is ready to download.
        </p>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8 text-left">
          <h2 className="font-bold text-lg mb-4">What's in your checklist:</h2>
          <ul className="space-y-2 text-slate-700">
            {[
              '✅ Month-by-month action plan (now through April 2026)',
              '✅ Every quarterly deadline for 2026/27',
              '✅ Software comparison with honest costs',
              '✅ All HMRC-accepted expense categories',
              '✅ Common mistakes to avoid',
              '✅ Printable checklist format',
            ].map(item => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <button
          onClick={handleDownloadPDF}
          disabled={pdfLoading}
          className="bg-green-600 text-white px-10 py-4 rounded-lg font-bold text-xl hover:bg-green-700 w-full mb-4 disabled:opacity-60"
        >
          {pdfLoading ? 'Generating your PDF…' : '⬇ Download Your Checklist (PDF)'}
        </button>

        <p className="text-sm text-slate-500">
          Access is saved in this browser. If you clear your browser data,{' '}
          <a href="mailto:hello@makingtaxdigitalexplained.com" className="text-blue-600">
            contact us
          </a>{' '}
          to restore it.
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
