import { useQuery } from "@apollo/client"
import { useEffect, useState } from "react"
import { ALL_BOOKS, ME } from "../services/queries"

const Recommend = (props) => {
    const [favGenre, setFavGenre] = useState(null)
    const userResult = useQuery(ME)
    const booksResult = useQuery(ALL_BOOKS, {
        variables: {genre: favGenre}
    })
    useEffect(()=>{
        if(!userResult.loading)
            setFavGenre(userResult.data.me.favouriteGenre)

    }, [userResult])
    if (userResult.loading || booksResult.loading) {
        return <span>Looding ....!</span>
    }

    console.log(favGenre);
    const books = booksResult.data.allBooks
    console.log(books);
    if (!props.show) {
        return null
      }
    
    return (
        <div>
            <h1>Recommendation</h1>
            books in your favorite genre <b>{favGenre}</b>
            <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
        </div>
    )
}

export default Recommend