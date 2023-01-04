const gql = require('graphql-tag');
const { v4: uuidv4 } = require('uuid');

// console.log(gql);
const typeDefs = gql`#graphql
type Book {
    title: String!,
    published: Int!,
    author: Author,
    id: ID!,
    genres: [String]!
},
type Author {
    name: String!,
    id: ID!,
    born: Int, 
    bookCount: Int!
},
type User {
  username: String!
  favouriteGenre: String!
  id: ID!
}

type Token {
  value: String!
}
type Query {
    bookCount: Int!, 
    authorCount: Int!,
    allBooks(author: String, genre: String): [Book!]!, 
    allAuthors: [Author!]!
    me: User
    allGenres: [String!]!
  },
type Mutation {
    addBook(
        title: String!,
        author: String!,
        published: Int!,
        genres: [String!]!
      ): Book,
    editAuthor(
      name: String,
      setBornTo: Int!
    ): Author
    createUser(
      username: String!
      favouriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
},
type Subscription {
  bookAdded: Book
}
`;
module.exports = typeDefs
