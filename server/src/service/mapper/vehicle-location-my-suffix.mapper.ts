import { VehicleLocationEntity } from '../../domain/vehicle-location-my-suffix.entity';
import { VehicleLocationDTO } from '../dto/vehicle-location-my-suffix.dto';

/**
 * A VehicleLocation mapper object.
 */
export class VehicleLocationMapper {
  static fromDTOtoEntity(entityDTO: VehicleLocationDTO): VehicleLocationEntity {
    if (!entityDTO) {
      return;
    }
    let entity = new VehicleLocationEntity();
    const fields = Object.getOwnPropertyNames(entityDTO);
    fields.forEach(field => {
      entity[field] = entityDTO[field];
    });
    return entity;
  }

  static fromEntityToDTO(entity: VehicleLocationEntity): VehicleLocationDTO {
    if (!entity) {
      return;
    }
    let entityDTO = new VehicleLocationDTO();

    const fields = Object.getOwnPropertyNames(entity);

    fields.forEach(field => {
      entityDTO[field] = entity[field];
    });

    return entityDTO;
  }
}
