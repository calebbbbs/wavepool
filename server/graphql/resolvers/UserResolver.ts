// import { userInfo } from "os";
import { Resolver, Query, Mutation, Arg } from "type-graphql";
import {CreateUserInput}from '../inputs/CreateUserInput'
import User from "../../db/entities/User";
@Resolver()
export class UserResolver {
  @Query(() => [User])
  getUsers(): Promise<User[]> {
    return User.find();
  }
  @Mutation(() => User)
  async createUser(@Arg("data") data: CreateUserInput) {
    const user = new User();
    user.user_id = data.user_id;
    user.user_name = data.user_name;
    console.log('im trying to add a user right now');
    await user.save()
    return user;
  }
}