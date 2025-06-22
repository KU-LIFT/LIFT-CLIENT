// src/apis/git/query.ts
import { useQuery, useMutation, useQueryClient, QueryKey } from '@tanstack/react-query';
import { createBranch, listBranches, listCommits, createPullRequest, listPullRequests } from '@/apis/git/axios';
import { CreatePrRequest, BranchInfoDto, CommitDto, GitPullRequestDto } from '@/apis/git/Git';

// 공통: QueryKey 생성 함수
const gitBranchesKey = (projectKey: string, taskId: number): QueryKey => ['gitBranches', projectKey, taskId];
const gitCommitsKey = (projectKey: string, taskId: number): QueryKey => ['gitCommits', projectKey, taskId];
const gitPrsKey = (projectKey: string, taskId: number): QueryKey => ['gitPullRequests', projectKey, taskId];

// ── 브랜치 생성 훅 ──
export const useCreateBranch = (projectKey: string, taskId: number) => {
	const queryClient = useQueryClient();
	return useMutation<
		void, // TData
		unknown, // TError
		{ newBranch: string; baseBranch?: string } // TVariables
	>({
		mutationFn: ({ newBranch, baseBranch }) => createBranch(projectKey, taskId, newBranch, baseBranch),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: gitBranchesKey(projectKey, taskId) });
		},
	});
};

// ── 브랜치 리스트 조회 ──
export const useBranches = (projectKey: string, taskId: number) =>
	useQuery<BranchInfoDto[]>({
		queryKey: gitBranchesKey(projectKey, taskId),
		queryFn: () => listBranches(projectKey, taskId),
	});

// ── 커밋 리스트 조회 ──
export const useCommits = (projectKey: string, taskId: number) =>
	useQuery<CommitDto[]>({
		queryKey: gitCommitsKey(projectKey, taskId),
		queryFn: () => listCommits(projectKey, taskId),
	});

// ── PR 생성 훅 ──
export const useCreatePullRequest = (projectKey: string, taskId: number) => {
	const queryClient = useQueryClient();
	return useMutation<
		GitPullRequestDto, // TData
		unknown, // TError
		CreatePrRequest // TVariables
	>({
		mutationFn: (body) => createPullRequest(projectKey, taskId, body),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: gitPrsKey(projectKey, taskId) });
		},
	});
};

// ── PR 리스트 조회 ──
export const usePullRequests = (projectKey: string, taskId: number) =>
	useQuery<GitPullRequestDto[]>({
		queryKey: gitPrsKey(projectKey, taskId),
		queryFn: () => listPullRequests(projectKey, taskId),
	});
