import { EntityRepository, Repository } from 'typeorm';
import { ManufacturerEntity } from '../domain/manufacturer-my-suffix.entity';

@EntityRepository(ManufacturerEntity)
export class ManufacturerRepository extends Repository<ManufacturerEntity> {}
