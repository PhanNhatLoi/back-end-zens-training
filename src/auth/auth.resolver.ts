import { Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Query(() => [String])
  async getAllMovies(): Promise<String> {
    return '';
  }
}
