import { User } from './user';

export interface Assignment {
    id: number;
    title: string;
    content: string;
    studentlevel: string;
    section: string;
    subject: string;
    dateAssigned: Date;
    dateDue: Date;
    assigned: boolean;
    createdBy: User;
    // assignments: Assignment[];
    completed: boolean;
    studentLevel: string;
    grouped: boolean;
    userAssignment: any;
}
