import { ObjectID, Entity, Column, CreateDateColumn, UpdateDateColumn, ObjectIdColumn } from "typeorm";

@Entity("notifications")
class Notification {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  content: string;

  @Column({ name: "recipient_id", type: "uuid" })
  recipientId: string;

  @Column({ default: false })
  read: boolean;

  @CreateDateColumn({ name: "created_at" })
  createAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}

export default Notification;
