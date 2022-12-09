const { ApolloServer} = require('@apollo/server')
const gql = require('graphql-tag')
const { startStandaloneServer } =  require('@apollo/server/standalone');
const { v4: uuidv4 } = require('uuid');
const { mongo } = require('mongoose');
require('dotenv').config()
const mongoose = require('mongoose');
const Book = require('./models/book');
const Author = require('./models/author');
const author = require('./models/author');

mongoose.connect(process.env.MONGO_URL)
  .then(res => {
    console.log('connected to mongoose successfully');
  })
  .catch(e => {
    console.log(e);
  })
// console.log(gql);
let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  { 
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  { 
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },  
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]

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
}
type Query {
    bookCount: Int!, 
    authorCount: Int!,
    allBooks(author: String, genre: String): [Book!]!, 
    allAuthors: [Author!]!
  },
type Mutation {
    addBook(
        title: String!,
        author: String!,
        published: Int!,
        genres: [String!]!
      ): Book,
    editAuthor(
      name: String!,
      setBornTo: Int!
    ): Author
}
`
const resolvers = {
  Query: {
    bookCount: async() => Book.countDocuments,
    authorCount: () => Author.countDocuments,
    allBooks: async(root, args) => {
        let newBooks = await Book.find({})
        if (args.author)
            newBooks = newBooks.filter(b => b.author === args.author)
        if (args.genre) 
            newBooks =  newBooks.filter(b => b.genres.some(g => g === args.genre))
        return newBooks
    }, 
    allAuthors: async() => 
        //  authors.map( (author)=>{
        //     // let bookCount = 0
        //     // books.forEach(b =>{
        //     //     if (b.author == author.name)
        //     //     bookCount++
        //     // })
        //     // return {...author, bookCount}
          
          
        // })
         (await Author.find({}))
    
  }, 
  Mutation: {
    addBook: (root, args) => {
      console.log('creating new book');
        let authorName = args.author
        if(!authors.some(author => author.name === authorName)) {
            //Create new Author
            let newAuthor = {
                name: authorName,
                id: uuidv4(), 
                born: null
            }
            authors = authors.concat(newAuthor)
        }
        console.log('new id', uuidv4());
        const newBook = {
            ...args,
            id: uuidv4()
        }
        books = books.concat(newBook)
        return newBook
    },
    editAuthor: (root, args) => {
      let oldAuthor = authors.find(author => author.name === args.name)
      if(!oldAuthor)
        return null
      let updatedAuthor = {...oldAuthor, born: args.setBornTo}
      authors = authors.map(author => author.name === updatedAuthor.name? updatedAuthor: author)
      return updatedAuthor
    }
  }
  
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
    listen: { port: 4000 },
  }).then(({url})=>{
    console.log(`🚀  Server ready at: ${url}`);

  });