import archiver from 'archiver'

export async function GET(request) {
  try {
    // Create two simple text buffers for testing
    const file1 = Buffer.from('TEST FILE 1: This is a test', 'utf8')
    const file2 = Buffer.from('TEST FILE 2: This is another test', 'utf8')

    const chunks = []
    const archive = archiver('zip', { zlib: { level: 9 } })
    
    archive.on('data', chunk => chunks.push(chunk))
    archive.on('error', err => { throw err })
    
    archive.append(file1, { name: 'test1.txt' })
    archive.append(file2, { name: 'test2.txt' })
    
    await archive.finalize()
    
    const zipBuffer = Buffer.concat(chunks)

    return new Response(zipBuffer, {
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': 'attachment; filename="test-minimal.zip"',
      },
    })
  } catch (error) {
    console.error('Error:', error)
    return new Response(`Error: ${error.message}`, { status: 500 })
  }
}
