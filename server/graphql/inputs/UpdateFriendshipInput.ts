import { InputType, Field } from "type-graphql";

@InputType()
export class UpdateFriendshipInput {
  @Field()
  user_id: string;

  @Field()
  friend_id: string;

  @Field()
  action: string;
}