export async function GET(request) {
  try {
    // Create simple test content
    const content1 = 'TEST FILE 1 CONTENT'
    const content2 = 'TEST FILE 2 CONTENT'

    // Manually create a ZIP file structure (simplest possible)
    // ZIP local file header + content + central directory
    
    const buf1 = Buffer.from(content1, 'utf8')
    const buf2 = Buffer.from(content2, 'utf8')

    // Local file header signature
    const signature = Buffer.from([0x50, 0x4B, 0x03, 0x04]) // PK..
    
    // Just return the raw buffers - NO archiver, no processing
    const responseBuffer = Buffer.concat([buf1, buf2])

    // Return response with explicit type
    const response = new Response(responseBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/octet-stream',
        'Content-Length': responseBuffer.length.toString(),
        'Content-Disposition': 'attachment; filename="test-output.zip"',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    })

    return response
  } catch (error) {
    console.error('Error:', error)
    return new Response(`Error: ${error.message}`, { 
      status: 500,
      headers: { 'Content-Type': 'text/plain' }
    })
  }
}
