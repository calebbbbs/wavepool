import {gql} from '@apollo/client'

const TEST_QUERY = gql`
  query Query {
    getUsers {
        user_id
        user_name
    }
  }
`;

export default TEST_QUERY;