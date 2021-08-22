import { InputType, Field } from "type-graphql";

@InputType()
export class CreateRecommendedInput {
  @Field()
  user_id: string;

  @Field()
  friend_id: string;

  @Field()
  track_title: string;

  @Field()
  spotify_uri: string;

  @Field(() => [String])
  artists: string[];

  @Field()
  album_title: string;

  @Field()
  album_art: string;
}