import {gql} from '@apollo/client'

const RECOMMEND_TRACK = gql`
mutation CreateRecommendedMutation($createRecommendedData: CreateRecommendedInput!) {
  createRecommended(data: $createRecommendedData) {
    user_id
    friend_id
    track_title
    artists
    track_uri
    album_title
    album_art
    user {
      user_id
    }
  }
}
`;

export default RECOMMEND_TRACK;