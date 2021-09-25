import { Entity, Column, BaseEntity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
// import Friend from './Friend';
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
  action: string;

  @Field(() => String)
  @Column()
  message: string;

  @Field(() => String)
  @Column()
  created_at: string;

  @Field(() => Boolean)
  @Column({nullable: true})
  viewed: boolean;

  @Field(() => User)
  @ManyToOne(() => User, (user: User) => user.notifications,
  {cascade: true})
  user!: Promise<User | undefined>;
}