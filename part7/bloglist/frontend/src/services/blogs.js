import axios from 'axios'
const baseUrl = '/api/blogs'

let token
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
  }
  return (await axios.post(baseUrl,newBlog,configAuth)).data
}
const update = async (updatedBlog) => {
  const configAuth = {
    headers: { Authorization: token }
  }
  return (await axios.put(`${baseUrl}/${updatedBlog.id}`,updatedBlog,configAuth)).data

}
const remove = async (id) => {
  const configAuth = {
    headers: { Authorization: token }
  }
  return (await axios.delete(`${baseUrl}/${id}`,configAuth)).data
}
const addComment = async (id, comment) => {
  const configAuth = {
    headers: { Authorization: token }
  }
  return (await axios.post(`${baseUrl}/${id}/comment`,comment,configAuth)).data
}
export default { getAll, create, setToken, update,remove, addComment }