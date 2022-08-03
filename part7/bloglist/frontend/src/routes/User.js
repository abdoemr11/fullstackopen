import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

export const User =() => {
  const users = useSelector(state => state.users)
  const params = useParams()
  const user = users.find(u => u.id === params.userId)
  console.log(user)
  if(user)
    return (
      <div>
        <h1>{user.name}</h1>
        <h3>added blogs</h3>
        <ul>
          {user.blogs.map(b =>
            <li key={b.id}>{b.title}</li>
          )}
        </ul>
      </div>
    )
  return (
    <div>There is no user with this id </div>
  )

}