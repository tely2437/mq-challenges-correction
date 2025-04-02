import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from './app.module'

describe('AppController', () => {
  let app: INestApplication

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  afterAll(async () => {
    await app.close()
  })

  describe('getData', () => {
    it('should return "Hello API"', async () => {
      const response = await request(app.getHttpServer()).get('/')
      expect(response.status).toBe(200)
      expect(response.body).toEqual({ message: 'Hello API' })
    })
  })
})
