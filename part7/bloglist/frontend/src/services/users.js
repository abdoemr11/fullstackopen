import axios from 'axios'
const baseUrl = '/api/users'


const getAll = async () => {
  const request = axios.get(baseUrl)
  return (await request).data
}

export default { getAll }