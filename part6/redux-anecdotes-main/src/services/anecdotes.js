import axios from "axios";

const baseUrl = 'http://localhost:3001/anecdotes';
const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}
const getAll = async () => {
  console.log('why not working')
  const result = await axios.get('http://localhost:3001/anecdotes')
  // console.log(result)
  return result.data
}
const createNew = async (content) => {
  const newAnec = {content, id: getId(), votes: 0}
  const result = await axios.post(`${baseUrl}`,newAnec )
  return result.data
}
const update = async (anecdote) => {
  console.log('updating')
  const result = await axios.put(`${baseUrl}/${anecdote.id}`, anecdote)
  console.log(result.data)
  return result.data
}
export default {getAll, createNew, update}