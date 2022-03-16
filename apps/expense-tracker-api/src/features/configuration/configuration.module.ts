import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from '../../entities/account.entity';
import { Category } from '../../entities/category.entity';
import { Subcategory } from '../../entities/subcategory.entity';
import { Tag } from '../../entities/tag.entity';
import { AuthModule } from '../auth/auth.module';
import { ConfigurationCategoriesController } from './categories/configuration-categories.controller';
import { ConfigurationCategoriesService } from './categories/configuration-categories.service';
import { ConfigurationTagsController } from './tags/configuration-tags.controller';
import { ConfigurationTagsService } from './tags/configuration-tags.servce';

@Module({
    imports: [
        TypeOrmModule.forFeature([Account, Category, Subcategory, Tag]),
        AuthModule
    ],
    controllers: [
        ConfigurationCategoriesController,
        ConfigurationTagsController
    ],
    providers: [ConfigurationCategoriesService, ConfigurationTagsService]
})
export class ConfigurationModule {}
