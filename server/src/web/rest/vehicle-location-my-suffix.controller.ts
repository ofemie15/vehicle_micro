import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post as PostMethod,
  Put,
  UseGuards,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { VehicleLocationDTO } from '../../service/dto/vehicle-location-my-suffix.dto';
import { VehicleLocationService } from '../../service/vehicle-location-my-suffix.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/vehicle-locations')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiUseTags('vehicle-locations')
export class VehicleLocationController {
  logger = new Logger('VehicleLocationController');

  constructor(private readonly vehicleLocationEntityService: VehicleLocationService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: VehicleLocationDTO,
  })
  async getAll(@Req() req: Request): Promise<VehicleLocationDTO[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this.vehicleLocationEntityService.findAndCount({
      skip: +pageRequest.page * pageRequest.size,
      take: +pageRequest.size,
      order: pageRequest.sort.asOrder(),
    });
    HeaderUtil.addPaginationHeaders(req.res, new Page(results, count, pageRequest));
    return results;
  }

  @Get('/:id')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: VehicleLocationDTO,
  })
  async getOne(@Param('id') id: number): Promise<VehicleLocationDTO> {
    return await this.vehicleLocationEntityService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Create vehicleLocationEntity' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: VehicleLocationDTO,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() vehicleLocationEntityDTO: VehicleLocationDTO): Promise<VehicleLocationDTO> {
    const created = await this.vehicleLocationEntityService.save(vehicleLocationEntityDTO, req.user?.login);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'VehicleLocation', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Update vehicleLocationEntity' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: VehicleLocationDTO,
  })
  async put(@Req() req: Request, @Body() vehicleLocationEntityDTO: VehicleLocationDTO): Promise<VehicleLocationDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'VehicleLocation', vehicleLocationEntityDTO.id);
    return await this.vehicleLocationEntityService.update(vehicleLocationEntityDTO, req.user?.login);
  }

  @Put('/:id')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Update vehicleLocationEntity with id' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: VehicleLocationDTO,
  })
  async putId(@Req() req: Request, @Body() vehicleLocationEntityDTO: VehicleLocationDTO): Promise<VehicleLocationDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'VehicleLocation', vehicleLocationEntityDTO.id);
    return await this.vehicleLocationEntityService.update(vehicleLocationEntityDTO, req.user?.login);
  }

  @Delete('/:id')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Delete vehicleLocationEntity' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.',
  })
  async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'VehicleLocation', id);
    return await this.vehicleLocationEntityService.deleteById(id);
  }
}
