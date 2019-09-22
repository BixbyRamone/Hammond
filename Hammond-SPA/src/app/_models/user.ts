import { Assignment } from './assignment';
import { Role } from './role';


export interface User {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    studentLevel: string;
    dateCreated: Date;
    lastActive: Date;
    actScore: number[];
    userRole: string;
    userRoles: Role[];
    userAssignments: Assignment[];
    grouped: boolean;
}
