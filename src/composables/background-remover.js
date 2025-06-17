const API_KEY = '//API_KEY_HERE'

export async function removeBackground(file) {
  const formData = new FormData()
  formData.append('image_file', file)
  formData.append('size', 'auto')

  const res = await fetch('https://api.remove.bg/v1.0/removebg', {
    method: 'POST',
    headers: {
      'X-Api-Key': API_KEY
    },
    body: formData
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(err)
  }

  const blob = await res.blob()
  return URL.createObjectURL(blob)
}
