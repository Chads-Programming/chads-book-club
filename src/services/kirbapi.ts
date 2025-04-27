const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

const options: RequestInit = {
  credentials: "include",
  headers: {
    "Content-Type": "application/json",
  },
}

export const kirbapi = {
  get: async <TResponse>(url: string): Promise<TResponse> => {
    const response = await fetch(`${API_BASE_URL}/api/${url}`)
    return await response.json()
  },
  post: async <TResponse>(url: string, data: any): Promise<TResponse> => {
    const response = await fetch(`${API_BASE_URL}/api/${url}`, {
      ...options,
      method: "POST",
      body: JSON.stringify(data),
    })
    return await response.json()
  },
  put: async <TResponse>(url: string, data: any): Promise<TResponse> => {
    const response = await fetch(`${API_BASE_URL}/api/${url}`, {
      ...options,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    return await response.json()
  },
  delete: async <TResponse>(url: string): Promise<TResponse> => {
    const response = await fetch(`${API_BASE_URL}/api/${url}`, {
      ...options,
      method: "DELETE",
    })
    return await response.json()
  },
}
