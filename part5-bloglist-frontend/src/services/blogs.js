import axios from 'axios'
const baseUrl = '/api/blogs'

let token;
const setToken = (newToken) => {
  token = `bearer ${newToken}`
}
const getAll = async () => {
  const request = axios.get(baseUrl)
  return (await request).data
}
const create = async (newBlog) => {
  const configAuth = {
    headers: { Authorization: token }
  };
  console.log(configAuth)
  return (await axios.post(baseUrl,newBlog,configAuth)).data;
}

export default { getAll, create, setToken }