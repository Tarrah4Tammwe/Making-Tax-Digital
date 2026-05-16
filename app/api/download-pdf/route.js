// app/api/download-pdf/route.js
export async function GET(request) {
  try {
    const jsPDF = require('jspdf')
    const pdf = new jsPDF.jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: false,
    })

    pdf.setFont('Helvetica', 'bold')
    pdf.setFontSize(20)
    pdf.setTextColor(15, 23, 42) // slate-900
    pdf.text('MTD Preparation Checklist', 20, 25)

    pdf.setFont('Helvetica', 'normal')
    pdf.setFontSize(11)
    pdf.setTextColor(100, 100, 100)
    pdf.text('Making Tax Digital Explained', 20, 35)

    let y = 50

    const sections = [
      {
        title: 'NOW — Before You Do Anything Else',
        items: [
          'Check your gross income: is it over £50,000? (Use last year\'s figures)',
          'If yes: you must register for MTD before 6 April 2026',
          'Choose your MTD software (see software section below)',
          'Tell your accountant you\'re going MTD (if you have one)',
        ],
      },
      {
        title: 'April 2026 — Registration',
        items: [
          'Sign up for MTD at gov.uk/sign-up-for-making-tax-digital-for-income-tax',
          'Connect your software to HMRC (OAuth authorisation)',
          'Set up your business bank feed in the software',
          'Migrate any existing 2025/26 income & expenses into the software',
          'Confirm your software is on HMRC\'s approved list',
        ],
      },
      {
        title: 'April–July 2026 — First Quarter',
        items: [
          'Log all income within 7 days of receiving it',
          'Photograph and log all business receipts immediately',
          'Categorise expenses correctly (travel, equipment, home office, etc.)',
          'Review your records at end of each month (takes ~30 mins)',
          'Check your software shows correct income/expense totals',
        ],
      },
      {
        title: '7 August 2026 — First Quarterly Deadline',
        items: [
          'Open your software and go to MTD submissions',
          'Review the Q1 summary (6 April – 5 July)',
          'Check for any missing or miscategorised items',
          'Submit Q1 update to HMRC via your software',
          'Save/screenshot your submission confirmation',
        ],
      },
      {
        title: 'Remaining 2026/27 Deadlines',
        items: [
          'Q2 deadline: 7 November 2026 (period: 6 July – 5 October)',
          'Q3 deadline: 7 February 2027 (period: 6 October – 5 January)',
          'Q4 deadline: 7 May 2027 (period: 6 January – 5 April)',
          'End of year declaration: 31 January 2028',
          'Tax payment deadline: 31 January 2028',
        ],
      },
      {
        title: 'Software Comparison',
        items: [
          'FreeAgent: ~£100/year. Best for UK freelancers. Free with NatWest/RBS.',
          'QuickBooks Self-Employed: ~£264/year. Simple, good mobile app.',
          'Xero: ~£360/year. Most powerful. Good if you have complex needs.',
          'Wave: Free. Basic but functional. Good starting point.',
          'Spreadsheets + bridging software: Cheapest. More manual work.',
        ],
      },
      {
        title: 'Expense Categories HMRC Accepts',
        items: [
          'Office costs (stationery, phone, broadband)',
          'Travel costs (fuel, train, parking – not commuting)',
          'Clothing (only uniforms/protective gear – not regular clothes)',
          'Staff costs (if you pay anyone)',
          'Things you buy to sell on',
          'Financial costs (bank charges, insurance)',
          'Marketing (website, ads, business cards)',
          'Training directly related to your work',
          'Home office (a portion of heating, electricity, broadband)',
        ],
      },
      {
        title: 'Common Mistakes to Avoid',
        items: [
          'Using personal accounts for business (open a separate one)',
          'Missing the quarterly deadline (set calendar reminders NOW)',
          'Claiming non-business expenses (HMRC audits these)',
          'Not keeping receipts (software can photograph them)',
          'Confusing gross income with profit for threshold calculation',
          'Assuming MTD replaces your end-of-year return (it doesn\'t)',
        ],
      },
    ]

    for (const section of sections) {
      if (y > 250) {
        pdf.addPage()
        y = 20
      }

      pdf.setFont('Helvetica', 'bold')
      pdf.setFontSize(13)
      pdf.setTextColor(37, 99, 235) // blue-600
      pdf.text(section.title, 20, y)
      y += 10

      pdf.setFont('Helvetica', 'normal')
      pdf.setFontSize(11)
      pdf.setTextColor(30, 30, 30)

      for (const item of section.items) {
        if (y > 270) {
          pdf.addPage()
          y = 20
        }
        const lines = pdf.splitTextToSize('☐ ' + item, 170)
        pdf.text(lines, 20, y)
        y += lines.length * 7 + 3
      }

      y += 5
    }

    // Footer
    const pageCount = pdf.getNumberOfPages()
    for (let i = 1; i <= pageCount; i++) {
      pdf.setPage(i)
      pdf.setFont('Helvetica', 'normal')
      pdf.setFontSize(9)
      pdf.setTextColor(150, 150, 150)
      pdf.text(`Page ${i} of ${pageCount}`, 180, 285)
      pdf.text('makingtaxdigitalexplained.com — Information only, not tax advice.', 20, 285)
    }

    const buffer = Buffer.from(pdf.output('arraybuffer'))

    return new Response(buffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="MTD-Preparation-Checklist.pdf"',
      },
    })
  } catch (error) {
    console.error('PDF generation error:', error)
    return new Response(JSON.stringify({ error: 'Failed to generate PDF' }), { status: 500 })
  }
}
