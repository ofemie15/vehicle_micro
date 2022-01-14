/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { BaseDTO } from './base.dto';

import { VehicleTypeDTO } from './vehicle-type-my-suffix.dto';
import { VehicleLocationDTO } from './vehicle-location-my-suffix.dto';
import { ManufacturerDTO } from './manufacturer-my-suffix.dto';

/**
 * A VehicleDTO object.
 */
export class VehicleDTO extends BaseDTO {
  @ApiModelProperty({ description: 'vehicleID field', required: false })
  vehicleID: string;

  @ApiModelProperty({ description: 'plateNumber field', required: false })
  plateNumber: string;

  @ApiModelProperty({ description: 'age field', required: false })
  age: number;

  @ApiModelProperty({ description: 'colour field', required: false })
  colour: string;

  @ApiModelProperty({ type: VehicleTypeDTO, description: 'vehicleType relationship' })
  vehicleType: VehicleTypeDTO;

  @ApiModelProperty({ type: VehicleLocationDTO, description: 'vehicleLocation relationship' })
  vehicleLocation: VehicleLocationDTO;

  @ApiModelProperty({ type: ManufacturerDTO, description: 'manufacturer relationship' })
  manufacturer: ManufacturerDTO;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
