import { Assignment } from './assignment';
import { Role } from './role';
import { Group } from './group';


export interface User {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    studentLevel: string;
    dateCreated: Date;
    lastActive: Date;
    actScores: any;
    role: string;
    userGroups: any;
    userRole: string;
    userRoles: Role[];
    userAssignments: any;
    grouped: boolean;
}
