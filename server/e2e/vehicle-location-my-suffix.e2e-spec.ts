import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { VehicleLocationDTO } from '../src/service/dto/vehicle-location-my-suffix.dto';
import { VehicleLocationService } from '../src/service/vehicle-location-my-suffix.service';

describe('VehicleLocation Controller', () => {
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
      .overrideProvider(VehicleLocationService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all vehicle-locations ', async () => {
    const getEntities: VehicleLocationDTO[] = (await request(app.getHttpServer()).get('/api/vehicle-locations').expect(200)).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET vehicle-locations by id', async () => {
    const getEntity: VehicleLocationDTO = (
      await request(app.getHttpServer())
        .get('/api/vehicle-locations/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create vehicle-locations', async () => {
    const createdEntity: VehicleLocationDTO = (
      await request(app.getHttpServer()).post('/api/vehicle-locations').send(entityMock).expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update vehicle-locations', async () => {
    const updatedEntity: VehicleLocationDTO = (
      await request(app.getHttpServer()).put('/api/vehicle-locations').send(entityMock).expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/PUT update vehicle-locations from id', async () => {
    const updatedEntity: VehicleLocationDTO = (
      await request(app.getHttpServer())
        .put('/api/vehicle-locations/' + entityMock.id)
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE vehicle-locations', async () => {
    const deletedEntity: VehicleLocationDTO = (
      await request(app.getHttpServer())
        .delete('/api/vehicle-locations/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
