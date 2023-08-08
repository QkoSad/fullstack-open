const typeDefs = `
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  type Token {
    value: String!
  }
  type Author {
    name: String!
    born: Int
    id: ID!
    bookCount: Int!
  }
  type Book {
    title: String!
    published: Int
    id: ID!
    author: Author!
    genres: [String]
  }

  type Query {
    authorCount: Int!
    bookCount: Int!
    books(genre:String, author:String): [Book]!
    authors: [Author]!
    me: User
  }

  type Mutation {
    addBook(
    title: String!,
    author: String!, 
    published: Int!, 
    genres: [String!]!): Book!
    editAuthor(born: Int!,name: String!): Author!
    addAuthor(name: String!, born: Int): Author!
    createUser(username: String! favoriteGenre: String!): User
    login(username: String! password: String!): Token
  }

  type Subscription {
    bookAdded: Book!
  }

`;

module.exports = typeDefs;
