// import { userInfo } from "os";
import { Resolver, Query } from "type-graphql";
import User from "../db/entities/User";
@Resolver()
export class BookResolver {
  @Query(() => [String])
  hello() {
    return User.find();
  }
}