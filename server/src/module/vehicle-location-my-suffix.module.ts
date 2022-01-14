import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleLocationController } from '../web/rest/vehicle-location-my-suffix.controller';
import { VehicleLocationRepository } from '../repository/vehicle-location-my-suffix.repository';
import { VehicleLocationService } from '../service/vehicle-location-my-suffix.service';

@Module({
  imports: [TypeOrmModule.forFeature([VehicleLocationRepository])],
  controllers: [VehicleLocationController],
  providers: [VehicleLocationService],
  exports: [VehicleLocationService],
})
export class VehicleLocationModule {}
