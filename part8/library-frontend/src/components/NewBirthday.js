import { useMutation } from "@apollo/client"
import { useState } from "react"
import { EDIT_AUTHOR } from "../services/mutations"

const NewBirthday = ({authors}) => {
  //initial value should be given
    const [authorName, setAuthorName] = useState(authors[0].name)
    const [born, setBorn] = useState('')

    const [addBook,  { data, loading, error }] = useMutation(EDIT_AUTHOR)

    const submitBirthday = (e) => {
      e.preventDefault()
      addBook({variables: {name: authorName, setBornTo: parseInt(born)}})
      //restore default 
      setBorn('')
      setAuthorName(authors[1].name)
    }
    return (
        <div>
        <h2>Set BirthDay</h2>
        <form onSubmit={submitBirthday}>
          {/* <div>
            name
            <input
              value={authorName}
              onChange={({ target }) => setAuthorName(target.value)}
            />
          </div> */}
          <div>
          <select value={authorName} onChange={({target})=> setAuthorName(target.value)}>
            {
              authors.map(author => 
                <option key={author.id} value={author.name}>{author.name}</option>
              )
            }
          </select>
          </div>
          <div>
            born
            <input
              value={born}
              onChange={({ target }) => setBorn(target.value)}
            />
          </div>
         
          <button type="submit">update author</button>
        </form>
      </div>
      )
}

export default NewBirthday