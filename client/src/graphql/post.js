const { gql } = require("@apollo/client");

const LOAD_NEWSFEED = gql`
  query loadNewsfeed {
    loadNewsfeed {
      id
      image
      caption
      liked
      commentsCount
      likesCount
      author {
        username
        avatar
      }
    }
  }
`;

const LIKE_OR_UNLIKE_POST = gql`
  mutation LikeOrUnlikePost($postId: ID!) {
    likeorUnlikePost(postId: $postId) {
      id
      liked
      likesCount
    }
  }
`;

const ADD_COMMENT = gql`
  mutation AddComment($content: String!, $postId: ID!) {
    addComment(content: $content, postId: $postId) {
      id
      content
      author {
        username
      }
      post {
        id
        commentsCount
      }
    }
  }
`;

const CREATE_POST = gql`
  mutation CreatePost($caption: String!, $image: String!) {
    createPost(image: $image, caption: $caption) {
      id
      image
    }
  }
`;

export { LOAD_NEWSFEED, LIKE_OR_UNLIKE_POST, ADD_COMMENT, CREATE_POST };
