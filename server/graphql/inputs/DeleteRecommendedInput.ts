import { InputType, Field } from "type-graphql";

@InputType()
export class RemoveRecommendedInput {
  @Field()
  user_id: string;

  @Field()
  track_title: string;
}