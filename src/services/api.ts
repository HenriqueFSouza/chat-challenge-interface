import axios from 'axios'

const chatApi = axios.create({
  baseURL: 'https://chat-challenge-api.onrender.com/',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json ',
    'Access-Control-Allow-Origin': 'https://chat-challenge-api.onrender.com/',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Headers': 'Content-Type, X-Requested-With',
  },
  withCredentials: true,
})

export default chatApi