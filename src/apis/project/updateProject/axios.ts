import instance from '@/apis/axios';
import { ProjectType } from '../ProjectType';

export const updateProject = async (project: ProjectType) => {
	const { data } = await instance.put(`/projects/${project.projectKey}`, {
		projectKey: project.projectKey,
		name: project.name,
		description: project.description,
	});
	return data;
};
