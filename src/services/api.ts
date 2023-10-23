import axios from 'axios'

const chatApi = axios.create({
  baseURL: 'https://chat-challenge-api.onrender.com',
  headers: {
    'Content-Type': 'application/json',
    "Accept": "application/json ",
    "Access-Control-Allow-Origin": "https://chat-challenge-api.onrender.com",
  },
  withCredentials: true,
})

export default chatApi