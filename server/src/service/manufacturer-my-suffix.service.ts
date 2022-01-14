import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { ManufacturerDTO } from '../service/dto/manufacturer-my-suffix.dto';
import { ManufacturerMapper } from '../service/mapper/manufacturer-my-suffix.mapper';
import { ManufacturerRepository } from '../repository/manufacturer-my-suffix.repository';

const relationshipNames = [];

@Injectable()
export class ManufacturerService {
  logger = new Logger('ManufacturerService');

  constructor(@InjectRepository(ManufacturerRepository) private manufacturerEntityRepository: ManufacturerRepository) {}

  async findById(id: number): Promise<ManufacturerDTO | undefined> {
    const options = { relations: relationshipNames };
    const result = await this.manufacturerEntityRepository.findOne(id, options);
    return ManufacturerMapper.fromEntityToDTO(result);
  }

  async findByFields(options: FindOneOptions<ManufacturerDTO>): Promise<ManufacturerDTO | undefined> {
    const result = await this.manufacturerEntityRepository.findOne(options);
    return ManufacturerMapper.fromEntityToDTO(result);
  }

  async findAndCount(options: FindManyOptions<ManufacturerDTO>): Promise<[ManufacturerDTO[], number]> {
    options.relations = relationshipNames;
    const resultList = await this.manufacturerEntityRepository.findAndCount(options);
    const manufacturerEntityDTO: ManufacturerDTO[] = [];
    if (resultList && resultList[0]) {
      resultList[0].forEach(manufacturerEntity => manufacturerEntityDTO.push(ManufacturerMapper.fromEntityToDTO(manufacturerEntity)));
      resultList[0] = manufacturerEntityDTO;
    }
    return resultList;
  }

  async save(manufacturerEntityDTO: ManufacturerDTO, creator?: string): Promise<ManufacturerDTO | undefined> {
    const entity = ManufacturerMapper.fromDTOtoEntity(manufacturerEntityDTO);
    if (creator) {
      if (!entity.createdBy) {
        entity.createdBy = creator;
      }
      entity.lastModifiedBy = creator;
    }
    const result = await this.manufacturerEntityRepository.save(entity);
    return ManufacturerMapper.fromEntityToDTO(result);
  }

  async update(manufacturerEntityDTO: ManufacturerDTO, updater?: string): Promise<ManufacturerDTO | undefined> {
    const entity = ManufacturerMapper.fromDTOtoEntity(manufacturerEntityDTO);
    if (updater) {
      entity.lastModifiedBy = updater;
    }
    const result = await this.manufacturerEntityRepository.save(entity);
    return ManufacturerMapper.fromEntityToDTO(result);
  }

  async deleteById(id: number): Promise<void | undefined> {
    await this.manufacturerEntityRepository.delete(id);
    const entityFind = await this.findById(id);
    if (entityFind) {
      throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
    }
    return;
  }
}
