import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { CreateUserInput }from '../inputs'
import User from "../../db/entities/User";

@Resolver()
export class UserResolver {
  @Query(() => [User])
  getUsers(): Promise<User[]> {
    return User.find();
  }

  @Query(() => User)
  getUser(@Arg("user_id",() => String) user_id: string): Promise<User | undefined> {
    return User.findOne({ where: {user_id: user_id}});
  }

  @Mutation(() => User)
  async createUser(@Arg("data") data: CreateUserInput) {
    const user = new User();
    user.user_id = data.user_id;
    user.user_name = data.user_name;
    user.user_email = data.email;
    user.access_token = data.access_token;
    user.refresh_token = data.refresh_token;
    await user.save()
    return user;
  }
}