import { InputType, Field } from "type-graphql";

@InputType()
export class CreateUserInput {
  @Field()
  user_id: number;

  @Field()
  user_name: string;

  @Field()
  access_token: string;

  @Field()
  refresh_token: string;
}