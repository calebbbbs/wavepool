import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import Friend from './Friend';
import User from './User';

@Entity()
@ObjectType()
export default class Notification extends BaseEntity {
  @Field(() => String)
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  @Field(() => ID)
  user_id: String;

  @Field(() => String)
  @Column()
  friend_id: string;

  @Field(() => String)
  @Column()
  friend_name: string;

  @Field(() => String)
  @Column()
  status: string;

  @Field(() => String)
  @Column()
  action: string;

  @Field(() => String)
  @Column()
  message: string;

  @Field(() => User)
  @ManyToOne(() => User, (user: User) => user.notif,
  {cascade: true})
  user!: Promise<User | undefined>;
}