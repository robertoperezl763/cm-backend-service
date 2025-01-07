import { User } from '../../models/User';

export interface IUserReply {
    user: User;
};

export interface IUserBody {
    user: Partial<User>;
};

export interface ILoginReply {
    token: string;
    user: Partial<User>;
};

export interface IChangePasswordBody {
    currentPassword: string,
    newPassword: string,
};

export interface ISuccessMessageResponse {
    success: boolean
}