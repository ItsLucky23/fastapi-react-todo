export async function apiRequest({
  name,
  data,
  method
}: {
  name: string
  data?: Record<string, any>
  method: string
}) {
  let url = `http://localhost:8000/${name}`

  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json'
    }
  }

  if ((method === 'GET' || method === 'HEAD') && data && Object.keys(data).length > 0) {
    const params = new URLSearchParams()
    for (const [key, value] of Object.entries(data)) {
      params.append(key, String(value))
    }
    url += `?${params.toString()}`
  } else if (method !== 'GET' && method !== 'HEAD' && data) {
    options.body = JSON.stringify(data)
  }

  const response = await fetch(url, options)
  const json = await response.json()

  if (!response.ok) {
    console.error('API Error:', {
      status: response.status,
      statusText: response.statusText,
      url,
      method,
      data,
      responseBody: json
    })
  }

  return json
}