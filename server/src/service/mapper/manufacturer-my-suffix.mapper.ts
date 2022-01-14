import { ManufacturerEntity } from '../../domain/manufacturer-my-suffix.entity';
import { ManufacturerDTO } from '../dto/manufacturer-my-suffix.dto';

/**
 * A Manufacturer mapper object.
 */
export class ManufacturerMapper {
  static fromDTOtoEntity(entityDTO: ManufacturerDTO): ManufacturerEntity {
    if (!entityDTO) {
      return;
    }
    let entity = new ManufacturerEntity();
    const fields = Object.getOwnPropertyNames(entityDTO);
    fields.forEach(field => {
      entity[field] = entityDTO[field];
    });
    return entity;
  }

  static fromEntityToDTO(entity: ManufacturerEntity): ManufacturerDTO {
    if (!entity) {
      return;
    }
    let entityDTO = new ManufacturerDTO();

    const fields = Object.getOwnPropertyNames(entity);

    fields.forEach(field => {
      entityDTO[field] = entity[field];
    });

    return entityDTO;
  }
}
