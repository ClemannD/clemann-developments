import { User } from './user.entity';

export class Score {
    scoreId?: string;
    playerId?: string;
    set?: number;
    score?: number;
}
export class Player {
    playerId?: string;
    user?: User;
    playerPosition?: number;
    scores?: Score[];
    substitute?: User;
}

export class Court {
    courtId?: string;
    name?: string;
    courtPosition?: number;
    players?: Player[];
}

export class Week {
    weekId?: string;
    weekNumber?: number;
    playingOn?: Date;
    courts?: Court[];
}

export class Season {
    seasonId?: string;
    seasonNumber?: string;
    weeks?: Week[];
}

export const exampleSeason: Season = {
    seasonId: '1',
    seasonNumber: '1',
    weeks: [
        {
            weekId: '1',
            weekNumber: 1,
            playingOn: new Date(2016, 0, 1),
            courts: [
                {
                    courtId: '1',
                    name: 'Court 1',
                    courtPosition: 0,
                    players: [
                        {
                            playerId: '1',
                            user: {
                                firstName: 'Jon',
                                lastName: 'Snow'
                            },
                            substitute: {
                                firstName: 'Ned',
                                lastName: 'Stark'
                            },
                            playerPosition: 1
                        },
                        {
                            playerId: '2',
                            user: {
                                firstName: 'Rob',
                                lastName: 'Stark'
                            },
                            playerPosition: 2
                        },
                        {
                            playerId: '3',
                            user: {
                                firstName: 'Theon',
                                lastName: 'Greyjoy'
                            },
                            playerPosition: 3
                        },
                        {
                            playerId: '4',
                            user: {
                                firstName: 'Tyrion',
                                lastName: 'Lannister'
                            },
                            playerPosition: 4
                        }
                    ]
                },
                {
                    courtId: '2',
                    name: 'Court 2',
                    courtPosition: 1,
                    players: [
                        {
                            playerId: '5',
                            user: {
                                firstName: 'Bran',
                                lastName: 'Stark'
                            },
                            playerPosition: 0
                        },
                        {
                            playerId: '6',
                            user: {
                                firstName: 'Jon',
                                lastName: 'Snow'
                            },
                            playerPosition: 1
                        },
                        {
                            playerId: '7',
                            user: {
                                firstName: 'Jon',
                                lastName: 'Snow'
                            },
                            playerPosition: 2
                        },
                        {
                            playerId: '8',
                            user: {
                                firstName: 'Jon',
                                lastName: 'Snow'
                            },
                            playerPosition: 3
                        }
                    ]
                },
                {
                    courtId: '3',
                    name: 'Court 3',
                    courtPosition: 2,
                    players: [
                        {
                            playerId: '9',
                            user: {
                                firstName: 'Enrico',
                                lastName: 'Sanguiliano'
                            },
                            playerPosition: 0
                        },
                        {
                            playerId: '10',
                            user: {
                                firstName: 'Charlotte',
                                lastName: 'De Witte'
                            },
                            playerPosition: 1
                        },
                        {
                            playerId: '11',
                            user: {
                                firstName: 'Amelie',
                                lastName: 'Lens'
                            },
                            playerPosition: 2
                        },
                        {
                            playerId: '12',
                            user: {
                                firstName: 'Thomas',
                                lastName: 'Schumacher'
                            },
                            substitute: {
                                firstName: 'Victor',
                                lastName: 'Ruiz'
                            },
                            playerPosition: 3
                        }
                    ]
                },
                {
                    courtId: '4',
                    name: 'Court 4',
                    courtPosition: 3,
                    players: [
                        {
                            playerId: '13',
                            user: {
                                firstName: 'Jon',
                                lastName: 'Snow'
                            },
                            playerPosition: 0
                        },
                        {
                            playerId: '14',
                            user: {
                                firstName: 'Jon',
                                lastName: 'Snow'
                            },
                            playerPosition: 1
                        },
                        {
                            playerId: '15',
                            user: {
                                firstName: 'Jon',
                                lastName: 'Snow'
                            },
                            playerPosition: 2
                        },
                        {
                            playerId: '16',
                            user: {
                                firstName: 'Jon',
                                lastName: 'Snow'
                            },
                            playerPosition: 3
                        }
                    ]
                },
                {
                    courtId: '5',
                    name: 'Court 5',
                    courtPosition: 4,
                    players: [
                        {
                            playerId: '17',
                            user: {
                                firstName: 'Jon',
                                lastName: 'Snow'
                            },
                            playerPosition: 0
                        },
                        {
                            playerId: '18',
                            user: {
                                firstName: 'Jon',
                                lastName: 'Snow'
                            },
                            playerPosition: 1
                        },
                        {
                            playerId: '19',
                            user: {
                                firstName: 'Jon',
                                lastName: 'Snow'
                            },
                            playerPosition: 2
                        },
                        {
                            playerId: '20',
                            user: {
                                firstName: 'Jon',
                                lastName: 'Snow'
                            },
                            playerPosition: 3
                        }
                    ]
                }
            ]
        }
    ]
};
