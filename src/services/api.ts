import axios from 'axios'

const chatApi = axios.create({
  baseURL: 'https://chat-challenge-api.onrender.com',
  withCredentials: true,
})

export default chatApi