import { useQuery } from "@apollo/client";
import { ALL_AUTHORS } from "../services/queries";
import NewBirthday from "./NewBirthday";

const Authors = ({show}) => {
  const result = useQuery(ALL_AUTHORS, {
    pollInterval: 2000,
  })
  if (result.loading) {
    return <span>Looding ....!</span>
  }
  let authors = result.data.allAuthors
  
  console.log(authors);
  if (!show) {
    return null
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <NewBirthday/>
    </div>
  )
}

export default Authors
