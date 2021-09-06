import { InputType, Field } from "type-graphql";

@InputType()
export class UpdateRecommendedInput {
  @Field()
  user_id: string;

  @Field()
  track_title: string;
}