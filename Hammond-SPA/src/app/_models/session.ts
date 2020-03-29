import { Assignment } from './assignment';

export interface Session {
    id: number;
    description: string;
    dayOfSession: Date;
    assignments: Assignment[];
}
