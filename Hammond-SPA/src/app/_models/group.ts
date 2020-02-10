import { UserGroup } from './usergroup';
import { User } from './user';

export interface Group {
    id: number;
    userGroups: UserGroup[];
    users: User[];
}
