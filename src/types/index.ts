
export type TaskStatus = 'todo'| 'in-progress'  | 'done';
export type TaskPriority = 'low'| 'medium' | 'high';

export interface Task {
    id: string;
    tittle : string;
    description: string;
    status: TaskStatus;
    priority: TaskPriority;
    createdAt: string; // localStorage
}