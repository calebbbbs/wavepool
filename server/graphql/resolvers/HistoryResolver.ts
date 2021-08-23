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

  }
}