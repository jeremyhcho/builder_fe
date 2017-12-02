import globalAxios from 'axios'
import store from '../Config/Store'

// Actions
import { unauthorize } from 'Actions'

const axios = globalAxios.create()

axios.interceptors.response.use(undefined, error => {
  if (error.response.status === 401) {
    store.dispatch(unauthorize())
  }

  return Promise.reject(error)
})

export default axios
