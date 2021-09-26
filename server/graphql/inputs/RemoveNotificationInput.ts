import { InputType, Field } from 'type-graphql';

@InputType()
export class RemoveNotificationInput {
  @Field()
  created_at: string;

  @Field()
  user_id: string;
}