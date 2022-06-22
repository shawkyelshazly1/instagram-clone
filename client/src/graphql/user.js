const { gql } = require("@apollo/client");

const CURRENT_USER = gql`
  query CurrentUser {
    currentUser {
      id
      firstName
      lastName
      username
      email
      avatar
    }
  }
`;

export { CURRENT_USER };
