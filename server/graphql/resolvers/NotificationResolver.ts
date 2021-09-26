import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { getConnection } from "typeorm";
import { CreateNotificationInput } from "../inputs/CreateNotificationInput";
import {RemoveNotificationInput} from "../inputs/RemoveNotificationInput";
import Notification from "../../db/entities/Notification";
import User from "../../db/entities/User";

@Resolver()
export class NotificationResolver {
  @Query(() => [Notification])
  getNotifications(): Promise<Notification[]> {
    return Notification.find();
  }

  @Mutation(() => Notification)
  async createNotification(@Arg("data") data: CreateNotificationInput) {
    const { user_id, friend_id, action, message, created_at, viewed } = data;
    const notification = new Notification();
    notification.user_id = user_id;
    notification.friend_id = friend_id;
    notification.action = action;
    notification.message = message;
    notification.created_at = created_at;
    notification.viewed = viewed;
    console.log(notification);
    await notification.save();

    await getConnection()
    .createQueryBuilder()
    .relation(User, "notifications")
    .of(friend_id)
    .add(notification);
    return notification;
  }

  @Mutation(() => Boolean)
  async removeNotification(@Arg("data") data: RemoveNotificationInput) {
    const { created_at, user_id } = data;
    const notification = await Notification.findOne({where: {created_at: created_at, user_id: user_id}});
    if(!notification) { return false }
    notification.viewed = true;
    notification.save();
    // await recommended.remove();
    return true;
  }
}