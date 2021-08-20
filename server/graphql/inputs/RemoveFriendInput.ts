import { InputType, Field } from "type-graphql";

@InputType()
export class RemoveFriendInput {
  @Field()
  user_id: number;

  @Field()
  friend_id: string;
}