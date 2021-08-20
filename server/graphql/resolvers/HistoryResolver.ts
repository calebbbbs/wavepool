import { Resolver, Query, Mutation, Arg } from "type-graphql";
//import {CreateFriendInput}from '../inputs/CreateFriendInput'
import User from "../../db/entities/User";
@Resolver()
export class HistoryResolver {
  @Query(() => [User])
  getHistory(): Promise<User[]> {
    return User.find();
  }

  @Mutation(() => User)
  async createfriend(@Arg("data") data: CreateFriendInput) {
    const {user_id, friend_id } = data;


    
    // const user = new User();
    // user.user_id = data.user_id;
    // user.user_name = data.user_name;
    // console.log('im trying to add a user right now');
    // await user.save()
    // return user;
  }
}