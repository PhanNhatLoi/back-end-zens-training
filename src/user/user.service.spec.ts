import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { configDotenv } from 'dotenv';
import { MongodbModule } from '../mongodb/mongodb.module';
configDotenv();

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MongodbModule],
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
