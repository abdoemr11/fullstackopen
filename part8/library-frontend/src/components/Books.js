import { useQuery } from "@apollo/client"
import { useEffect, useState } from "react"
import { ALL_BOOKS, ALL_GENRES } from "../services/queries"

const Books = (props) => {
  const [choosenGenre, setChoosenGenre] = useState('allGenres')
  const resultBooks = useQuery(ALL_BOOKS, {
    pollInterval: 2000,
    variables: {genre: choosenGenre}
  })
  const genresResult = useQuery(ALL_GENRES)
  // console.log(result);
  // useEffect
  if (resultBooks.loading || genresResult.loading) {
    return <span>Looding ....!</span>
  }
  const books = resultBooks.data.allBooks
  const genres = genresResult.data.allGenres
  const handleFilterBooks = (e) => {
    setChoosenGenre(e.target.id)
    console.log(e.target.id);

  }
  console.log(genres);
  if (!props.show) {
    return null
  }



  return (
    <div>
      <h2>books</h2>

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
      <div >
        {genres.map((g) => (
          <button key={g} id={g} onClick={handleFilterBooks}> {g}</button>
        ))}
        <button id={null} onClick={handleFilterBooks}>all Genres</button>
      </div>
    </div>
  )
}

export default Books
