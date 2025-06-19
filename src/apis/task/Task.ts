export type CreateTaskRequest = {
	name: string;
	description?: string;
	columnId: number;
	assigneeId: number;
	priority: 'HIGH' | 'MEDIUM' | 'LOW';
	dueDate?: string;
	tags?: string[];
};
export type UpdateTaskRequest = CreateTaskRequest;

export type MoveTaskRequest = {
	columnId: number;
};
