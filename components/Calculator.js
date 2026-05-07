'use client'
import { useState } from 'react'

export default function Calculator() {
  const [software, setSoftware] = useState('freeagent')
  const [hoursPerWeek, setHoursPerWeek] = useState(2)
  const [useAccountant, setUseAccountant] = useState(false)

  const softwareCosts = { wave: 0, freeagent: 100, xero: 360, quickbooks: 264 }
  const timeCost = hoursPerWeek * 52 * 20 * 0.25
  const accountantCost = useAccountant ? 500 : 0
  const totalCost = softwareCosts[software] + timeCost + accountantCost

  return (
    <div className="bg-slate-50 p-8 rounded-lg border-2 border-blue-200 max-w-2xl my-8">
      <h2 className="text-2xl font-bold mb-6">MTD Cost Calculator</h2>
      <div className="space-y-6">
        <div>
          <label className="block font-bold mb-2">Which software?</label>
          <select value={software} onChange={(e) => setSoftware(e.target.value)} className="w-full p-3 border border-slate-300 rounded text-slate-900">
            <option value="wave">Wave (Free)</option>
            <option value="freeagent">FreeAgent (£100/year)</option>
            <option value="xero">Xero (£360/year)</option>
            <option value="quickbooks">QuickBooks (£264/year)</option>
          </select>
        </div>
        <div>
          <label className="block font-bold mb-2">Hours per week on admin: <span className="text-blue-600">{hoursPerWeek}h</span></label>
          <input type="range" min="0" max="10" value={hoursPerWeek} onChange={(e) => setHoursPerWeek(Number(e.target.value))} className="w-full" />
        </div>
        <div>
          <label className="flex items-center">
            <input type="checkbox" checked={useAccountant} onChange={(e) => setUseAccountant(e.target.checked)} className="mr-3" />
            <span className="font-bold">Using an accountant (+£500/year)</span>
          </label>
        </div>
      </div>
      <div className="mt-8 bg-blue-600 text-white p-6 rounded-lg">
        <p className="text-sm mb-2">Your estimated annual MTD cost:</p>
        <p className="text-5xl font-bold">£{Math.round(totalCost)}</p>
        <p className="text-sm mt-2 opacity-80">Software: £{softwareCosts[software]} | Time: £{Math.round(timeCost)} | Support: £{accountantCost}</p>
      </div>
    </div>
  )
}
