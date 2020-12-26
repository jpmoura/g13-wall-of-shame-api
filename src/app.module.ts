import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import ShameModule from './shame/shame.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ShameModule,
    MongooseModule.forRoot(process.env.DATABASE_CS),
  ],
})
export default class AppModule {}
