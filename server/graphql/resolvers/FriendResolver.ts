import { Resolver, Mutation, Arg } from "type-graphql";
import { getConnection } from "typeorm";
import { CreateFriendInput, ConfirmFriendInput } from '../inputs'
import Friend from "../../db/entities/Friend";
import User from '../../db/entities/User';
@Resolver()
export class FriendResolver {
  @Mutation(() => Friend)
  async createFriend(@Arg("data") data: CreateFriendInput): Promise<Friend> {
  
    const { user_id, friend_email, friend_status } = data;
    const friendData: any = await User.findOne({where: {user_email: friend_email}});
    const userData: any = await User.findOne({where: {user_id: user_id}});
    
    const newFriend = new Friend();
    newFriend.user_id = friendData.user_id;
    newFriend.friend_status = friend_status;
    newFriend.friend_name = userData.user_name;
    newFriend.friend_id = userData.user_id;
    await newFriend.save();
    
    await getConnection()
      .createQueryBuilder()
      .relation(User, "friends")
      .of(friendData.user_id)
      .add(newFriend);
    return newFriend;
  }

  @Mutation(() => Friend)
  async ConfirmFriend(@Arg("data") data: ConfirmFriendInput): Promise<Friend | string> {
  
    const { user_id, friend_id } = data;
    const friendData: any = await User.findOne({where: {user_id: friend_id}});
    const userData: any = await User.findOne({where: {user_id: user_id}});
    const friendStatus: any = await Friend.findOne({where: {user_id: friend_id, friend_id: user_id}});
    friendStatus.friend_status = true;
    friendStatus.save();

    const newFriend = new Friend();
    newFriend.user_id = userData.user_id;
    newFriend.friend_status = true;
    newFriend.friend_name = friendData.user_name;
    newFriend.friend_id = friendData.user_id;
    await newFriend.save();
    
    await getConnection()
      .createQueryBuilder()
      .relation(User, "friends")
      .of(userData.user_id)
      .add(newFriend);
    return newFriend;
  }
}