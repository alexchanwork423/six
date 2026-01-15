import { UserRepository } from '../../../domain/auth/user.repository';
import { PasswordService } from '../../../infrastructure/auth/password.service';
import { JwtTokenService } from '../../../infrastructure/auth/jwt-token.service';

export class LoginUseCase {
  constructor(
    private userRepo: UserRepository,
    private passwordService: PasswordService,
    private jwtService: JwtTokenService,
  ) {}

  async execute(email: string, password: string) {
    const user = await this.userRepo.findByEmail(email);
    if (!user || !user.verified)
      return { success: false, message: 'Invalid credentials' };

    const valid = await this.passwordService.compare(password, user.password);
    if (!valid)
      return { success: false, message: 'Invalid credentials' };

    return {
      success: true,
      token: this.jwtService.createToken(user.id, user.email),
      user: { id: user.id, name: user.name, email: user.email },
    };
  }
}
