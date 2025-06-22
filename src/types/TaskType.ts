export type TaskType = {
	id: number;
	name: string;
	columnId: number;
	priority: 'HIGH' | 'MEDIUM' | 'LOW';
	createdAt: string;

	description?: string;
	assigneeId?: number;
	dueDate?: string;
	tags?: string[];
	updatedAt?: string | null;
	createdById?: number;
	updatedById?: number | null;
	githubBranch?: string;
	githubPullRequestUrl?: string;
	githubLastCommitSha?: string;
};
