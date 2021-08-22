import { InputType, Field } from "type-graphql";
@InputType()
export class ConfirmFriendInput {
  @Field()
  user_id: string;

  @Field()
  friend_id: string;
}