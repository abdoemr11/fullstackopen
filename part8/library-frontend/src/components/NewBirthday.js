import { useMutation } from "@apollo/client"
import { useState } from "react"
import { EDIT_AUTHOR } from "../services/mutations"

const NewBirthday = () => {
    const [authorName, setAuthorName] = useState('')
    const [born, setBorn] = useState('')

    const [addBook,  { data, loading, error }] = useMutation(EDIT_AUTHOR)

    const submitBirthday = (e) => {
      e.preventDefault()
      addBook({variables: {name: authorName, setBornTo: parseInt(born)}})
      //restore default 
      setBorn('')
      setAuthorName('')
    }
    return (
        <div>
        <h2>Set BirthDay</h2>
        <form onSubmit={submitBirthday}>
          <div>
            name
            <input
              value={authorName}
              onChange={({ target }) => setAuthorName(target.value)}
            />
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