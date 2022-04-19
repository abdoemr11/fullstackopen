import axios from "axios";
const baseUrl = 'http://localhost:3002/persons';

const getAll = ()=>{
    return axios
    .get(baseUrl)
    .then((response)=>{
        return response.data;
    })
}
const add = (newObject) => {
    return axios
      .post(baseUrl, newObject)
      .then(response=>response.data)
}
const remove = (id) => (  
    axios
        .delete(`${baseUrl}/${id}`)
        .then(response=>response.data)
)

export default {getAll, add, remove}