import { useState } from 'react'
import { createNewBlog } from '../reducers/BlogReducer'
import { useDispatch, useSelector } from 'react-redux'
import { MyButton } from './MyButton'

export const NewBlogForm = ( ) => {
  const[newTitle, setNewTitle] = useState('')
  const[newAuthor, setNewAuthor] = useState('')
  const[newUrl, setNewUrl] = useState('')
  const user = useSelector(state => state.loggedUser)
  const dispatch = useDispatch()
  const handleCreateBlog =  (e) => {
    e.preventDefault()
    dispatch(createNewBlog(newTitle,newAuthor, newUrl, user.token))
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
      <MyButton onClick={handleCreateBlog}
        data-cy='create-blog-button'
        btnText={'create'}
      />
    </div>
  )
}