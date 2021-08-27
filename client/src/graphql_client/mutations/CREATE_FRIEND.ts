import {gql} from '@apollo/client'

const CREATE_FRIEND = gql`
mutation CreateFriendMutation($createFriendData: CreateFriendInput!) {
  createFriend(data: $createFriendData) {
    user_id
    friend_email
    friend_status
  }
}
`;

export default CREATE_FRIEND;