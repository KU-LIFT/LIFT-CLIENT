import instance from '@/apis/instance';
import { CreateTaskRequest, MoveTaskRequest, Task, UpdateTaskRequest } from './Task';

export const getTasks = async (projectKey: string): Promise<Task[]> => {
	const { data } = await instance.get(`/projects/${projectKey}/tasks`);
	return data;
};

export const getTask = async (projectKey: string, taskId: number): Promise<Task> => {
	const { data } = await instance.get(`/projects/${projectKey}/tasks/${taskId}`);
	return data;
};

export const createTask = async (projectKey: string, task: CreateTaskRequest): Promise<Task> => {
	console.log('>>> createTask 요청', {
		url: `/projects/${projectKey}/tasks`,
		body: task,
	});
	const { data } = await instance.post(`/projects/${projectKey}/tasks`, task);
	return data;
};

export const updateTask = async (projectKey: string, taskId: number, task: UpdateTaskRequest): Promise<Task> => {
	const { data } = await instance.put(`/projects/${projectKey}/tasks/${taskId}`, task);
	return data;
};

export const moveTask = async (projectKey: string, taskId: number, body: MoveTaskRequest): Promise<void> => {
	await instance.patch(`/projects/${projectKey}/tasks/${taskId}/column`, body);
};

export const deleteTask = async (projectKey: string, taskId: number): Promise<void> => {
	await instance.delete(`/projects/${projectKey}/tasks/${taskId}`);
};
