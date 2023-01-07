import {  useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Avatar from 'boring-avatars'
// import Avatar from 'boring-avatars'
export const Users = () => {
  const users = useSelector(state => state.users)


  return(
    <div className='container border-2 border-mainBlue mx-4 p-8'  >
      <div style={{ display: 'flex',
        width: '30%',
        justifyContent: 'center'
      }}>
      </div>
      {users.map(u => (
        <div
          className=' flex border border-mainBlue m-4 p-4'
          key={u.id}>

          <Link className='flex w-1/3 gap-2'
            to={u.id}

          >
            <Avatar name={u.name}
              variant="beam"
            />
            {u.name}
          </Link>
          <span style={{ flex: '1' }}>{u.blogs.length}</span>
        </div>
      ))}
    </div>
  )
}