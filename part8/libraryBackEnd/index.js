const { ApolloServer} = require('@apollo/server')
const {GraphQLError} = require('graphql')
const gql = require('graphql-tag')
const { startStandaloneServer } =  require('@apollo/server/standalone');
const { v4: uuidv4 } = require('uuid');
const { mongo } = require('mongoose');
require('dotenv').config()
const mongoose = require('mongoose');
const Book = require('./models/book');
const Author = require('./models/author');
const User = require('./models/user')
const jwt = require('jsonwebtoken')

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
}
`
const resolvers = {
  Query: {
    bookCount: async() => Book.countDocuments,
    authorCount: () => Author.countDocuments,
    allBooks: async(root, args) => {
        
        let queryFilter = {}
        let populateFilter = {
          path: 'author',
          
        }
        if (args.author) {
          populateFilter.match = {name: args.author}
        }
        if (args.genre) {
          queryFilter.genres = {$in : args.genre}
        }
        // console.log(queryFilter);
        let newBooks = await Book.find(queryFilter).populate(populateFilter)
        return newBooks.filter(b=> b.author)
    }, 
    allAuthors: async() => {
      const  allAuthors = await Author.find({})
      return allAuthors
    },
    allGenres: async() => {
      const books = await Book.find({})
      const genres = [...new Set(books.flatMap(b => b.genres))]
      return genres
    },
    me: async(root, args, contextValue)=> {
      const user = await User.findOne({id: contextValue.currentUser.id})
      console.log('logged user',user);
      return user
    }
  

},
  Mutation: {
    addBook: async(root, args, contextValue) => {
      console.log('creating new book');
      if(!contextValue.currentUser) {
        throw new GraphQLError("You must provide user token", {extenstions: {
          code : 'BAD_AUTHENTICATION',
        }})
      }
      let author = await Author.findOne({name:args.author})
      console.log("The Author is ",author);
      if(!author) {
        let authorData = {
          name: args.author,
          born: null
        }
        author = new Author({...authorData})
        await author.save()
        console.log("The Author is ",author);
      }

      const newBook = await new Book({           
        ...args,
        author: author}
        )
        try {
          await newBook.save();

        } catch(e) {
          throw new GraphQLError("Can't save new book to The database", {extenstions: {
            code : 'BAD_USER_INPUT',
    
          }})
        }
      return newBook
    },
    editAuthor: async(root, args, contextValue) => {
      if(!contextValue.currentUser) {
        throw new GraphQLError("You must provide user token", {extenstions: {
          code : 'BAD_AUTHENTICATION',
        }})
      }
      if(!args.name)
      throw new GraphQLError("You should provide a valid author name", {extenstions: {
        code : 'BAD_USER_INPUT',

      }})
      let updatedAuthor = await Author.findOneAndUpdate({name : args.name}, {born: args.setBornTo}, {new: true})


      return updatedAuthor
    },
    createUser: async(root, args) => {
      const user = new User({...args})
      try {
        await user.save()
      } catch(e) {
        throw new GraphQLError(e, {extenstions: {
          code : 'BAD_USER_INPUT',
        }})
      }
    return user
    },
    login: async(root, args) => {
      const user = await User.findOne({username: args.username})

      if(!user || args.password != 'secret') {
        throw new GraphQLError("The Password is incorrect", {extenstions: {
          code : 'BAD_AUTHENTICATION',
        }})
      }

      const userForToken = {
        username: user.username, 
        id: user._id
      }
      return {value: jwt.sign(userForToken,process.env.JSON_SECRET)}




    }
  }, 
  Author: {
    bookCount: async(root) => {
      // console.log(root._id);
      const allBooks = await Book.find({}).populate('author')
      // const authorBooks = await Book.lookup({
      //   path: Author.collection.name, 
      //   query: {'name': root.name}
      // })
      // const authorBooks = Book.aggregate({
      //   "$lookup": {
      //     from: Author.collection.name, 
      //   }
      // })
      // console.log(root.name, ' ',authorBooks);
      const bookCount =  allBooks.reduce((acc, cur) => {
        // console.log(cur.author.name, root.name);
        if(cur.author.name === root.name)
          return acc + 1
        return acc
      }, 0)
      // console.log(bookCount);
      return bookCount
      // return  5
    } 
  },

  
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
 
})

startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({req, res})=>{
      const auth = req ? req.headers.authorization : null
      if (auth && auth.toLowerCase().startsWith('bearer ')) {
        // console.log(process.env.JSON_SECRET);
        let decodedToken
        try {
          decodedToken = jwt.verify(
            auth.substring(7), process.env.JSON_SECRET
          )
        } catch(e) {
          console.log(e);
        }

        const currentUser = await User.findById(decodedToken.id)
        return { currentUser }
      } else 
        console.log();

    }
  }).then(({url})=>{
    console.log(`🚀  Server ready at: ${url}`);

  });