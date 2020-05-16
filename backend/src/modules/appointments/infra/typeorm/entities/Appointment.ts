import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";

import User from "@modules/users/infra/typeorm/entities/User";

@Entity("appointments")
class Appointment {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "provider_id" })
  providerId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "provider_id" })
  provider: User;

  @Column({ name: "date_time", type: "timestamp with time zone" })
  dateTime: Date;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  // To receive the entity attributes as parameter and use the class itself as base
  // but hide the attributes which should not be received, there is a javascript type
  // called Omit, which receives as content the type which will be be received and
  // the attributes that should be hidden
  /* constructor({ provider, dateTime }: Omit<Appointment, "id">) {
    this.id = uuid();
    this.provider = provider;
    this.dateTime = dateTime;
  } */
}

export default Appointment;
