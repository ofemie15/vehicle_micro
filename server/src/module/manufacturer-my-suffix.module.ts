import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManufacturerController } from '../web/rest/manufacturer-my-suffix.controller';
import { ManufacturerRepository } from '../repository/manufacturer-my-suffix.repository';
import { ManufacturerService } from '../service/manufacturer-my-suffix.service';

@Module({
  imports: [TypeOrmModule.forFeature([ManufacturerRepository])],
  controllers: [ManufacturerController],
  providers: [ManufacturerService],
  exports: [ManufacturerService],
})
export class ManufacturerModule {}
