import { InputType, Field } from "type-graphql";

@InputType()
export class DeleteRecommendedInput {
  @Field()
  user_id: string;

  @Field()
  track_title: string;
}