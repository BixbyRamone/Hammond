import { Assignment } from './assignment';
import { Role } from './role';
import { Group } from './group';


export interface User {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    studentLevel: string;
    dateCreated: Date;
    lastActive: Date;
    actScores: any;
    userGroups: any;
    userRole: string;
    userRoles: Role[];
    userAssignments: Assignment[];
    grouped: boolean;
}
