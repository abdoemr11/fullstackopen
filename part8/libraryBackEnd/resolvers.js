const { GraphQLError } = require('graphql');
const { v4: uuidv4 } = require('uuid');
const Book = require('./models/book');
const Author = require('./models/author');
const User = require('./models/user');
const jwt = require('jsonwebtoken');
const { PubSub } = require('graphql-subscriptions');
const pubsub = new PubSub()
const resolvers = {
  Query: {
    bookCount: async () => Book.countDocuments,
    authorCount: () => Author.countDocuments,
    allBooks: async (root, args) => {

      let queryFilter = {};
      let populateFilter = {
        path: 'author',
      };
      if (args.author) {
        populateFilter.match = { name: args.author };
      }
      if (args.genre) {
        queryFilter.genres = { $in: args.genre };
      }
      // console.log(queryFilter);
      let newBooks = await Book.find(queryFilter).populate(populateFilter);
      return newBooks.filter(b => b.author);
    },
    allAuthors: async () => {
      const allAuthors = await Author.find({});
      return allAuthors;
    },
    allGenres: async () => {
      const books = await Book.find({});
      const genres = [...new Set(books.flatMap(b => b.genres))];
      return genres;
    },
    me: async (root, args, contextValue) => {
      console.log(contextValue);
      const user = await User.findOne({ id: contextValue.currentUser.id });
      console.log('logged user', user);
      return user;
    }
  },
  Mutation: {
    addBook: async (root, args, contextValue) => {
      console.log('creating new book');
      if (!contextValue.currentUser) {
        throw new GraphQLError("You must provide user token", {
          extenstions: {
            code: 'BAD_AUTHENTICATION',
          }
        });
      }
      let author = await Author.findOne({ name: args.author });
      console.log("The Author is ", author);
      if (!author) {
        let authorData = {
          name: args.author,
          born: null
        };
        author = new Author({ ...authorData });
        await author.save();
        console.log("The Author is ", author);
      }

      const newBook = await new Book({
        ...args,
        author: author
      }
      );
      try {
        await newBook.save();

      } catch (e) {
        throw new GraphQLError("Can't save new book to The database", {
          extenstions: {
            code: 'BAD_USER_INPUT',
          }
        });
      }
      pubsub.publish('BOOK_ADDED', {bookAdded: newBook})
      return newBook;
    },
    editAuthor: async (root, args, contextValue) => {
      if (!contextValue.currentUser) {
        throw new GraphQLError("You must provide user token", {
          extenstions: {
            code: 'BAD_AUTHENTICATION',
          }
        });
      }
      if (!args.name)
        throw new GraphQLError("You should provide a valid author name", {
          extenstions: {
            code: 'BAD_USER_INPUT',
          }
        });
      let updatedAuthor = await Author.findOneAndUpdate({ name: args.name }, { born: args.setBornTo }, { new: true });


      return updatedAuthor;
    },
    createUser: async (root, args) => {
      const user = new User({ ...args });
      try {
        await user.save();
      } catch (e) {
        throw new GraphQLError(e, {
          extenstions: {
            code: 'BAD_USER_INPUT',
          }
        });
      }
      return user;
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password != 'secret') {
        throw new GraphQLError("The Password is incorrect", {
          extenstions: {
            code: 'BAD_AUTHENTICATION',
          }
        });
      }

      const userForToken = {
        username: user.username,
        id: user._id
      };
      return { value: jwt.sign(userForToken, process.env.JSON_SECRET) };




    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
    },
  },
  Author: {
    bookCount: async (root) => {
      // console.log(root._id);
      const allBooks = await Book.find({}).populate('author');
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
      const bookCount = allBooks.reduce((acc, cur) => {
        // console.log(cur.author.name, root.name);
        if (cur.author.name === root.name)
          return acc + 1;
        return acc;
      }, 0);
      // console.log(bookCount);
      return bookCount;
      // return  5
    }
  },
};
module.exports = resolvers
