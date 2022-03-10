import { EmptyResponse } from '@clemann-developments/common-endpoint';
import {
    CreateTagRequest,
    GetTagsResponse,
    UpdateTagRequest
} from '@clemann-developments/dtos/expense-tracker-dtos';
import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthUserGuard } from '../../auth/auth-user.guard';
import { ConfigurationTagsService } from './configuration-tags.servce';

@Controller('configuration')
@UseGuards(AuthGuard('jwt'), AuthUserGuard)
export class ConfigurationTagsController {
    constructor(private _configurationTagsService: ConfigurationTagsService) {}

    @Post('getTags')
    public async getTags(@Req() request: any): Promise<GetTagsResponse> {
        return {
            tags: await this._configurationTagsService.getTags(
                request.userInfo.account.accountId
            )
        };
    }

    @Post('createTag')
    public async createTag(
        @Req() request: any,
        @Body() createTagRequest: CreateTagRequest
    ): Promise<EmptyResponse> {
        await this._configurationTagsService.createTag(
            request.userInfo.account.accountId,
            createTagRequest.name
        );

        return new EmptyResponse();
    }

    @Post('updateTag')
    public async updateTag(
        @Req() request: any,
        @Body() updateTagRequest: UpdateTagRequest
    ): Promise<EmptyResponse> {
        await this._configurationTagsService.updateTag(
            request.userInfo.account.accountId,
            updateTagRequest.tagId,
            updateTagRequest.name,
            updateTagRequest.active
        );

        return new EmptyResponse();
    }
}
