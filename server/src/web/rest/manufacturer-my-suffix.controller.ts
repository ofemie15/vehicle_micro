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
import { ManufacturerDTO } from '../../service/dto/manufacturer-my-suffix.dto';
import { ManufacturerService } from '../../service/manufacturer-my-suffix.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/manufacturers')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiUseTags('manufacturers')
export class ManufacturerController {
  logger = new Logger('ManufacturerController');

  constructor(private readonly manufacturerEntityService: ManufacturerService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: ManufacturerDTO,
  })
  async getAll(@Req() req: Request): Promise<ManufacturerDTO[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this.manufacturerEntityService.findAndCount({
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
    type: ManufacturerDTO,
  })
  async getOne(@Param('id') id: number): Promise<ManufacturerDTO> {
    return await this.manufacturerEntityService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Create manufacturerEntity' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: ManufacturerDTO,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() manufacturerEntityDTO: ManufacturerDTO): Promise<ManufacturerDTO> {
    const created = await this.manufacturerEntityService.save(manufacturerEntityDTO, req.user?.login);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Manufacturer', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Update manufacturerEntity' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: ManufacturerDTO,
  })
  async put(@Req() req: Request, @Body() manufacturerEntityDTO: ManufacturerDTO): Promise<ManufacturerDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Manufacturer', manufacturerEntityDTO.id);
    return await this.manufacturerEntityService.update(manufacturerEntityDTO, req.user?.login);
  }

  @Put('/:id')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Update manufacturerEntity with id' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: ManufacturerDTO,
  })
  async putId(@Req() req: Request, @Body() manufacturerEntityDTO: ManufacturerDTO): Promise<ManufacturerDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Manufacturer', manufacturerEntityDTO.id);
    return await this.manufacturerEntityService.update(manufacturerEntityDTO, req.user?.login);
  }

  @Delete('/:id')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Delete manufacturerEntity' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.',
  })
  async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'Manufacturer', id);
    return await this.manufacturerEntityService.deleteById(id);
  }
}
