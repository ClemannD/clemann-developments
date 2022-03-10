export class CurrentUserDto {
    public userId: string;
    public email: string;
    public phone: string;
    public firstName: string;
    public lastName: string;
    public accountId: string;
    public accountName: string;
}

export class GetCurrentUserResponse {
    user: CurrentUserDto;
}

export class RegisterUserRequest {
    public firstName: string;
    public lastName: string;
    public email: string;
    public phone: string;
    public accountName: string;
}
