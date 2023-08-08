const { GraphQLError } = require("graphql");
const { PubSub } = require("graphql-subscriptions");
const Author = require("./models/author");
const Book = require("./models/book");
const User = require("./models/user");

const pubsub = new PubSub();

const resolvers = {
  Query: {
    authorCount: (root, args) => Author.collection.countDocuments(),
    bookCount: (root, args) => Book.collection.countDocuments(),
    authors: async (root, args) => {
      return await Author.find({});
    },
    books: async (root, args) => {
      try {
        if (!args.genre && !args.author)
          return await Book.find({}).populate("author");
        if (args.author) {
          const author = await Author.findOne({ name: args.author });
          return await Book.find({ author: author._id }).populate("author");
        }
        return await Book.find({ genres: args.genre }).populate("author");
      } catch (error) {
        console.log(error);
        throw new GraphQLError("error quering books", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }
    },
    me: (root, args, context) => context.currentUser,
  },
  Mutation: {
    addBook: async (root, args, context) => {
      try {
        if (!context.currentUser) throw new GraphQLError("User not authorized");
        let author = await Author.findOne({ name: args.author });
        if (!author) {
          const newAuthor = new Author({ name: args.author });
          author = await newAuthor.save();
        }
        const book = new Book({ ...args, author: author._id });
        await book.save();
        pubsub.publish("BOOK_ADDED", { bookAdded: book });
        return await Book.findOne({ title: book.title }).populate("author");
      } catch (err) {
        console.log(err);
      }
    },
    addAuthor: async (root, args) => {
      const author = new Author({ ...args });
      try {
        return await author.save();
      } catch (err) {
        console.log(err);
      }
    },
    editAuthor: async (root, { name, born }, context) => {
      if (!context.currentUser) throw new GraphQLError("User not authorized");
      const author = await Author.findOne({ name });
      author.born = born;
      return await author.save();
    },
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      });
      return user.save();
    },
    login: async (root, { username, password }) => {
      const user = await User.findOne({ username });
      if (!user || password !== "secret") {
        throw new GraphQLError("wrong credentials", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }
      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    },
  },
  Author: {
    bookCount: async (root) => {
      return await Book.count({ author: root._id }).populate("author");
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator("BOOK_ADDED"),
    },
  },
};
module.exports = resolvers;
