import { axios } from 'Apis'

export const apiCreatePickOfTheDay = (pickOfTheDay) => (
  axios.post('/api/v1/pick_of_the_days', { pickOfTheDay })
)

export const apiFetchPickOfTheDays = () => (
  axios.get('/api/v1/pick_of_the_days')
)

export const apiDeletePickOfTheDay = (id) => (
  axios.delete(`/api/v1/pick_of_the_days/${id}`)
)

export const apiUpdatePickOfTheDay = (id, pickOfTheDay) => (
  axios.put(`/api/v1/pick_of_the_days/${id}`, { pickOfTheDay })
)

export const apiFetchPickOfTheDay = (id) => (
  axios.get(`/api/v1/pick_of_the_days/${id}`)
)
