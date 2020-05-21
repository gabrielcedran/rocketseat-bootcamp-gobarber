import { Entity, PrimaryGeneratedColumn, Column, Generated, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity("user_tokens")
class UserToken {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  @Generated("uuid")
  token: string;

  @Column({ name: "user_id" })
  userId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export default UserToken;
