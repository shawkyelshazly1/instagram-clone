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

const LOAD_USER_PROFILE = gql`
  query loadUserProfile($username: String!) {
    loadUserProfile(username: $username) {
      id
      firstName
      lastName
      username
      avatar
      followersCount
      followingsCount
      followed
      posts {
        id
        image
      }
    }
  }
`;

const FOLLOW_OR_UNFOLLOW_USER = gql`
  mutation FollowOrUnfollowUser($username: String!) {
    followOrUnfollowUser(username: $username) {
      id
      followersCount
      followingsCount
      followed
    }
  }
`;

export { CURRENT_USER, LOAD_USER_PROFILE, FOLLOW_OR_UNFOLLOW_USER };
