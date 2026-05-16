export async function GET(request) {
  try {
    // Create simple test file
    const testContent = Buffer.from('This is test content for ZIP file', 'utf8')

    // Return as proper binary response
    return new Response(testContent, {
      status: 200,
      headers: {
        'Content-Type': 'application/octet-stream',
        'Content-Length': testContent.length.toString(),
        'Content-Disposition': 'attachment; filename="test-simple.bin"',
      },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}
