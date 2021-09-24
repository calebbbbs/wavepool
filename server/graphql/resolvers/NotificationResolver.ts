import { Resolver, Query, Mutation, Arg } from "type-graphql";
// import { getConnection } from "typeorm";
import { CreateNotificationInput } from "../inputs/CreateNotificationInput";
import Notification from "../../db/entities/Notification";
// import User from "../../db/entities/User";

@Resolver()
export class NotificationResolver {
  @Query(() => [Notification])
  getNotifications(): Promise<Notification[]> {
    return Notification.find();
  }

  @Mutation(() => Notification)
  async createNotification(@Arg("data") data: CreateNotificationInput) {
    const { user_id, friend_id, action, message, created_at } = data;
    const notification = new Notification();
    notification.user_id = user_id;
    notification.friend_id = friend_id;
    notification.action = action;
    notification.message = message;
    notification.created_at = created_at;
    console.log(notification);
    await notification.save();
    return notification;
  }

  // @Query(() getNotificaion)
}