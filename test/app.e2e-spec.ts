import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let userId;
  let token;
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/products (GET)', async () => {
    const req = await request(app.getHttpServer()).get('/products');
    expect(req.status).toBe(200);
    expect(req.body).toBeInstanceOf(Array);
  });
  //borrar este user para probar
  it('/auth/singup (POST)', async () => {
    const sending = {
      "email": "tests@gmail.com",
      "name": "tests",
      "password": "Admin!123",
      "confirmPassword": "Admin!123",
      "phone": 6666667,
      "city": "tests",
      "country": "tests",
      "address": "tests"
    }
    const req = await request(app.getHttpServer()).post('/auth/singup').send(sending);
    expect(req.status).toBe(201);
    expect(req.body).toBeInstanceOf(Object);
    userId = req.body.id;
  });
  //login admin
  it('/auth/singin (POST)',async ()=>{
    //credenciales de admin
    const sending = {
      "email": "colo@gmail.com",
      "password": "Admin!123"
    }
    const req = await request(app.getHttpServer()).post('/auth/singin').send(sending);
    expect(req.status).toBe(201);
    expect(req.body).toBeInstanceOf(Object);
    expect(req.body.message).toBe('Usuario logeado');
    token =  req.body.token;
  });
  it('/users (GET)',async ()=>{
    const req = await request(app.getHttpServer())
    .get('/users')
    .set('Authorization', `Bearer ${token}`);
    expect(req.status).toBe(200);
    expect(req.body).toBeInstanceOf(Array);
  });
  it('/users/:id (GET)',async ()=>{
    const req = (await request(app.getHttpServer())
    .get(`/users/${userId}`)
    .set('Authorization', `Bearer ${token}`));
    expect(req.status).toBe(200);
    expect(req.body).toBeInstanceOf(Object);
  });
});
