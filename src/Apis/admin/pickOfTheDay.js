import { axios } from 'Apis'

export const apiCreatePickOfTheDay = (potd) => (
  axios.post('/api/v1/pick_of_the_days', { potd })
)

export const apiFetchPickOfTheDays = () => (
  axios.get('/api/v1/pick_of_the_days')
)

export const apiDeletePickOfTheDay = (id) => (
  axios.delete(`/api/v1/pick_of_the_days/${id}`)
)

export const apiUpdatePickOfTheDay = (id, potd) => (
  axios.put(`/api/v1/pick_of_the_days/${id}`, { potd })
)

export const apiFetchPickOfTheDay = (id) => (
  axios.get(`/api/v1/pick_of_the_days/${id}`)
)
