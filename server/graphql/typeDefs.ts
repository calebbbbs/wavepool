import { gql } from "apollo-server-express";

const typeDefs = gql`
type Query {
  getUsers: String[]
},
`;

export default typeDefs;
