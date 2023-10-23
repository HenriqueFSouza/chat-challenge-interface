import axios from 'axios'

const chatApi = axios.create({
  baseURL: 'http://localhost:3333',
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