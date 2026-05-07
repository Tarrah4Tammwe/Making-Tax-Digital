'use client'

export default function AnswerPageLayout({ h1, children }) {
  return (
    <>
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-8 px-4 border-b-4 border-blue-500">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold">{h1}</h1>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <article className="prose prose-lg max-w-4xl mb-12">
          {children}
        </article>
      </div>
    </>
  )
}
