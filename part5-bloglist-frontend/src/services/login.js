import axios from 'axios'
const baseUrl = '/api/login'

const login = async (userCredential) => {
  const request = axios.post(baseUrl,userCredential)

  return (await request).data
}

export default { login }