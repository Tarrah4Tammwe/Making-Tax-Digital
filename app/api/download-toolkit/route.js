// app/api/download-toolkit/route.js
import JSZip from 'jszip'

export async function GET(request) {
  try {
    // Generate Excel file
    const ExcelJS = require('exceljs')
    const workbook = new ExcelJS.Workbook()

    // Sheet 1: Dashboard
    const dashboard = workbook.addWorksheet('Dashboard')
    dashboard.columns = [
      { header: 'Q1 2026', key: 'q1', width: 20 },
      { header: 'Q2 2026', key: 'q2', width: 20 },
      { header: 'Q3 2026/27', key: 'q3', width: 20 },
      { header: 'Q4 2026/27', key: 'q4', width: 20 },
    ]
    dashboard.addRow({
      q1: 'Deadline: 7 Aug 2026',
      q2: 'Deadline: 7 Nov 2026',
      q3: 'Deadline: 7 Feb 2027',
      q4: 'Deadline: 7 May 2027',
    })
    dashboard.addRow({
      q1: 'Period: 6 Apr - 5 Jul',
      q2: 'Period: 6 Jul - 5 Oct',
      q3: 'Period: 6 Oct - 5 Jan',
      q4: 'Period: 6 Jan - 5 Apr',
    })
    dashboard.getRow(1).font = { bold: true, size: 14, color: { argb: 'FFFFFFFF' } }
    dashboard.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1F2937' } }

    // Sheet 2: Record Keeper
    const records = workbook.addWorksheet('Record Keeper')
    records.columns = [
      { header: 'Date', key: 'date', width: 12 },
      { header: 'Income Amount', key: 'income', width: 15 },
      { header: 'Expense Category', key: 'category', width: 18 },
      { header: 'Expense Amount', key: 'expense', width: 15 },
      { header: 'Notes', key: 'notes', width: 30 },
    ]
    records.addRow({
      date: 'e.g. 01/05/2026',
      income: '£500',
      category: 'Equipment',
      expense: '£120.50',
      notes: 'Laptop purchase (business use)',
    })
    records.getRow(1).font = { bold: true, size: 12, color: { argb: 'FFFFFFFF' } }
    records.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF2563EB' } }

    // Sheet 3: Quarterly Summary
    const summary = workbook.addWorksheet('Quarterly Summary')
    summary.columns = [
      { header: 'Category', key: 'category', width: 25 },
      { header: 'Q1 (Apr-Jul)', key: 'q1', width: 15 },
      { header: 'Q2 (Jul-Oct)', key: 'q2', width: 15 },
      { header: 'Q3 (Oct-Jan)', key: 'q3', width: 15 },
      { header: 'Q4 (Jan-Apr)', key: 'q4', width: 15 },
    ]
    summary.addRows([
      { category: 'Total Income', q1: '', q2: '', q3: '', q4: '' },
      { category: 'Total Expenses', q1: '', q2: '', q3: '', q4: '' },
      { category: 'Net Profit', q1: '', q2: '', q3: '', q4: '' },
    ])
    summary.getRow(1).font = { bold: true, size: 12, color: { argb: 'FFFFFFFF' } }
    summary.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF059669' } }

    // Sheet 4: Software Comparison
    const software = workbook.addWorksheet('Software Comparison')
    software.columns = [
      { header: 'Software', key: 'name', width: 20 },
      { header: 'Cost/Year', key: 'cost', width: 12 },
      { header: 'Best For', key: 'best', width: 25 },
      { header: 'Key Features', key: 'features', width: 35 },
    ]
    software.addRows([
      { name: 'FreeAgent', cost: '~£100', best: 'UK freelancers', features: 'Bank feed, invoicing, expense tracking' },
      { name: 'Xero', cost: '~£360', best: 'Complex needs', features: 'Multi-currency, advanced reporting' },
      { name: 'QuickBooks', cost: '~£264', best: 'General use', features: 'Mobile app, simple interface' },
      { name: 'Wave', cost: 'Free', best: 'Startup', features: 'Basic but functional' },
    ])
    software.getRow(1).font = { bold: true, size: 12, color: { argb: 'FFFFFFFF' } }
    software.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF9333EA' } }

    // Sheet 5: Penalty Guide
    const penalties = workbook.addWorksheet('Penalty Guide')
    penalties.columns = [
      { header: 'Scenario', key: 'scenario', width: 30 },
      { header: 'Penalty', key: 'penalty', width: 25 },
    ]
    penalties.addRows([
      { scenario: 'Miss quarterly deadline', penalty: '5% of unpaid tax' },
      { scenario: 'Late quarterly update', penalty: 'Escalating penalties' },
      { scenario: 'No records kept', penalty: 'Potential prosecution' },
      { scenario: 'Deliberate failure to submit', penalty: 'Up to £3,000 per quarter' },
    ])
    penalties.getRow(1).font = { bold: true, size: 12, color: { argb: 'FFFFFFFF' } }
    penalties.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFDC2626' } }

    const excelBuffer = await workbook.xlsx.writeBuffer()

    // Generate PDF file
    const jsPDF = require('jspdf')
    const pdf = new jsPDF.jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    })

    pdf.setFont('Helvetica', 'bold')
    pdf.setFontSize(20)
    pdf.setTextColor(15, 23, 42)
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
      pdf.setTextColor(37, 99, 235)
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

    const pageCount = pdf.getNumberOfPages()
    for (let i = 1; i <= pageCount; i++) {
      pdf.setPage(i)
      pdf.setFont('Helvetica', 'normal')
      pdf.setFontSize(9)
      pdf.setTextColor(150, 150, 150)
      pdf.text(`Page ${i} of ${pageCount}`, 180, 285)
      pdf.text('makingtaxdigitalexplained.com — Information only, not tax advice.', 20, 285)
    }

    const pdfBuffer = Buffer.from(pdf.output('arraybuffer'))

    // Create ZIP with both files
    const zip = new JSZip()
    zip.file('MTD-Annual-Toolkit-2026.xlsx', excelBuffer)
    zip.file('MTD-Preparation-Checklist.pdf', pdfBuffer)

    const zipBuffer = await zip.generateAsync({ type: 'nodebuffer' })

    return new Response(zipBuffer, {
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': 'attachment; filename="MTD-Annual-Toolkit-2026.zip"',
      },
    })
  } catch (error) {
    console.error('Toolkit generation error:', error)
    return new Response(JSON.stringify({ error: 'Failed to generate toolkit' }), { status: 500 })
  }
}
