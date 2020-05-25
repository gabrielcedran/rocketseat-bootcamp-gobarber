import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Exclude, Expose } from "class-transformer";
import uploadConfig from "@config/upload";
import upload from "@config/upload";

@Entity("users")
class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  // Prevent this field from being serialized and sent in the HTTP response - needs to be used with classToClass
  @Exclude()
  password: string;

  @Column()
  avatar: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  // Allows change/configure new fields to be returned in the HTTP response - needs to be used with classToClass
  @Expose({ name: "avatarUrl" })
  getAvatarUrl(): string | null {
    if (!this.avatar) {
      return null;
    }
    switch (upload.driver) {
      case "disk":
        return `${process.env.APP_API_URL}/files/${this.avatar}`;
      default:
        return `https://${uploadConfig.s3.bucket}.s3.amazonaws.com/${this.avatar}`;
    }
  }
}

export default User;
