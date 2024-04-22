import { ConflictException, Injectable } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private UserModal: Model<User>) {}

  // register
  async register(createUserDto: CreateUserDto): Promise<User> {
    const checkEmailUnique = this.UserModal.findOne({
      email: createUserDto.email,
    });
    if (checkEmailUnique) {
      throw new ConflictException('Email already exists');
    }
    const newUser = new this.UserModal({
      ...createUserDto,
      id: new Date(Date.now()).getTime().toString(),
    });

    return newUser.save();
  }
}
