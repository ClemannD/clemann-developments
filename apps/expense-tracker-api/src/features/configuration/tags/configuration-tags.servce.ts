import { TagDto } from '@clemann-developments/dtos/expense-tracker-dtos';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from '../../../entities/account.entity';
import { Tag } from '../../../entities/tag.entity';

@Injectable()
export class ConfigurationTagsService {
    constructor(
        @InjectRepository(Tag)
        private tagRepository: Repository<Tag>,

        @InjectRepository(Account)
        private accountRepository: Repository<Account>
    ) {}

    private sortByName(a: Tag, b: Tag): number {
        if (a.name < b.name) {
            return -1;
        }

        if (a.name > b.name) {
            return 1;
        }

        return 0;
    }

    public async getTags(accountId: string): Promise<TagDto[]> {
        const account = await this.accountRepository.findOne(accountId, {
            relations: ['tags']
        });

        if (!account) {
            throw new Error('Account does not exist.');
        }

        const activeTags = account.tags
            .filter((tag) => tag.active)
            .sort(this.sortByName);

        const inactiveTags = account.tags
            .filter((tag) => !tag.active)
            .sort(this.sortByName);

        return [...activeTags, ...inactiveTags].map((tag) => ({
            tagId: tag.tagId,
            name: tag.name,
            active: tag.active
        }));
    }

    public async createTag(accountId: string, name: string): Promise<void> {
        const account = await this.accountRepository.findOne(accountId);

        if (!account) {
            throw new Error('Account does not exist.');
        }

        const tag = new Tag();
        tag.name = name;
        tag.active = true;
        tag.account = account;

        await this.tagRepository.save(tag);
    }

    public async updateTag(
        accountId: string,
        tagId: string,
        name: string,
        active: boolean
    ): Promise<void> {
        const account = await this.accountRepository.findOne(accountId);

        if (!account) {
            throw new Error('Account does not exist.');
        }

        const tag = await this.tagRepository.findOne(tagId, {
            relations: ['account']
        });

        if (!tag) {
            throw new Error('Tag does not exist.');
        }

        if (tag.account.accountId !== accountId) {
            throw new Error('Tag does not belong to account.');
        }

        tag.name = name;
        tag.active = active;

        await this.tagRepository.save(tag);
    }
}
