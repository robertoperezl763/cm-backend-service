import { User } from '../../models/User';

export interface IUserReply {
    user: User;
};

export interface IUserBody {
    user: Partial<User>;
};

export interface ITokenReply {
    token: string;
};