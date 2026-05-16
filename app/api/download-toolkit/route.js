// app/api/download-toolkit/route.js
import puppeteer from 'puppeteer'
import ExcelJS from 'exceljs'
import archiver from 'archiver'

const htmlTemplate = (content) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1f2937; }
    .container { max-width: 210mm; margin: 0 auto; padding: 0; background: white; }
    .header { background: linear-gradient(135deg, #1f2937 0%, #374151 100%); color: white; padding: 40px 30px; }
    .header h1 { font-size: 28px; margin-bottom: 5px; }
    .header p { font-size: 14px; opacity: 0.9; margin-bottom: 3px; }
    .header-subtitle { font-size: 13px; opacity: 0.8; }
    .section { padding: 30px; border-bottom: 1px solid #e5e7eb; page-break-inside: avoid; }
    .section:last-child { border-bottom: none; }
    .section-title { font-size: 16px; font-weight: 700; color: white; background: #2563eb; padding: 10px 15px; margin: -30px -30px 20px -30px; padding-top: 15px; }
    .checklist-item { display: flex; gap: 12px; margin-bottom: 12px; font-size: 14px; }
    .checkbox { flex-shrink: 0; width: 20px; height: 20px; border: 2px solid #d1d5db; border-radius: 3px; }
    .item-text { flex: 1; }
    .footer { background: #f9fafb; padding: 20px 30px; font-size: 12px; color: #6b7280; text-align: center; }
    .footer p { margin: 5px 0; }
    @page { margin: 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>📋 MTD Preparation Checklist</h1>
      <p>Making Tax Digital Explained</p>
      <p class="header-subtitle">Your step-by-step guide to MTD compliance in 2026</p>
    </div>
    ${content}
    <div class="footer">
      <p><strong>makingtaxdigitalexplained.com</strong></p>
      <p>Information only, not tax advice. Generated on ${new Date().toLocaleDateString()}</p>
    </div>
  </div>
</body>
</html>
`

const sections = [
  { title: 'NOW — Before You Do Anything Else', items: ['Check your gross income: is it over £50,000? (Use last year\'s figures)', 'If yes: you must register for MTD before 6 April 2026', 'Choose your MTD software (see software section below)', 'Tell your accountant you\'re going MTD (if you have one)'] },
  { title: 'April 2026 — Registration', items: ['Sign up for MTD at gov.uk/sign-up-for-making-tax-digital-for-income-tax', 'Connect your software to HMRC (OAuth authorisation)', 'Set up your business bank feed in the software', 'Migrate any existing 2025/26 income & expenses into the software', 'Confirm your software is on HMRC\'s approved list'] },
  { title: 'April–July 2026 — First Quarter', items: ['Log all income within 7 days of receiving it', 'Photograph and log all business receipts immediately', 'Categorise expenses correctly (travel, equipment, home office, etc.)', 'Review your records at end of each month (takes ~30 mins)', 'Check your software shows correct income/expense totals'] },
  { title: '7 August 2026 — First Quarterly Deadline', items: ['Open your software and go to MTD submissions', 'Review the Q1 summary (6 April – 5 July)', 'Check for any missing or miscategorised items', 'Submit Q1 update to HMRC via your software', 'Save/screenshot your submission confirmation'] },
  { title: 'Remaining 2026/27 Deadlines', items: ['Q2 deadline: 7 November 2026 (period: 6 July – 5 October)', 'Q3 deadline: 7 February 2027 (period: 6 October – 5 January)', 'Q4 deadline: 7 May 2027 (period: 6 January – 5 April)', 'End of year declaration: 31 January 2028', 'Tax payment deadline: 31 January 2028'] },
  { title: 'Software Comparison', items: ['FreeAgent: ~£100/year. Best for UK freelancers. Free with NatWest/RBS.', 'QuickBooks Self-Employed: ~£264/year. Simple, good mobile app.', 'Xero: ~£360/year. Most powerful. Good if you have complex needs.', 'Wave: Free. Basic but functional. Good starting point.', 'Spreadsheets + bridging software: Cheapest. More manual work.'] },
  { title: 'Expense Categories HMRC Accepts', items: ['Office costs (stationery, phone, broadband)', 'Travel costs (fuel, train, parking – not commuting)', 'Clothing (only uniforms/protective gear – not regular clothes)', 'Staff costs (if you pay anyone)', 'Things you buy to sell on', 'Financial costs (bank charges, insurance)', 'Marketing (website, ads, business cards)', 'Training directly related to your work', 'Home office (a portion of heating, electricity, broadband)'] },
  { title: 'Common Mistakes to Avoid', items: ['Using personal accounts for business (open a separate one)', 'Missing the quarterly deadline (set calendar reminders NOW)', 'Claiming non-business expenses (HMRC audits these)', 'Not keeping receipts (software can photograph them)', 'Confusing gross income with profit for threshold calculation', 'Assuming MTD replaces your end-of-year return (it doesn\'t)'] },
]

const generatePDFContent = () => sections.map(section => `<div class="section"><div class="section-title">${section.title}</div>${section.items.map(item => `<div class="checklist-item"><div class="checkbox"></div><div class="item-text">${item}</div></div>`).join('')}</div>`).join('')

async function generateExcel() {
  const workbook = new ExcelJS.Workbook()
  workbook.creator = 'Making Tax Digital Explained'
  workbook.created = new Date()

  const colors = { darkSlate: 'FF1F2937', blue: 'FF2563EB', green: 'FF059669', purple: 'FF9333EA', red: 'FFDC2626', lightGray: 'FFF3F4F6', lightGreen: 'FFF0FDF4' }

  // DASHBOARD
  const dashboard = workbook.addWorksheet('Dashboard', { properties: { tabColor: '002060' } })
  dashboard.mergeCells('A1:E1')
  const title = dashboard['A1']
  title.value = '📊 2026/27 MTD COMPLIANCE DASHBOARD'
  title.font = { bold: true, size: 16, color: { argb: 'FFFFFFFF' } }
  title.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colors.darkSlate } }
  title.alignment = { horizontal: 'center', vertical: 'center' }
  dashboard.getRow(1).height = 28

  dashboard.mergeCells('A3:E3')
  const statusHeader = dashboard['A3']
  statusHeader.value = 'CURRENT STATUS'
  statusHeader.font = { bold: true, size: 12, color: { argb: 'FFFFFFFF' } }
  statusHeader.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colors.blue } }
  dashboard.getRow(3).height = 20

  dashboard['A4'].value = 'Current Quarter:'
  dashboard['B4'].value = 'Q1 2026 (6 Apr - 5 Jul)'
  dashboard['A5'].value = 'Days Until Next Deadline:'
  dashboard['B5'].value = { formula: '=IF(TODAY()<=DATE(2026,8,7),DATE(2026,8,7)-TODAY(),"Deadline Passed")' }
  dashboard['A6'].value = 'Status:'
  dashboard['B6'].value = 'IN PROGRESS'

  for (let row = 4; row <= 6; row++) {
    for (let col = 1; col <= 2; col++) {
      const cell = dashboard.getCell(row, col)
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colors.lightGray } }
      cell.alignment = { horizontal: 'left', vertical: 'center' }
    }
  }
  dashboard['A4'].font = { bold: true }
  dashboard['A5'].font = { bold: true }
  dashboard['A6'].font = { bold: true }
  dashboard['B6'].font = { bold: true, color: { argb: 'FFF59E0B' } }

  dashboard.getColumn('A').width = 22
  dashboard.getColumn('B').width = 28

  dashboard.mergeCells('A8:E8')
  const timelineHeader = dashboard['A8']
  timelineHeader.value = 'QUARTERLY DEADLINES 2026/27'
  timelineHeader.font = { bold: true, size: 12, color: { argb: 'FFFFFFFF' } }
  timelineHeader.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colors.blue } }
  dashboard.getRow(8).height = 20

  const headers = ['Quarter', 'Period', 'Deadline', 'Days Left', 'Status']
  headers.forEach((header, idx) => {
    const cell = dashboard.getCell(9, idx + 1)
    cell.value = header
    cell.font = { bold: true, size: 11, color: { argb: 'FFFFFFFF' } }
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colors.darkSlate } }
    cell.alignment = { horizontal: 'center', vertical: 'center' }
  })
  dashboard.getRow(9).height = 18

  const quarters = [
    { q: 'Q1', period: '6 Apr - 5 Jul 2026', deadline: '7 Aug 2026', daysFormula: '=IF(TODAY()<=DATE(2026,8,7),DATE(2026,8,7)-TODAY(),"⚠")' },
    { q: 'Q2', period: '6 Jul - 5 Oct 2026', deadline: '7 Nov 2026', daysFormula: '=IF(TODAY()<=DATE(2026,11,7),DATE(2026,11,7)-TODAY(),"⚠")' },
    { q: 'Q3', period: '6 Oct - 5 Jan 2027', deadline: '7 Feb 2027', daysFormula: '=IF(TODAY()<=DATE(2027,2,7),DATE(2027,2,7)-TODAY(),"⚠")' },
    { q: 'Q4', period: '6 Jan - 5 Apr 2027', deadline: '7 May 2027', daysFormula: '=IF(TODAY()<=DATE(2027,5,7),DATE(2027,5,7)-TODAY(),"⚠")' },
  ]

  quarters.forEach((q, idx) => {
    const row = 10 + idx
    dashboard.getCell(row, 1).value = q.q
    dashboard.getCell(row, 2).value = q.period
    dashboard.getCell(row, 3).value = q.deadline
    dashboard.getCell(row, 4).value = { formula: q.daysFormula }
    dashboard.getCell(row, 5).value = 'PENDING'
    
    for (let col = 1; col <= 5; col++) {
      const cell = dashboard.getCell(row, col)
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colors.lightGray } }
      cell.alignment = { horizontal: 'center', vertical: 'center', wrapText: true }
    }
    dashboard.getRow(row).height = 20
  })

  dashboard.getColumn('C').width = 16
  dashboard.getColumn('D').width = 12
  dashboard.getColumn('E').width = 12

  dashboard.mergeCells('A15:E15')
  const ieHeader = dashboard['A15']
  ieHeader.value = 'INCOME & EXPENSE TRACKER (Current Quarter)'
  ieHeader.font = { bold: true, size: 12, color: { argb: 'FFFFFFFF' } }
  ieHeader.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colors.green } }
  dashboard.getRow(15).height = 20

  const ieLabels = ['', 'Amount (£)', 'vs Budget', 'Status', '']
  ieLabels.forEach((label, idx) => {
    const cell = dashboard.getCell(16, idx + 1)
    cell.value = label
    cell.font = { bold: true, size: 11, color: { argb: 'FFFFFFFF' } }
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colors.darkSlate } }
    cell.alignment = { horizontal: 'center' }
  })
  dashboard.getRow(16).height = 18

  const ieData = [
    { label: 'Total Income', value: { formula: '=\'Record Keeper\'!B2' }, status: 'TRACKING' },
    { label: 'Total Expenses', value: { formula: '=\'Record Keeper\'!D2' }, status: 'TRACKING' },
    { label: 'Net Profit', value: { formula: '=B17-B18' }, status: 'CALCULATING' },
  ]

  ieData.forEach((data, idx) => {
    const row = 17 + idx
    dashboard.getCell(row, 1).value = data.label
    dashboard.getCell(row, 2).value = data.value
    dashboard.getCell(row, 3).value = '-'
    dashboard.getCell(row, 4).value = data.status

    for (let col = 1; col <= 4; col++) {
      const cell = dashboard.getCell(row, col)
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colors.lightGreen } }
      cell.alignment = { horizontal: 'center', vertical: 'center' }
      if (col === 2) cell.numFmt = '£#,##0.00'
      if (col === 1) cell.font = { bold: true }
    }
    dashboard.getRow(row).height = 18
  })

  dashboard.mergeCells('A21:E21')
  const checklistHeader = dashboard['A21']
  checklistHeader.value = 'Q1 ACTION CHECKLIST'
  checklistHeader.font = { bold: true, size: 12, color: { argb: 'FFFFFFFF' } }
  checklistHeader.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colors.purple } }
  dashboard.getRow(21).height = 20

  const checklist = ['☐ Register for MTD (by 6 Apr 2026)', '☐ Connect software to HMRC', '☐ Set up business bank feed', '☐ Log all income within 7 days', '☐ Photograph & store all receipts', '☐ Monthly records review (end of month)', '☐ Submit Q1 update by 7 Aug 2026']

  checklist.forEach((item, idx) => {
    const row = 22 + idx
    dashboard.mergeCells(`A${row}:E${row}`)
    const cell = dashboard.getCell(row, 1)
    cell.value = item
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colors.lightGray } }
    cell.alignment = { horizontal: 'left', vertical: 'center' }
    dashboard.getRow(row).height = 16
  })

  dashboard.mergeCells('A29:E30')
  const info = dashboard['A29']
  info.value = '💡 KEY INFO: First deadline is 7 August 2026 for Q1. Missing deadlines incurs 5% penalty. Update Record Keeper sheet with daily transactions.'
  info.font = { size: 10, italic: true, color: { argb: 'FF374151' } }
  info.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFF3CD' } }
  info.alignment = { horizontal: 'left', vertical: 'center', wrapText: true }
  dashboard.getRow(29).height = 24

  // RECORD KEEPER
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
  records.getRow(1).alignment = { horizontal: 'center', vertical: 'center' }
  records.getRow(1).height = 20

  records.addRow({ date: '01/05/2026', income: 500, category: 'Equipment', expense: 120.50, notes: 'Laptop purchase (business use)' })

  // QUARTERLY SUMMARY
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

  summary.getCell('B4').value = { formula: '=B2-B3' }
  summary.getCell('C4').value = { formula: '=C2-C3' }
  summary.getCell('D4').value = { formula: '=D2-D3' }
  summary.getCell('E4').value = { formula: '=E2-E3' }

  summary.eachRow((row, rowNumber) => {
    if (rowNumber > 1) {
      row.eachCell((cell, colNumber) => {
        if (colNumber > 1) {
          cell.alignment = { horizontal: 'right' }
          cell.numFmt = '£#,##0.00'
        }
        if (rowNumber === 4) {
          cell.font = { bold: true }
          cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFA7F3D0' } }
        } else {
          cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colors.lightGreen } }
        }
      })
    }
  })

  // SOFTWARE COMPARISON
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
      row.eachCell(cell => {
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF3E8FF' } }
        cell.alignment = { wrapText: true, vertical: 'top' }
      })
      software.getRow(rowNumber).height = 35
    }
  })

  // PENALTY GUIDE
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
      row.eachCell(cell => {
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFCF2F2' } }
        cell.alignment = { wrapText: true, vertical: 'center' }
      })
      penalties.getRow(rowNumber).height = 30
    }
  })

  return await workbook.xlsx.writeBuffer()
}

export async function GET(request) {
  try {
    const browser = await puppeteer.launch({ args: ['--no-sandbox'] })
    const page = await browser.newPage()
    
    const htmlContent = htmlTemplate(generatePDFContent())
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' })
    
    const pdfBuffer = await page.pdf({
      format: 'A4',
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
    })
    
    await browser.close()

    const excelBuffer = await generateExcel()

    const chunks = []
    const archive = archiver('zip', { zlib: { level: 9 } })
    
    archive.on('data', chunk => chunks.push(chunk))
    archive.append(excelBuffer, { name: 'MTD-Annual-Toolkit-2026.xlsx' })
    archive.append(pdfBuffer, { name: 'MTD-Preparation-Checklist.pdf' })
    
    await archive.finalize()
    
    const zipBuffer = Buffer.concat(chunks)

    return new Response(zipBuffer, {
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': 'attachment; filename="MTD-Annual-Toolkit-2026.zip"',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    })
  } catch (error) {
    console.error('Toolkit generation error:', error)
    return new Response(JSON.stringify({ error: error.message || 'Failed to generate toolkit' }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}
