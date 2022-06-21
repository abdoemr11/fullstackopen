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
}
const update = async (updatedBlog) => {
  const configAuth = {
    headers: { Authorization: token }
  };
  return (await axios.put(`${baseUrl}/${updatedBlog.id}`,updatedBlog,configAuth)).data;

}
export default { getAll, create, setToken, update }