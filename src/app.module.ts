import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { plainToInstance, Type } from 'class-transformer';
import { IsDefined, IsInt } from 'class-validator';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemsModule } from './items/items.module';

class EnvConfig {
  @IsDefined()
  @IsInt()
  @Type(() => Number)
  PORT: number;
}
@Module({
  imports: [
    ItemsModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      validate: (config) => plainToInstance(EnvConfig, config),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
