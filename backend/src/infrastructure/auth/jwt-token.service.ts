import { JwtService } from '@nestjs/jwt';

export class JwtTokenService {
  constructor(private jwt: JwtService) {}

  createToken(userId: number, email: string) {
    return this.jwt.sign({ sub: userId, email });
  }
}
