import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { VehicleLocationDTO } from '../service/dto/vehicle-location-my-suffix.dto';
import { VehicleLocationMapper } from '../service/mapper/vehicle-location-my-suffix.mapper';
import { VehicleLocationRepository } from '../repository/vehicle-location-my-suffix.repository';

const relationshipNames = [];

@Injectable()
export class VehicleLocationService {
  logger = new Logger('VehicleLocationService');

  constructor(@InjectRepository(VehicleLocationRepository) private vehicleLocationEntityRepository: VehicleLocationRepository) {}

  async findById(id: number): Promise<VehicleLocationDTO | undefined> {
    const options = { relations: relationshipNames };
    const result = await this.vehicleLocationEntityRepository.findOne(id, options);
    return VehicleLocationMapper.fromEntityToDTO(result);
  }

  async findByFields(options: FindOneOptions<VehicleLocationDTO>): Promise<VehicleLocationDTO | undefined> {
    const result = await this.vehicleLocationEntityRepository.findOne(options);
    return VehicleLocationMapper.fromEntityToDTO(result);
  }

  async findAndCount(options: FindManyOptions<VehicleLocationDTO>): Promise<[VehicleLocationDTO[], number]> {
    options.relations = relationshipNames;
    const resultList = await this.vehicleLocationEntityRepository.findAndCount(options);
    const vehicleLocationEntityDTO: VehicleLocationDTO[] = [];
    if (resultList && resultList[0]) {
      resultList[0].forEach(vehicleLocationEntity =>
        vehicleLocationEntityDTO.push(VehicleLocationMapper.fromEntityToDTO(vehicleLocationEntity))
      );
      resultList[0] = vehicleLocationEntityDTO;
    }
    return resultList;
  }

  async save(vehicleLocationEntityDTO: VehicleLocationDTO, creator?: string): Promise<VehicleLocationDTO | undefined> {
    const entity = VehicleLocationMapper.fromDTOtoEntity(vehicleLocationEntityDTO);
    if (creator) {
      if (!entity.createdBy) {
        entity.createdBy = creator;
      }
      entity.lastModifiedBy = creator;
    }
    const result = await this.vehicleLocationEntityRepository.save(entity);
    return VehicleLocationMapper.fromEntityToDTO(result);
  }

  async update(vehicleLocationEntityDTO: VehicleLocationDTO, updater?: string): Promise<VehicleLocationDTO | undefined> {
    const entity = VehicleLocationMapper.fromDTOtoEntity(vehicleLocationEntityDTO);
    if (updater) {
      entity.lastModifiedBy = updater;
    }
    const result = await this.vehicleLocationEntityRepository.save(entity);
    return VehicleLocationMapper.fromEntityToDTO(result);
  }

  async deleteById(id: number): Promise<void | undefined> {
    await this.vehicleLocationEntityRepository.delete(id);
    const entityFind = await this.findById(id);
    if (entityFind) {
      throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
    }
    return;
  }
}
