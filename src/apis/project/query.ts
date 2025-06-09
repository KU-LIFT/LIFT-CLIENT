import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getUserProjects } from '@/apis/project/axios';
import { createProject, deleteProject, getProject, updateProject } from '@/apis/project/axios';

// 전체 프로젝트 리스트
export const useUserProjects = () =>
	useQuery({
		queryKey: ['userProjects'],
		queryFn: getUserProjects,
	});

// 특정 프로젝트 정보
export const useProject = (projectKey: string) =>
	useQuery({
		queryKey: ['project', projectKey],
		queryFn: () => getProject(projectKey),
		enabled: !!projectKey,
	});

// 프로젝트 생성
export const useCreateProject = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: createProject,
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['userProjects'] }),
	});
};

// 프로젝트 수정
export const useUpdateProject = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: updateProject,
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['userProjects'] }),
	});
};

// 프로젝트 삭제
export const useDeleteProject = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: deleteProject,
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['userProjects'] }),
	});
};
