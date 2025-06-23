import instance from '../instance';
import { BranchInfoDto, CommitDto, GitPullRequestDto, CreatePrRequest } from '@/apis/git/Git';

export const createBranch = async (
	projectKey: string,
	taskId: number,
	newBranch: string,
	baseBranch?: string
): Promise<void> => {
	await instance.post<void>(`/projects/${projectKey}/tasks/${taskId}/git/branch`, null, {
		params: { newBranch, baseBranch },
	});
};

export const listBranches = async (projectKey: string, taskId: number): Promise<BranchInfoDto[]> => {
	const { data } = await instance.get<BranchInfoDto[]>(`/projects/${projectKey}/tasks/${taskId}/git/branches`);
	return data;
};

export const listCommits = async (projectKey: string, taskId: number): Promise<CommitDto[]> => {
	const { data } = await instance.get<CommitDto[]>(`/projects/${projectKey}/tasks/${taskId}/git/commits`);
	return data;
};

export const createPullRequest = async (
	projectKey: string,
	taskId: number,
	body: CreatePrRequest
): Promise<GitPullRequestDto> => {
	const { data } = await instance.post<GitPullRequestDto>(`/projects/${projectKey}/tasks/${taskId}/git/pr`, body);
	return data;
};

export const listPullRequests = async (projectKey: string, taskId: number): Promise<GitPullRequestDto[]> => {
	const { data } = await instance.get<GitPullRequestDto[]>(`/projects/${projectKey}/tasks/${taskId}/git/prs`);
	return data;
};
