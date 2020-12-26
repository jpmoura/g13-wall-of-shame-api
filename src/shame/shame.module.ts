import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import ShameService from './shame.service';
import Shame from './shame.entity';
import ShameRepository from './shame.repository';
import { ShameSchema } from './shame.schema';
import ShameController from './shame.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Shame.name, schema: ShameSchema }]),
  ],
  controllers: [ShameController],
  providers: [ShameService, ShameRepository],
})
export default class ShameModule {}
