import { UserGroup } from './usergroup';

export interface Group {
    id: number;
    usergroups: UserGroup[];
}
