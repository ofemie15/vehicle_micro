/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { VehicleTypeEntity } from './vehicle-type-my-suffix.entity';
import { VehicleLocationEntity } from './vehicle-location-my-suffix.entity';
import { ManufacturerEntity } from './manufacturer-my-suffix.entity';

/**
 * Vehicle
 */
@Entity('vehicle')
export class VehicleEntity extends BaseEntity {
  @Column({ name: 'vehicle_id', nullable: true })
  vehicleID: string;

  @Column({ name: 'plate_number', nullable: true })
  plateNumber: string;

  @Column({ type: 'integer', name: 'age', nullable: true })
  age: number;

  @Column({ name: 'colour', nullable: true })
  colour: string;

  @ManyToOne(type => VehicleTypeEntity)
  vehicleType: VehicleTypeEntity;

  @ManyToOne(type => VehicleLocationEntity)
  vehicleLocation: VehicleLocationEntity;

  @ManyToOne(type => ManufacturerEntity)
  manufacturer: ManufacturerEntity;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
