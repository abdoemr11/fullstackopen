import { useEffect } from 'react'
import { getAllUsers } from '../reducers/usersReducer'
import { useDispatch, useSelector } from 'react-redux'

export const Users = () => {
  const dispatch =useDispatch()
  const users = useSelector(state => state.users)
  useEffect(() => {
    dispatch(getAllUsers())
  },[])

  return(
    <div>
      <h1>Users</h1>
      <div style={{ display: 'flex',
        width: '30%',
        justifyContent: 'center'
      }}>
        Blog Created
      </div>
      {users.map(u => (
        <div
          style = {{ display: 'flex',
            width: '30%'
          }}
          key={u.id}>

          <span style = {{ flex: '1' }}>{u.name}</span>
          <span style={{ flex: '1' }}>{u.blogs.length}</span>
        </div>
      ))}
    </div>
  )
}