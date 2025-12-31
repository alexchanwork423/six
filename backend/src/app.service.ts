import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  login(): boolean {
    return true;
  }
  Signup():boolean {
    return true;
  }
}
