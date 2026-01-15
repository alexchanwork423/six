import { Body, Controller, Post } from "@nestjs/common";
import { LoginUseCase } from "src/application/auth/use-cases/login.usecase";
import { SignupUseCase } from "src/application/auth/use-cases/signup.usecase";

@Controller('auth')
export class AuthController {
  constructor(
    private signupUseCase: SignupUseCase,
    private loginUseCase: LoginUseCase,
  ) {}

  @Post('signup')
  signup(@Body() body) {
    return this.signupUseCase.execute(
      body.name,
      body.email,
      body.password,
    );
  }

  @Post('login')
  login(@Body() body) {
    return this.loginUseCase.execute(body.email, body.password);
  }
}
