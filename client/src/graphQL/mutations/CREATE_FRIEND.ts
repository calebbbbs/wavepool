import {gql} from '@apollo/client'

const CREATE_FRIEND = gql`
mutation CreateFriendMutation($createFriendData: CreateFriendInput!) {
  createFriend(data: $createFriendData) {
    user_id
    friend_email
  }
}
`;

export default CREATE_FRIEND;