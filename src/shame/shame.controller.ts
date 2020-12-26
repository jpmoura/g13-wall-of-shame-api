import {
  HttpCode,
  Param,
  Post,
  Delete,
  Controller,
  Get,
  Body,
  HttpException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import ShameConverter from './shame.converter';
import FindOneParams from '../common/dtos/find-one-params.dto';
import CreateShameDto from './dtos/create-shame.dto';
import ShameDto from './dtos/shame.dto';
import Shame from './shame.entity';
import ShameService from './shame.service';

@ApiTags('Shame')
@Controller('shame')
export default class ShameController {
  constructor(private readonly shameService: ShameService) {}

  @Get()
  async list(): Promise<ShameDto[]> {
    const shames: Array<Shame> = await this.shameService.list();
    return shames.map((shame: Shame) => ShameConverter.toDto(shame));
  }

  @Post()
  @HttpCode(201)
  async create(@Body() createShameDto: CreateShameDto): Promise<ShameDto> {
    const createdShame: Shame = await this.shameService.create(
      ShameConverter.toEntity(createShameDto),
    );

    return ShameConverter.toDto(createdShame);
  }

  @Delete(':id')
  async delete(@Param() params: FindOneParams): Promise<ShameDto> {
    const deletedShame: Shame = await this.shameService.delete(params.id);

    if (!deletedShame) {
      throw new HttpException(`Shame ${params.id} not found`, 404);
    }

    return ShameConverter.toDto(deletedShame);
  }
}
