import { Resolver, Mutation, Arg } from "type-graphql";
import { getConnection } from "typeorm";
import {CreateFriendInput}from '../inputs/CreateFriendInput'
import Friend from "../../db/entities/Friend";
import User from '../../db/entities/User';
@Resolver()
export class FriendResolver {
  // @Query(() => [User])
  // getFriends(): Promise<User[]> {
  //   return User.find();
  // }

  @Mutation(() => Friend)
  async createFriend(@Arg("data") data: CreateFriendInput): Promise<Friend> {
  
    const {user_id, friend_id, friend_status } = data;
    
    const newFriend = new Friend();
    newFriend.user_id = user_id;
    newFriend.friend_id = friend_id;
    newFriend.friend_status = friend_status;
    await newFriend.save();
    
    await getConnection()
      .createQueryBuilder()
      .relation(User, "friends")
      .of(friend_id)
      .add(newFriend.user_id);

    
    return newFriend;
  }
}