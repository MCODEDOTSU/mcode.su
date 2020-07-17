import IUser from '@/domain/entities/interfaces/IUser';
import IRole from '@/domain/entities/interfaces/IRole';

export default interface UserState {
    user: IUser;
    role: IRole;
    token: string;
}
