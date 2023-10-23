import axios from 'axios'

const chatApi = axios.create({
  baseURL: 'mongodb://mongo:jMt56w8Jp5OGrMFGQD30@containers-us-west-206.railway.app:7707',
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