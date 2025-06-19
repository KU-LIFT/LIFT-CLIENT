import instance from '../instance';

export async function getBoards(projectKey: string) {
	const { data } = await instance.get(`/projects/${projectKey}/boards`);
	return data;
}
