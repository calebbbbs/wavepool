import { gql } from "apollo-server-express";
// import { CreateUserInput } from "./CreateUserInput";
const typeDefs = gql`
type Query {
  getUsers: String[]
},
type Mutation {
  createUser(input: CreateUserInput): User
}
`;

export default typeDefs;
