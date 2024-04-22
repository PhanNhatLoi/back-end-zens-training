import { ConflictException, Injectable } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
const saltOrRounds = 10;

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private UserModal: Model<User>) {}

  // register
  async register(createUserDto: CreateUserDto): Promise<User> {
    const checkEmailUnique = await this.UserModal.findOne({
      email: createUserDto.email,
    }).exec();
    if (checkEmailUnique) {
      throw new ConflictException('Email already exists');
    }
    try {
      const passwordHash = await bcrypt.hash(
        createUserDto.password,
        saltOrRounds,
      );
      const newUser = new this.UserModal({
        ...createUserDto,
        id: new Date(Date.now()).getTime().toString(),
        password: passwordHash,
      });

      const saveRes = await newUser.save();
      return saveRes.toObject({
        transform: (_, ret) => {
          delete ret.password;
          delete ret._id;
          delete ret.__v;
        },
      });
    } catch (error) {
      throw error;
    }
  }
}
