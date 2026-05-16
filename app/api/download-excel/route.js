// app/api/download-excel/route.js
export async function GET(request) {
  try {
    const ExcelJS = require('exceljs')
    
    const workbook = new ExcelJS.Workbook()
    
    // Sheet 1: Dashboard with Quarterly Countdown
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
      { category: 'Total Income', q1: '=SUM(Q1)', q2: '', q3: '', q4: '' },
      { category: 'Total Expenses', q1: '=SUM(Expenses)', q2: '', q3: '', q4: '' },
      { category: 'Net Profit', q1: '=B2-B3', q2: '', q3: '', q4: '' },
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
    
    // Generate buffer
    const buffer = await workbook.xlsx.writeBuffer()
    
    return new Response(buffer, {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': 'attachment; filename="MTD-Annual-Toolkit-2026.xlsx"',
      },
    })
  } catch (error) {
    console.error('Excel generation error:', error)
    return new Response(JSON.stringify({ error: 'Failed to generate Excel' }), { status: 500 })
  }
}
