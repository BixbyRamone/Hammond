export interface User {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    studentLevel: string;
    dateCreated: Date;
    lastActive: Date;
    actScore: number[];
    userRoles: string;
}
