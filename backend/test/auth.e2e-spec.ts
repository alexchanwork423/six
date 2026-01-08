import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Auth API (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  /**
   * POST /auth/signup
   */
  it('POST /auth/signup → should create a user', async () => {
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({
        name: 'Test User',
        email: 'testuser@example.com',
        password: 'password123',
      })
      .expect(201);
  });

  /**
   * POST /auth/login
   */
  it('POST /auth/login → should return JWT token', async () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'testuser@example.com',
        password: 'password123',
      })
      .expect(201)
      .expect(res => {
        expect(res.body).toHaveProperty('access_token');
      });
  });

  /**
   * POST /auth/login (wrong password)
   */
  it('POST /auth/login → should fail with wrong password', async () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'testuser@example.com',
        password: 'wrongpassword',
      })
      .expect(401);
  });

  /**
   * GET /auth/verify-email
   */
  it('GET /auth/verify-email → invalid token should fail', async () => {
    return request(app.getHttpServer())
      .get('/auth/verify-email')
      .query({ token: 'invalid-token' })
      .expect(400); // or 401 depending on your implementation
  });

  afterAll(async () => {
    await app.close();
  });
});
