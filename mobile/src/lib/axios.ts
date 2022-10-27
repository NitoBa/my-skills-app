import axios from 'axios'

const baseURL = 'https://back.cryme.io/api/v1/open/'

const api = axios.create({
  baseURL,
})

export { api }
