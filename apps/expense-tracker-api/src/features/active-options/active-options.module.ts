import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from '../../entities/account.entity';
import { AuthModule } from '../auth/auth.module';
import { ActiveOptionsController } from './active-options.controller';
import { ActiveOptionsService } from './active-options.service';

@Module({
    imports: [TypeOrmModule.forFeature([Account]), AuthModule],
    controllers: [ActiveOptionsController],
    providers: [ActiveOptionsService],
    exports: [ActiveOptionsService]
})
export class ActiveOptionsModule {}
