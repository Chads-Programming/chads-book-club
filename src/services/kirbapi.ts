const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export const kirbapi = {
  get: async (url: string) => {
    const response = await fetch(`${API_BASE_URL}/${url}`)
    return await response.json()
  },
  post: async (url: string, data: any) => {
    const response = await fetch(`${API_BASE_URL}/${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    return await response.json()
  },
  put: async (url: string, data: any) => {
    const response = await fetch(`${API_BASE_URL}/${url}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    return await response.json()
  },
  delete: async (url: string) => {
    const response = await fetch(`${API_BASE_URL}/${url}`, {
      method: "DELETE",
    })
    return await response.json()
  },
}
