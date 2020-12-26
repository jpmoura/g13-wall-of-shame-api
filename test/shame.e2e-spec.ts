import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as faker from 'faker';
import AppModule from '@app/app.module';
import CreateShameDto from '@app/shame/dtos/create-shame.dto';
import ShameDto from '@app/shame/dtos/shame.dto';
import {
  createMongoDbObjectId,
  createRootMongooseTestModule,
  stopInstance as stopMongoInstance,
} from './utils/mongo.util';

describe('Shame Controller (e2e)', () => {
  let app: INestApplication;
  let defaultShame: ShameDto;

  function buildCreateShameDto(
    event: string,
    reason: string,
    date: Date,
  ): CreateShameDto {
    const dto = new CreateShameDto();
    dto.event = event;
    dto.reason = reason;
    dto.date = date;

    return dto;
  }

  function initializeDatabase(): void {
    const payload: CreateShameDto = buildCreateShameDto(
      faker.random.word(),
      faker.random.word(),
      faker.date.soon(),
    );

    request(app.getHttpServer())
      .post(`/shame`)
      .send(payload)
      .end((_, res) => {
        defaultShame = res.body as ShameDto;
      });
  }

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [createRootMongooseTestModule(), AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    initializeDatabase();
  });

  it('list all Shame should return HTTP Status 200', () => {
    return request(app.getHttpServer()).get('/shame').expect(200);
  });

  it('create a new Shame with empty event name then should return HTTP Status 400', () => {
    const payload: CreateShameDto = buildCreateShameDto(
      '',
      faker.random.words(),
      new Date(),
    );

    return request(app.getHttpServer())
      .post('/shame')
      .send(payload)
      .expect(400);
  });

  it('create a new Shame with invalid event name then should return HTTP Status 400', () => {
    const payload: CreateShameDto = buildCreateShameDto(
      faker.helpers.repeatString('a', 256),
      faker.random.word(),
      new Date(),
    );

    return request(app.getHttpServer())
      .post('/shame')
      .send(payload)
      .expect(400);
  });

  it('create a new Shame with empty reason then should return HTTP Status 400', () => {
    const payload: CreateShameDto = buildCreateShameDto(
      faker.random.word(),
      '',
      new Date(),
    );

    return request(app.getHttpServer())
      .post('/shame')
      .send(payload)
      .expect(400);
  });

  it('create a new Shame with invalid reason then should return HTTP Status 400', () => {
    const payload: CreateShameDto = buildCreateShameDto(
      faker.random.word(),
      faker.helpers.repeatString('a', 256),
      new Date(),
    );

    return request(app.getHttpServer())
      .post('/shame')
      .send(payload)
      .expect(400);
  });

  it('create a new Shame with empty event date then should return HTTP Status 400', () => {
    const payload: CreateShameDto = buildCreateShameDto(
      faker.random.word(),
      faker.helpers.repeatString('a', 256),
      null,
    );

    return request(app.getHttpServer())
      .post('/shame')
      .send(payload)
      .expect(400);
  });

  it('create a new Shame with invalid event date then should return HTTP Status 400', () => {
    return request(app.getHttpServer())
      .post('/shame')
      .send({
        event: faker.random.word(),
        reason: faker.random.word(),
        date: '20201225',
      })
      .expect(400);
  });

  it('create a new Shame with valid date then should return HTTP Status 201', () => {
    const payload: CreateShameDto = buildCreateShameDto(
      faker.random.word(),
      faker.random.word(),
      new Date(),
    );

    return request(app.getHttpServer())
      .post('/shame')
      .send(payload)
      .expect(201)
      .expect((res: request.Response) => {
        return !!res.header.Location;
      })
      .expect((res: request.Response) => {
        return res.body.event === payload.event;
      })
      .expect((res: request.Response) => {
        return res.body.reason === payload.reason;
      })
      .expect((res: request.Response) => {
        return res.body.date === payload.date.toISOString();
      })
      .expect((res: request.Response) => {
        return !!res.body.id;
      });
  });

  it('delete a Shame with empty ID then should return HTTP Status 404', () => {
    return request(app.getHttpServer()).delete('/shame/').expect(404);
  });

  it('delete a Shame with invalid MongoDB Object ID then should return HTTP Status 400', () => {
    return request(app.getHttpServer())
      .delete(`/shame/${faker.git.shortSha()}`)
      .expect(400);
  });

  it('delete a Shame with non-existent Object ID then should return HTTP Status 404', () => {
    return request(app.getHttpServer())
      .delete(`/shame/${createMongoDbObjectId()}`)
      .expect(404);
  });

  it('delete a existing Shame then should return HTTP Status 200 and Shame in body', () => {
    return request(app.getHttpServer())
      .delete(`/shame/${defaultShame.id}`)
      .expect(200, defaultShame);
  });

  afterAll(async () => {
    await stopMongoInstance();
  });
});
