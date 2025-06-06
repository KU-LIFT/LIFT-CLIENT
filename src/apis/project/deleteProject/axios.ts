import instance from '@/apis/axios';

export const deleteProject = async (projectKey: string) => {
	await instance.delete(`/projects/${projectKey}`);
};
