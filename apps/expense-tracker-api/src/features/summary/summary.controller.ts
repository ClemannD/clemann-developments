import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthUserGuard } from '../auth/auth-user.guard';
import { SummaryService } from './summary.service';

@Controller('summary')
@UseGuards(AuthGuard('jwt'), AuthUserGuard)
export class SummaryController {
    constructor(private _summaryService: SummaryService) {
        
    }
}
