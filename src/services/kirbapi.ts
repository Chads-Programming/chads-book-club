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
    const res = await response.json()
    if (!response.ok && res?.message) throw new Error(res.message)
    return res
  },
  post: async <TResponse>(url: string, data: any): Promise<TResponse> => {
    const response = await fetch(`${API_BASE_URL}/api/${url}`, {
      ...options,
      method: "POST",
      body: JSON.stringify(data),
    })
    const res = await response.json()
    if (!response.ok && res?.message) throw new Error(res.message)
    return res
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
    const res = await response.json()
    if (!response.ok && res?.message) throw new Error(res.message)
    return res
  },
  patch: async <TResponse>(url: string, data: any): Promise<TResponse> => {
    const response = await fetch(`${API_BASE_URL}/api/${url}`, {
      ...options,
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    const res = await response.json()
    if (!response.ok && res?.message) throw new Error(res.message)
    return res
  },
  delete: async <TResponse>(url: string): Promise<TResponse> => {
    const response = await fetch(`${API_BASE_URL}/api/${url}`, {
      ...options,
      method: "DELETE",
    })
    const res = await response.json()
    if (!response.ok && res?.message) throw new Error(res.message)
    return res
  },
}
