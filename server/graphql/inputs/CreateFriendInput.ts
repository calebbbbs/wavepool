import { InputType, Field } from "type-graphql";

@InputType()
export class CreateFriendInput {
  @Field()
  user_id: string;

  @Field()
  friend_id: string;

  @Field()
  friend_status: boolean;
}