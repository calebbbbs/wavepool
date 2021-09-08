import { InputType, Field } from "type-graphql";

@InputType()
export class TrackRespondedInput {
  @Field()
  user_id: string;

  @Field()
  track_id: string;
}