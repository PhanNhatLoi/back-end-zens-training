import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  id: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  fullName: string;

  @Prop()
  address: string;

  @Prop()
  gender: string;

  @Prop()
  dob: string;

  @Prop()
  role: string;

  @Prop()
  refreshToken: string;

  @Prop()
  otpCode: string;

  @Prop()
  otpExr: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
