import { gql } from "@apollo/client";

const GET_FRIENDS = gql`
  query Query($getUserUserId: String!) {
    getUser(user_id: $getUserUserId) {
      friends {
        friend_id
        friend_name
        friend_status
      }
    }
  }
`;

export default GET_FRIENDS