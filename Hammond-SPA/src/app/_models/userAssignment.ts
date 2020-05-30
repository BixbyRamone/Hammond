import { Assignment } from './assignment';
import { User } from './user';

export interface UserAssignment {
    assignmentId: number;
    assignment: Assignment;
    userId: number;
    user: User;
    completed: boolean;
}
