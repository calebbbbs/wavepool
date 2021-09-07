import {gql} from '@apollo/client'

const GET_USER_DATA = gql`
query Query($getUserUserId: String!) {
  getUser(user_id: $getUserUserId) {
    user_id
    user_name
    user_email
    friends {
      user_id
      id
      friend_id
      friend_name
      friend_status
    }
    recommendedTracks {
      id
      user_id
      friend_id
      friend_name
      track_title
      track_uri
      artists
      album_title
      album_art
    }
  }
}
`;

export default GET_USER_DATA;