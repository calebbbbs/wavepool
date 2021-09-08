import {gql} from "@apollo/client"

const GET_RECOMMENDED_TRACKS = gql`
  query Query($getUserUserId: String!) {
    getUser(user_id: $getUserUserId) {
      recommendedTracks {
        user_id
        friend_name
        track_title
        track_uri
        artists
        album_art
        album_title
      }
    }
  }
`;

export default GET_RECOMMENDED_TRACKS