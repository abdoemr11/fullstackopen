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
export const ALL_GENRES = gql`
query AllGenres {
  allGenres
}
`
export const ALL_BOOKS = gql`

query AllBooks($author: String, $genre: String) {
  allBooks(author: $author, genre: $genre) {
    title
    published
    author {
      name
      id
      born
      bookCount
    }
    id
    genres
  }
}
  
`
export const ME = gql`
query Me {
  me {
    username
    favouriteGenre
    id
  }
}
`