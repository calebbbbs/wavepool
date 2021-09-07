import { InputType, Field } from "type-graphql";

@InputType()
export class RecommendedGenreInput {
  @Field()
  genre: string;

  @Field()
  user_id: string;

  @Field()
  friend_id: string;
}