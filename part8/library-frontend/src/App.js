import { gql, useApolloClient, useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import Login from './components/Login'
import NewBook from './components/NewBook'
import Recommend from './components/Recommend'


const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()
  const handleLogut = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }
  useEffect(()=> {
    const retrievedToken = localStorage.getItem('user-token')
    if(retrievedToken)
      setToken(retrievedToken)
  },[])
  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {
          token
          ?<>
          <button onClick={() => setPage('add')}>add book</button>
          <button onClick={handleLogut}>Log out</button>
          <button onClick={() => setPage('recommend')}>recommendation</button>

          </>
          :<button onClick={() => setPage('login')}>Login</button>
          
        }

      </div>

      <Authors show={page === 'authors'} />

      <Books show={page === 'books'} />
      
      <NewBook show={page === 'add'} />
      <Login setToken={setToken} setPage={setPage}show={page === 'login'}/>
      <Recommend show={page==='recommend'}/>
    </div>
  )
}

export default App
