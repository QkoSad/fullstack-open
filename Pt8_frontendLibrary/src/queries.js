import { gql } from "@apollo/client";

export const ALL_BOOKS = gql`
  query {
    books {
      title
      published
      id
      genres
      author {
        bookCount
        born
        id
        name
      }
    }
  }
`;
export const ALL_AUTHORS = gql`
  query {
    authors {
      name
      id
      born
      bookCount
    }
  }
`;
export const ADD_BOOK = gql`
  mutation Mutation(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      author {
        bookCount
        born
        id
        name
      }
      genres
      id
      published
      title
    }
  }
`;
export const ADD_BIRTHYEAR = gql`
  mutation Mutation($birthyear: Int!, $name: String!) {
    editAuthor(birthyear: $birthyear, name: $name) {
      bookCount
      id
      born
      name
    }
  }
`;
export const LOGIN = gql`
  mutation Mutation($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;
export const ME = gql`
  query ExampleQuery {
    me {
      favoriteGenre
      id
      username
    }
  }
`;
export const BOOKS_BY_GENRE = gql`
  query Query($genre: String) {
    books(genre: $genre) {
      author {
        name
      }
      genres
      id
      published
      title
    }
  }
`;

export const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    published
    id
    genres
    author {
      name
      id
      born
      bookCount
    }
  }
`;

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      title
    }
  }
  ${BOOK_DETAILS}
`;
