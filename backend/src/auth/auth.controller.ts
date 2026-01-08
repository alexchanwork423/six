import { Controller, Res, Post, Body,Req,UseGuards, Get, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleAuthGuard } from './google-auth.guard';
import { ApiBody, ApiOperation ,ApiResponse} from '@nestjs/swagger';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() body: { name: string; email: string; password: string }) {
    return this.authService.signup(body.name, body.email, body.password);
  }

  @Get('verify-email')
  verifyEmail(@Query('token') token: string) {
    return this.authService.verifyEmail(token);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login with email and password' })
  @ApiBody({
  schema: {
    type: 'object',
    properties: {
      email: { type: 'string', example: 'user@example.com' },
      password: { type: 'string', example: 'strongPassword123' },
    },
    required: ['email', 'password'],
  },
    })
    @ApiResponse({ status: 201, description: 'Successfully logged in, returns JWT token' })
    @ApiResponse({ status: 401, description: 'Invalid credentials' })
    login(@Body() body: { email: string; password: string }) {
      return this.authService.login(body.email, body.password);
    }

  @Get('google')
    @UseGuards(GoogleAuthGuard)
    async googleLogin() {
      // Redirects to Google
    }

  @Get('google/callback')
    @UseGuards(GoogleAuthGuard)
    async googleCallback(@Req() req) {
      return this.authService.googleLogin(req.user);
    }
}
