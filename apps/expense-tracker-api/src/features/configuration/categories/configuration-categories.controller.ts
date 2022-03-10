import { EmptyResponse } from '@clemann-developments/common-endpoint';
import {
    CreateCategoryRequest,
    CreateSubcategoryRequest,
    GetCategoriesResponse,
    SetCategoryActiveRequest,
    UpdateCategoryRequest,
    UpdateSubcategoryRequest
} from '@clemann-developments/dtos/expense-tracker-dtos';
import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthUserGuard } from '../../auth/auth-user.guard';
import { ConfigurationCategoriesService } from './configuration-categories.service';

@Controller('configuration')
@UseGuards(AuthGuard('jwt'), AuthUserGuard)
export class ConfigurationCategoriesController {
    constructor(
        private _configurationService: ConfigurationCategoriesService
    ) {}

    @Post('getCategories')
    public async getCategories(
        @Req() request: any
    ): Promise<GetCategoriesResponse> {
        return {
            categories: await this._configurationService.getCategories(
                request.userInfo.account.accountId
            )
        };
    }

    @Post('createCategory')
    public async createCategory(
        @Req() request: any,
        @Body() createCategoryRequest: CreateCategoryRequest
    ): Promise<EmptyResponse> {
        await this._configurationService.createCategory(
            request.userInfo.account.accountId,
            createCategoryRequest.name,
            createCategoryRequest.color
        );

        return new EmptyResponse();
    }

    @Post('updateCategory')
    public async updateCategory(
        @Req() request: any,
        @Body() updateCategoryRequest: UpdateCategoryRequest
    ): Promise<EmptyResponse> {
        await this._configurationService.updateCategory(
            request.userInfo.account.accountId,
            updateCategoryRequest.categoryId,
            updateCategoryRequest.name,
            updateCategoryRequest.color
        );

        return new EmptyResponse();
    }

    @Post('createSubcategory')
    public async createSubcategory(
        @Req() request: any,
        @Body() createSubcategoryRequest: CreateSubcategoryRequest
    ): Promise<EmptyResponse> {
        await this._configurationService.createSubcategory(
            request.userInfo.account.accountId,
            createSubcategoryRequest.categoryId,
            createSubcategoryRequest.name
        );

        return new EmptyResponse();
    }

    @Post('updateSubcategory')
    public async updateSubcategory(
        @Req() request: any,
        @Body() updateSubcategoryRequest: UpdateSubcategoryRequest
    ): Promise<EmptyResponse> {
        await this._configurationService.updateSubcategory(
            request.userInfo.account.accountId,
            updateSubcategoryRequest.subcategoryId,
            updateSubcategoryRequest.name,
            updateSubcategoryRequest.active
        );

        return new EmptyResponse();
    }

    @Post('setCategoryActive')
    public async setCategoryActive(
        @Req() request: any,
        @Body() setActiveCategoryRequest: SetCategoryActiveRequest
    ): Promise<EmptyResponse> {
        await this._configurationService.setCategoryActive(
            request.userInfo.account.accountId,
            setActiveCategoryRequest.categoryId,
            setActiveCategoryRequest.active
        );

        return new EmptyResponse();
    }
}
