import { Resolver, Mutation, Arg } from "type-graphql";
import { getConnection } from "typeorm";
import { CreateFriendInput, ConfirmFriendInput, UpdateFriendshipInput } from '../inputs'
import { DenyFriendInput } from "../inputs/DenyFriendInput";
import Friend from "../../db/entities/Friend";
import User from '../../db/entities/User';
@Resolver()
export class FriendResolver {
  @Mutation(() => Friend)
  async createFriend(@Arg("data") data: CreateFriendInput): Promise<Friend> {
    const { user_id, friend_email, friend_status } = data;
    const friendData: any = await User.findOne({where: {user_email: friend_email}});
    const userData: any = await User.findOne({where: {user_id: user_id}});
    const friendship: any = await Friend.findOne({where: {user_id: user_id, friend_id: friendData.user_id}});
    const friendship2: any = await Friend.findOne({where: {user_id: friendData.user_id, friend_id: user_id}});
    if(friendship || friendship2){
      return friendship || friendship2
    }
    const newFriend = new Friend();

    newFriend.user_id = friendData.user_id;
    newFriend.friend_status = friend_status;
    newFriend.friend_name = userData.user_name;
    newFriend.friend_id = userData.user_id;
    // if(userData.photo){
    // newFriend.friend_photo = userData.photo;
    // } else {
    //   newFriend.friend_photo = "no photo"
    // }
    newFriend.friend_score = 0;
    newFriend.number_of_songs = 0;
    newFriend.number_of_likes = 0;
    await newFriend.save();

    await getConnection()
      .createQueryBuilder()
      .relation(User, "friends")
      .of(friendData.user_id)
      .add(newFriend);
    return friendData;
  }

  @Mutation(() => Friend)
  async ConfirmFriend(@Arg("data") data: ConfirmFriendInput): Promise<Friend | string> {

    const { user_id, friend_id } = data;
    const friendData = await User.findOne({where: {user_id: friend_id}});
    const userData = await User.findOne({where: {user_id: user_id}});
    const friendStatus = await Friend.findOne({where: {user_id: friend_id, friend_id: user_id}});

    if(userData && friendData && friendStatus) {
      friendStatus.friend_status = true;
      friendStatus.save();

      const newFriend = new Friend();
      newFriend.user_id = userData.user_id;
      newFriend.friend_status = true;
      newFriend.friend_name = friendData.user_name;
      newFriend.friend_id = friendData.user_id;
      newFriend.friend_score = 0;
      newFriend.number_of_songs = 0;
      newFriend.number_of_likes = 0;
      await newFriend.save();

      await getConnection()
        .createQueryBuilder()
        .relation(User, "friends")
        .of(userData.user_id)
        .add(newFriend);
        return newFriend;
    }
    return "Missing entities";
  }

  @Mutation(() => Friend)
  async DenyFriend(@Arg("data") data: DenyFriendInput): Promise<any | string> {
    const { user_id, friend_id } = data;
      await getConnection()
      .createQueryBuilder()
      .delete()
      .from(Friend)
      .where('user_id = :user_id AND friend_id = :friend_id', {user_id: friend_id, friend_id: user_id})
      .execute();
  }

  @Mutation(() => Boolean)
  async UpdateFriendship(@Arg("data") data: UpdateFriendshipInput) {
    const { user_id, friend_id, action } = data;
    const friendship = await Friend.findOne({where: {user_id: user_id, friend_id: friend_id}});
    if(friendship) {
      if(action === 'queue') {
        friendship.friend_score++;
      } else if(action === 'playlist') {
        friendship.friend_score += 5;
      } else if(action === 'like') {
        friendship.friend_score += 10;
        friendship.number_of_likes += 1;
      } else if(action === 'dislike') {
        friendship.friend_score -= 10;
      }
      await friendship.save();
      return true;
    }
    return false;
  }
}