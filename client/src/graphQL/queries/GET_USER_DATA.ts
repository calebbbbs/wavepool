import {gql} from '@apollo/client'

const GET_USER_DATA = gql`
query Query($getUserUserId: String!) {
  getUser(user_id: $getUserUserId) {
    user_id
    user_name
    user_email
    access_token
    refresh_token
    friends {
      friend_id
      friend_name
      friend_status
    }
    recommendedTracks {
      user_id
      track_id
      friend_id
      spotify_uri
      artists
      album_id
      album_uri
    }
  }
}
`;

export default GET_USER_DATA;