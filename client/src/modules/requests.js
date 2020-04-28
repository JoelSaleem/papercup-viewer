import axios from 'axios'

// Axios function wrappers

export const get = (path) => {
  return axios.get(path)
}

export const post = (path, data, queryParams) => {
  const opts = { params: queryParams }
  return axios.post(path, data, opts)
}
