const { gql } = require("@apollo/client");

const REGISTER_USER = gql`
  mutation RegisterUser(
    $firstName: String!
    $lastName: String!
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      firstName: $firstName
      lastName: $lastName
      username: $username
      email: $email
      password: $password
      confirmPassword: $confirmPassword
    )
  }
`;

const LOGIN_USER = gql`
  mutation LoginUser($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      accessToken
      user {
        id
        firstName
        lastName
        username
        email
        avatar
      }
    }
  }
`;

export { REGISTER_USER, LOGIN_USER };
