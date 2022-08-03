import {  useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export const Users = () => {
  const users = useSelector(state => state.users)


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

          <Link
            to={u.id}
            style = {{ flex: '1' }}
          >{u.name}</Link>
          <span style={{ flex: '1' }}>{u.blogs.length}</span>
        </div>
      ))}
    </div>
  )
}