import {gql} from '@apollo/client'

const TEST_QUERY = gql`
  query Query {
    hello
  }
`;

export default TEST_QUERY;