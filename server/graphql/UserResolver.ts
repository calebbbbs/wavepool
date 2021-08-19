// import { userInfo } from "os";
import { Resolver, Query } from "type-graphql";
import User from "../db/entities/User";
@Resolver()
export class UserResolver {
  @Query(() => [User])
  getUsers(): Promise<User[]> {
    return User.find();
  }
}