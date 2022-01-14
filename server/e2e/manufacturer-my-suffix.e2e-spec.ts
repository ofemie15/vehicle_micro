import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { ManufacturerDTO } from '../src/service/dto/manufacturer-my-suffix.dto';
import { ManufacturerService } from '../src/service/manufacturer-my-suffix.service';

describe('Manufacturer Controller', () => {
  let app: INestApplication;

  const authGuardMock = { canActivate: (): any => true };
  const rolesGuardMock = { canActivate: (): any => true };
  const entityMock: any = {
    id: 'entityId',
  };

  const serviceMock = {
    findById: (): any => entityMock,
    findAndCount: (): any => [entityMock, 0],
    save: (): any => entityMock,
    update: (): any => entityMock,
    deleteById: (): any => entityMock,
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideGuard(AuthGuard)
      .useValue(authGuardMock)
      .overrideGuard(RolesGuard)
      .useValue(rolesGuardMock)
      .overrideProvider(ManufacturerService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all manufacturers ', async () => {
    const getEntities: ManufacturerDTO[] = (await request(app.getHttpServer()).get('/api/manufacturers').expect(200)).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET manufacturers by id', async () => {
    const getEntity: ManufacturerDTO = (
      await request(app.getHttpServer())
        .get('/api/manufacturers/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create manufacturers', async () => {
    const createdEntity: ManufacturerDTO = (await request(app.getHttpServer()).post('/api/manufacturers').send(entityMock).expect(201))
      .body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update manufacturers', async () => {
    const updatedEntity: ManufacturerDTO = (await request(app.getHttpServer()).put('/api/manufacturers').send(entityMock).expect(201)).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/PUT update manufacturers from id', async () => {
    const updatedEntity: ManufacturerDTO = (
      await request(app.getHttpServer())
        .put('/api/manufacturers/' + entityMock.id)
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE manufacturers', async () => {
    const deletedEntity: ManufacturerDTO = (
      await request(app.getHttpServer())
        .delete('/api/manufacturers/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
