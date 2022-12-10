import { useMutation } from "@apollo/client"
import { useEffect, useState } from "react"
import { LOGIN } from "../services/mutations"

const Login = ({show, setToken, setPage}) => {
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('secret')
    const handleLoginForm = async(event)=> {
        event.preventDefault()
        console.log(username, password);

        login({variables:{username: username, password: password}})
        
    }
    const [login,  { data, loading, error }] = useMutation(LOGIN)
    useEffect(()=>{
        if(data) {
            console.log(data);
            const token = data.login.value
            setToken(token)
            localStorage.setItem('user-token', token)
            setPage('authors')
        }
    },[data])
    if(!show)
        return null
    return(
    <div>
        <form onSubmit={handleLoginForm}>
            <div>
            title
            <input
                value={username}
                onChange={({ target }) => setUserName(target.value)}
            />
            </div>
            <div>
            password
            <input
                value={password}
                onChange={({ target }) => setPassword(target.value)}
            />
            </div>
            <button type="submit">Login</button>
        </form>
    </div>
    )
}
export default Login