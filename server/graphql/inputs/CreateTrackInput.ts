import { InputType, Field } from "type-graphql";

@InputType()
export class CreateTrackInput {
  @Field()
  track_id: string;

  @Field()
  spotify_uri: string;

  @Field()
  album_id: string;

  @Field()
  album_uri: string;
}