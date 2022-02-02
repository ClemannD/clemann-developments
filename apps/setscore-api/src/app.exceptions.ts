import { NotFoundException } from '@nestjs/common';

export class LeagueNotFoundException extends NotFoundException {
    constructor(leagueId: string) {
        super(`No league found for leagueId: ${leagueId}.`);
    }
}

export class UserNotFoundException extends NotFoundException {
    constructor(paramName: string, value: string) {
        super(`No user found for ${paramName}: ${value}.`);
    }
}
