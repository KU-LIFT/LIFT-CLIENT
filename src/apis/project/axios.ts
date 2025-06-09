import instance from '@/apis/instance';
import { ProjectType } from '@/apis/project/Project';

// 프로젝트 생성
export const createProject = async ({ projectKey, name, description }: ProjectType) => {
	const { data } = await instance.post('/projects', {
		projectKey,
		name,
		description,
	});
	return data;
};

// 프로젝트 삭제
export const deleteProject = async (projectKey: string) => {
	await instance.delete(`/projects/${projectKey}`);
};

// 유저의 모든 프로젝트 조회
export const getUserProjects = async (): Promise<ProjectType[]> => {
	const { data } = await instance.get('/projects');
	return data;
};

// 특정 프로젝트 조회
export const getProject = async (projectKey: string): Promise<ProjectType> => {
	const { data } = await instance.get(`/projects/${projectKey}`);
	return data;
};

// 프로젝트 수정
export const updateProject = async (project: ProjectType) => {
	const { data } = await instance.put(`/projects/${project.projectKey}`, {
		projectKey: project.projectKey,
		name: project.name,
		description: project.description,
	});
	return data;
};
