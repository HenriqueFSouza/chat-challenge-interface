import axios from 'axios'

const chatApi = axios.create({
  baseURL: 'https://chat-challenge-api.onrender.com',
  headers: {
    'Content-Type': 'application/json',
    "Accept": "application/json ",
  },
  withCredentials: true,
})

export default chatApi