import { InputType, Field } from 'type-graphql';

@InputType()
export class RemoveNotificationInput {
  @Field()
  timestampp: string;

  @Field()
  user_id: string;
}
