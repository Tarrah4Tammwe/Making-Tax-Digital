export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-12 mt-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold mb-4 text-blue-400">Core</h3>
            <ul className="space-y-2 text-slate-300 text-sm">
              <li><a href="/what-is-mtd" className="hover:text-white">What is MTD?</a></li>
              <li><a href="/do-i-comply" className="hover:text-white">Do I Comply?</a></li>
              <li><a href="/which-software" className="hover:text-white">Software</a></li>
              <li><a href="/how-much-cost" className="hover:text-white">Cost</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4 text-blue-400">Details</h3>
            <ul className="space-y-2 text-slate-300 text-sm">
              <li><a href="/deadlines-2026" className="hover:text-white">Deadlines</a></li>
              <li><a href="/what-records" className="hover:text-white">Records</a></li>
              <li><a href="/vat-records" className="hover:text-white">VAT</a></li>
              <li><a href="/mtd-penalties" className="hover:text-white">Penalties</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4 text-blue-400">Types</h3>
            <ul className="space-y-2 text-slate-300 text-sm">
              <li><a href="/partnership-mtd" className="hover:text-white">Partnerships</a></li>
              <li><a href="/director-mtd" className="hover:text-white">Directors</a></li>
              <li><a href="/limited-company-mtd" className="hover:text-white">Companies</a></li>
              <li><a href="/employee-records" className="hover:text-white">Employees</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4 text-blue-400">More</h3>
            <ul className="space-y-2 text-slate-300 text-sm">
              <li><a href="/voluntary-mtd" className="hover:text-white">Voluntary</a></li>
              <li><a href="/mtd-amendments" className="hover:text-white">Amendments</a></li>
              <li><a href="/calculator" className="hover:text-white">Calculator</a></li>
              <li><a href="/premium-checklist" className="hover:text-white">Premium</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-700 pt-8 text-center text-slate-400 text-sm">
          <p>Making Tax Digital Explained © 2026. Not affiliated with HMRC.</p>
          <p className="mt-2">Information accurate May 2026. Verify with official HMRC guidance.</p>
          <div className="mt-4 flex justify-center gap-6">
            <a href="/privacy" className="hover:text-white">Privacy Policy</a>
            <a href="/contact" className="hover:text-white">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
