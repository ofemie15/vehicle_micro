import { VehicleTypeEntity } from '../../domain/vehicle-type-my-suffix.entity';
import { VehicleTypeDTO } from '../dto/vehicle-type-my-suffix.dto';

/**
 * A VehicleType mapper object.
 */
export class VehicleTypeMapper {
  static fromDTOtoEntity(entityDTO: VehicleTypeDTO): VehicleTypeEntity {
    if (!entityDTO) {
      return;
    }
    let entity = new VehicleTypeEntity();
    const fields = Object.getOwnPropertyNames(entityDTO);
    fields.forEach(field => {
      entity[field] = entityDTO[field];
    });
    return entity;
  }

  static fromEntityToDTO(entity: VehicleTypeEntity): VehicleTypeDTO {
    if (!entity) {
      return;
    }
    let entityDTO = new VehicleTypeDTO();

    const fields = Object.getOwnPropertyNames(entity);

    fields.forEach(field => {
      entityDTO[field] = entity[field];
    });

    return entityDTO;
  }
}
