import axios from 'axios'

const chatApi = axios.create({
  baseURL: 'http://localhost:3001',
  withCredentials: true,
})

export default chatApi