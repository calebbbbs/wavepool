import { InputType, Field } from "type-graphql";

@InputType()
export class CreateRecommendedInput {
  @Field()
  user_id: string;

  @Field()
  track_id: string;

  @Field()
  friend_id: string;
}