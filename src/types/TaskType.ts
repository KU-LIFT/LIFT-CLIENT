export type TaskType = {
	id: number;
	name: string;
	description: string;
	columnId: number;
	assigneeId: number;
	priority: 'HIGH' | 'MEDIUM' | 'LOW';
	dueDate: string;
	tags: string[];
	createdAt: string;
	updatedAt: string | null;
	createdById: number;
	updatedById: number | null;
};
