import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getUserProjects } from '@/apis/project/axios';
import { createProject, deleteProject, getProject, updateProject } from '@/apis/project/axios';
import { Project } from '@/types/Project';
import useProjectKeyStore from '@/stores/useProjectKeyStore';
import { useNavigate } from 'react-router-dom';

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
	const navigate = useNavigate();
	const setProjectKey = useProjectKeyStore((state) => state.setProjectKey);

	return useMutation({
		mutationFn: createProject,
		onSuccess: (data: Project) => {
			queryClient.invalidateQueries({ queryKey: ['userProjects'] });
			setProjectKey(data.projectKey);
			navigate('/boards');
		},
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
