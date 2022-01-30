import { UseMutationResult } from 'react-query';
import useApiMutation from '../../../hooks/useApiMutation';
import { CourtDto } from '../models';

export class WeekDto {
    weekId: string;
    seasonId: string;
    seasonNumber: number;
    weekNumber: number;
    playingOnDate: Date;
    isCurrentWeek: boolean;
    courts: CourtDto[];
}

export class GetWeekRequest {
    weekId: string;
}

export class GetWeekResponse {
    week: WeekDto;
}

export default function useGetWeek(): UseMutationResult<
    GetWeekResponse,
    any,
    GetWeekRequest
> {
    return useApiMutation<GetWeekRequest, GetWeekResponse>(
        'manager/week/getWeek'
    );
}
