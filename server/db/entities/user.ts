/* eslint-disable camelcase */
import { Entity, PrimaryColumn, Column, ManyToMany, JoinTable, BaseEntity, getRepository } from 'typeorm';

@Entity()
export default class User extends BaseEntity {
  @PrimaryColumn('varchar', {unique: true})
  user_id: number;

  @Column()
  user_name: string;

  @ManyToMany(() => User, user => user.friends)
  @JoinTable()
  friends: User[];

  @ManyToMany(() => User, user => user.pending_friends)
  @JoinTable()
  pending_friends: User[];

  public static createUser(user_id: string, user_name: string) {
    const userRepo = getRepository(User);
    userRepo.save(userRepo.create({
      user_id, user_name
    }))
  }
}
