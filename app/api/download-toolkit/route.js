// app/api/download-toolkit/route.js
import JSZip from 'jszip'
import puppeteer from 'puppeteer'

const htmlTemplate = (content) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1f2937; }
    .container { max-width: 210mm; margin: 0 auto; padding: 0; background: white; }
    
    /* Header */
    .header { background: linear-gradient(135deg, #1f2937 0%, #374151 100%); color: white; padding: 40px 30px; }
    .header h1 { font-size: 28px; margin-bottom: 5px; }
    .header p { font-size: 14px; opacity: 0.9; margin-bottom: 3px; }
    .header-subtitle { font-size: 13px; opacity: 0.8; }
    
    /* Sections */
    .section { padding: 30px; border-bottom: 1px solid #e5e7eb; page-break-inside: avoid; }
    .section:last-child { border-bottom: none; }
    .section-title { 
      font-size: 16px; 
      font-weight: 700; 
      color: white; 
      background: #2563eb; 
      padding: 10px 15px; 
      margin: -30px -30px 20px -30px;
      padding-top: 15px;
    }
    
    /* Checklist items */
    .checklist-item { display: flex; gap: 12px; margin-bottom: 12px; font-size: 14px; }
    .checkbox { flex-shrink: 0; width: 20px; height: 20px; border: 2px solid #d1d5db; border-radius: 3px; }
    .item-text { flex: 1; }
    
    /* Table */
    table { width: 100%; border-collapse: collapse; margin-top: 10px; }
    th { background: #f3f4f6; font-weight: 600; text-align: left; padding: 10px; font-size: 13px; }
    td { padding: 10px; border-bottom: 1px solid #e5e7eb; font-size: 13px; }
    
    /* Footer */
    .footer { background: #f9fafb; padding: 20px 30px; font-size: 12px; color: #6b7280; text-align: center; }
    .footer p { margin: 5px 0; }
    
    /* Page break */
    @page { margin: 0; }
    @media print { body { margin: 0; } }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <h1>📋 MTD Preparation Checklist</h1>
      <p>Making Tax Digital Explained</p>
      <p class="header-subtitle">Your step-by-step guide to MTD compliance in 2026</p>
    </div>

    ${content}

    <!-- Footer -->
    <div class="footer">
      <p><strong>makingtaxdigitalexplained.com</strong></p>
      <p>Information only, not tax advice. Generated on ${new Date().toLocaleDateString()}</p>
    </div>
  </div>
</body>
</html>
`

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

const generatePDFContent = () => {
  return sections.map(section => `
    <div class="section">
      <div class="section-title">${section.title}</div>
      ${section.items.map(item => `
        <div class="checklist-item">
          <div class="checkbox"></div>
          <div class="item-text">${item}</div>
        </div>
      `).join('')}
    </div>
  `).join('')
}

export async function GET(request) {
  try {
    // Generate PDF using Puppeteer
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    
    const htmlContent = htmlTemplate(generatePDFContent())
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' })
    
    const pdfBuffer = await page.pdf({
      format: 'A4',
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
    })
    
    await browser.close()

    // Generate Excel file
    const ExcelJS = require('exceljs')
    const workbook = new ExcelJS.Workbook()
    workbook.creator = 'Making Tax Digital Explained'
    workbook.created = new Date()

    // Define branding colors
    const colors = {
      darkSlate: 'FF1F2937',
      blue: 'FF2563EB',
      green: 'FF059669',
      purple: 'FF9333EA',
      red: 'FFDC2626',
    }

    // Sheet 1: Dashboard
    const dashboard = workbook.addWorksheet('Dashboard', { properties: { tabColor: '002060' } })
    dashboard.columns = [
      { header: 'Q1 2026', key: 'q1', width: 22 },
      { header: 'Q2 2026', key: 'q2', width: 22 },
      { header: 'Q3 2026/27', key: 'q3', width: 22 },
      { header: 'Q4 2026/27', key: 'q4', width: 22 },
    ]
    
    // Header row
    dashboard.getRow(1).values = ['Q1 2026', 'Q2 2026', 'Q3 2026/27', 'Q4 2026/27']
    dashboard.getRow(1).font = { bold: true, size: 14, color: { argb: 'FFFFFFFF' } }
    dashboard.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colors.darkSlate } }
    dashboard.getRow(1).alignment = { horizontal: 'center', vertical: 'middle' }
    dashboard.getRow(1).height = 25

    // Data rows
    dashboard.addRow({ q1: 'Deadline: 7 Aug 2026', q2: 'Deadline: 7 Nov 2026', q3: 'Deadline: 7 Feb 2027', q4: 'Deadline: 7 May 2027' })
    dashboard.addRow({ q1: 'Period: 6 Apr - 5 Jul', q2: 'Period: 6 Jul - 5 Oct', q3: 'Period: 6 Oct - 5 Jan', q4: 'Period: 6 Jan - 5 Apr' })
    
    dashboard.eachRow((row, rowNumber) => {
      if (rowNumber > 1) {
        row.font = { size: 11, color: { argb: 'FF374151' } }
        row.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF3F4F6' } }
        row.alignment = { horizontal: 'center', vertical: 'center', wrapText: true }
        row.height = 30
      }
    })

    // Sheet 2: Record Keeper
    const records = workbook.addWorksheet('Record Keeper', { properties: { tabColor: '0070C0' } })
    records.columns = [
      { header: 'Date', key: 'date', width: 14 },
      { header: 'Income (£)', key: 'income', width: 15 },
      { header: 'Expense Category', key: 'category', width: 20 },
      { header: 'Expense (£)', key: 'expense', width: 15 },
      { header: 'Notes', key: 'notes', width: 30 },
    ]

    records.getRow(1).font = { bold: true, size: 12, color: { argb: 'FFFFFFFF' } }
    records.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colors.blue } }
    records.getRow(1).alignment = { horizontal: 'center', vertical: 'middle' }
    records.getRow(1).height = 20

    records.addRow({
      date: '01/05/2026',
      income: 500,
      category: 'Equipment',
      expense: 120.50,
      notes: 'Laptop purchase (business use)',
    })

    // Sheet 3: Quarterly Summary with FORMULAS
    const summary = workbook.addWorksheet('Quarterly Summary', { properties: { tabColor: '00B050' } })
    summary.columns = [
      { header: 'Category', key: 'category', width: 25 },
      { header: 'Q1 (Apr-Jul)', key: 'q1', width: 16 },
      { header: 'Q2 (Jul-Oct)', key: 'q2', width: 16 },
      { header: 'Q3 (Oct-Jan)', key: 'q3', width: 16 },
      { header: 'Q4 (Jan-Apr)', key: 'q4', width: 16 },
    ]

    summary.getRow(1).font = { bold: true, size: 12, color: { argb: 'FFFFFFFF' } }
    summary.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colors.green } }
    summary.getRow(1).alignment = { horizontal: 'center' }
    summary.getRow(1).height = 20

    summary.addRow({ category: 'Total Income' })
    summary.addRow({ category: 'Total Expenses' })
    summary.addRow({ category: 'Net Profit' })

    // Add formulas to Net Profit row
    summary.getCell('B4').value = '=B2-B3'
    summary.getCell('C4').value = '=C2-C3'
    summary.getCell('D4').value = '=D2-D3'
    summary.getCell('E4').value = '=E2-E3'

    summary.eachRow((row, rowNumber) => {
      if (rowNumber > 1) {
        row.font = { size: 11 }
        row.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF0FDF4' } }
        if (rowNumber === 4) {
          row.font = { ...row.font, bold: true }
          row.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFA7F3D0' } }
        }
      }
      row.eachCell((cell, colNumber) => {
        if (colNumber > 1) {
          cell.alignment = { horizontal: 'right' }
          if (cell.value && typeof cell.value === 'number') {
            cell.numFmt = '£#,##0.00'
          }
        }
      })
    })

    // Sheet 4: Software Comparison
    const software = workbook.addWorksheet('Software Comparison', { properties: { tabColor: '7030A0' } })
    software.columns = [
      { header: 'Software', key: 'name', width: 20 },
      { header: 'Cost/Year', key: 'cost', width: 14 },
      { header: 'Best For', key: 'best', width: 22 },
      { header: 'Key Features', key: 'features', width: 35 },
    ]

    software.getRow(1).font = { bold: true, size: 12, color: { argb: 'FFFFFFFF' } }
    software.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colors.purple } }
    software.getRow(1).height = 20

    const softwareData = [
      { name: 'FreeAgent', cost: '~£100', best: 'UK freelancers', features: 'Bank feed, invoicing, expense tracking' },
      { name: 'Xero', cost: '~£360', best: 'Complex needs', features: 'Multi-currency, advanced reporting' },
      { name: 'QuickBooks', cost: '~£264', best: 'General use', features: 'Mobile app, simple interface' },
      { name: 'Wave', cost: 'Free', best: 'Startup', features: 'Basic but functional' },
    ]

    softwareData.forEach(row => software.addRow(row))

    software.eachRow((row, rowNumber) => {
      if (rowNumber > 1) {
        row.font = { size: 11 }
        row.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF3E8FF' } }
        row.alignment = { wrapText: true, vertical: 'top' }
        row.height = 35
      }
    })

    // Sheet 5: Penalty Guide
    const penalties = workbook.addWorksheet('Penalty Guide', { properties: { tabColor: 'C00000' } })
    penalties.columns = [
      { header: 'Scenario', key: 'scenario', width: 35 },
      { header: 'Penalty', key: 'penalty', width: 30 },
    ]

    penalties.getRow(1).font = { bold: true, size: 12, color: { argb: 'FFFFFFFF' } }
    penalties.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colors.red } }
    penalties.getRow(1).height = 20

    const penaltyData = [
      { scenario: 'Miss quarterly deadline', penalty: '5% of unpaid tax' },
      { scenario: 'Late quarterly update', penalty: 'Escalating penalties' },
      { scenario: 'No records kept', penalty: 'Potential prosecution' },
      { scenario: 'Deliberate failure to submit', penalty: 'Up to £3,000 per quarter' },
    ]

    penaltyData.forEach(row => penalties.addRow(row))

    penalties.eachRow((row, rowNumber) => {
      if (rowNumber > 1) {
        row.font = { size: 11 }
        row.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFCF2F2' } }
        row.alignment = { wrapText: true, vertical: 'center' }
        row.height = 30
      }
    })

    const excelBuffer = await workbook.xlsx.writeBuffer()

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
    return new Response(JSON.stringify({ error: error.message || 'Failed to generate toolkit' }), { status: 500 })
  }
}
