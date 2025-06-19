import instance from '@/apis/instance';
import { TaskResponse } from '@/apis/ai/AITasks';

export const importTodosFromText = async (
	projectKey: string,
	boardId: number | string,
	text: string
): Promise<TaskResponse[]> => {
	const url = `/projects/${projectKey}/boards/${boardId}/ai/create-tasks`;
	const { data } = await instance.post<TaskResponse[]>(url, { text });
	return data;
};

export const importTodosFromFile = async (
	projectKey: string,
	boardId: number | string,
	file: File
): Promise<TaskResponse[]> => {
	const url = `/projects/${projectKey}/boards/${boardId}/ai/create-tasks`;
	const formData = new FormData();
	formData.append('file', file);
	const { data } = await instance.post<TaskResponse[]>(url, formData, {
		headers: { 'Content-Type': 'multipart/form-data' },
	});
	return data;
};
