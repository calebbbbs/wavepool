import { InputType, Field } from 'type-graphql';

@InputType()
export class CreateNotificationInput {
  @Field()
  user_id: string;

  @Field()
  friend_id: string;

  @Field()
  action: string;

  @Field()
  message: string;

  @Field()
  timestampp: string;

  @Field()
  photo: string;

  @Field()
  viewed: boolean;
}
