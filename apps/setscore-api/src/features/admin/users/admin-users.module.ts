import { Module } from '@nestjs/common';
import { AdminUsersService } from './admin-users.service';
import { AdminUsersController } from './admin-users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../../entities/user.entity';
import { AuthModule } from '../../../auth/auth.module';

@Module({
    imports: [TypeOrmModule.forFeature([User]), AuthModule],
    controllers: [AdminUsersController],
    providers: [AdminUsersService]
})
export class AdminUsersModule {}
