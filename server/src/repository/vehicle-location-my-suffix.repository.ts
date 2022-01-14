import { EntityRepository, Repository } from 'typeorm';
import { VehicleLocationEntity } from '../domain/vehicle-location-my-suffix.entity';

@EntityRepository(VehicleLocationEntity)
export class VehicleLocationRepository extends Repository<VehicleLocationEntity> {}
