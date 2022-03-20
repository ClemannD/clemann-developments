import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from '../../entities/account.entity';
import { Category } from '../../entities/category.entity';
import { PaymentMethod } from '../../entities/payment-method.entity';
import { Subcategory } from '../../entities/subcategory.entity';
import { Tag } from '../../entities/tag.entity';
import { AuthModule } from '../auth/auth.module';
import { ConfigurationCategoriesController } from './categories/configuration-categories.controller';
import { ConfigurationCategoriesService } from './categories/configuration-categories.service';
import { ConfigurationPaymentMethodsController } from './payment-methods/configuration-payment-methods.controller';
import { ConfigurationPaymentMethodsService } from './payment-methods/configuration-payment-methods.service';
import { ConfigurationTagsController } from './tags/configuration-tags.controller';
import { ConfigurationTagsService } from './tags/configuration-tags.servce';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Account,
            Category,
            Subcategory,
            Tag,
            PaymentMethod
        ]),
        AuthModule
    ],
    controllers: [
        ConfigurationCategoriesController,
        ConfigurationTagsController,
        ConfigurationPaymentMethodsController
    ],
    providers: [
        ConfigurationCategoriesService,
        ConfigurationTagsService,
        ConfigurationPaymentMethodsService
    ]
})
export class ConfigurationModule {}
