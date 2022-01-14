/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { BaseDTO } from './base.dto';

/**
 * A ManufacturerDTO object.
 */
export class ManufacturerDTO extends BaseDTO {
  @ApiModelProperty({ description: 'name field', required: false })
  name: string;

  @ApiModelProperty({ description: 'address field', required: false })
  address: string;

  @ApiModelProperty({ description: 'phoneNumber field', required: false })
  phoneNumber: string;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
