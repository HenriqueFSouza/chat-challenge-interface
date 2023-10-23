import axios from 'axios'

const chatApi = axios.create({
  baseURL: 'https://chat-challenge-api-production.up.railway.app/',
})

chatApi.interceptors.request.use(async config => {
  const userData = localStorage.getItem('chatchallenge:userData')
  const id = JSON.parse(userData || '{}').id
  if (id) {
    config.params = { id }
  }
  return config
})
export default chatApi