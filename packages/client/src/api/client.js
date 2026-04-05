import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add JWT token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Handle auth errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export const authAPI = {
  login: (email, password) => apiClient.post('/auth/login', { email, password }),
  register: (data) => apiClient.post('/auth/register', data),
  refresh: () => apiClient.post('/auth/refresh'),
}

export const contractAPI = {
  list: () => apiClient.get('/contracts'),
  get: (id) => apiClient.get(`/contracts/${id}`),
  create: (data) => apiClient.post('/contracts', data),
  update: (id, data) => apiClient.put(`/contracts/${id}`, data),
  delete: (id) => apiClient.delete(`/contracts/${id}`),
}

export const guardAPI = {
  list: () => apiClient.get('/guards'),
  get: (id) => apiClient.get(`/guards/${id}`),
  create: (data) => apiClient.post('/guards', data),
  update: (id, data) => apiClient.put(`/guards/${id}`, data),
}

export default apiClient
