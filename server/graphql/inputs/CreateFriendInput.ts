import { InputType, Field } from "type-graphql";

@InputType()
export class CreateFriendInput {
  @Field()
  user_id: number;

  @Field()
  friend_id: string;

  @Field()
  friend_status: boolean;
}