import { gql } from "@apollo/client";

export const ALL_AUTHORS = gql`
query AllAuthors {
  allAuthors {
    name
    id
    born
    bookCount
  }
}
`
export const ALL_BOOKS = gql`
query AllBooks {
    allBooks {
      title
      published
      author
      id
      genres
    }
  }
`