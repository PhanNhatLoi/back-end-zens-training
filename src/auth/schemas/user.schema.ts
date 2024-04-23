import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@ObjectType()
@Schema()
export class User {
  @Field()
  @Prop()
  id: string;

  @Field()
  @Prop({ required: true })
  email: string;

  @Field()
  @Prop({ required: true, unique: true })
  username: string;

  @Field()
  @Prop({ required: true })
  password?: string;

  @Field()
  @Prop()
  fullName: string;

  @Field()
  @Prop()
  address: string;

  @Field()
  @Prop()
  gender: string;

  @Field()
  @Prop()
  dob: string;

  @Field()
  @Prop()
  role: string;
}

@ObjectType()
export class AccessToken {
  @Field()
  access_token: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
