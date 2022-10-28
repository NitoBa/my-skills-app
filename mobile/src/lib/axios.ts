import axios from 'axios'

const baseURL = 'http://192.168.3.72:3333/'

const api = axios.create({
  baseURL,
})

export { api }
