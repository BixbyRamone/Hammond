import { User } from './user';

export interface Assignment {
    id: number;
    title: string;
    content: string;
    studentlevel: string;
    section: string;
    dateAssigned: Date;
    dateDue: Date;
    assigned: boolean;
    createdBy: User;
}
