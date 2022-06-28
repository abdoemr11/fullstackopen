import { useState } from 'react'

export const NewBlogForm = ({ createNewBlog }) => {
  const[newTitle, setNewTitle] = useState('')
  const[newAuthor, setNewAuthor] = useState('')
  const[newUrl, setNewUrl] = useState('')
  const handleCreateBlog =  (e) => {
    e.preventDefault()
    createNewBlog(newTitle,newAuthor, newUrl)
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')

  }
  return (
    <div>
      <h2>Create New </h2>
            title:
      <input type="text"
        placeholder={'title'}
        onChange={({ target }) => setNewTitle(target.value)}

      />
      <br/>
            author:
      <input type="text"
        placeholder={'author'}

        onChange={({ target }) => setNewAuthor(target.value)}

      />
      <br/>
            url:
      <input type="text"
        placeholder={'url'}

        onChange={({ target }) => setNewUrl(target.value)}

      />
      <br/>
      <button onClick={handleCreateBlog}>create</button>
    </div>
  )
}