import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createTask, deleteTask, getTask, getTasks, moveTask, updateTask } from './axios';
import { CreateTaskRequest, UpdateTaskRequest } from './Task';

export const useTasks = (projectKey: string) =>
	useQuery({
		queryKey: ['tasks', projectKey],
		queryFn: () => getTasks(projectKey),
		enabled: !!projectKey,
	});

export const useTask = (projectKey: string, taskId: number) =>
	useQuery({
		queryKey: ['task', projectKey, taskId],
		queryFn: () => getTask(projectKey, taskId),
		enabled: !!projectKey && !!taskId,
	});

export const useCreateTask = (projectKey: string) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (task: CreateTaskRequest) => createTask(projectKey, task),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks', projectKey] }),
	});
};

export const useUpdateTask = (projectKey: string, taskId: number) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (task: UpdateTaskRequest) => updateTask(projectKey, taskId, task),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['tasks', projectKey] });
			queryClient.invalidateQueries({ queryKey: ['task', projectKey, taskId] });
		},
	});
};

export const useDeleteTask = (projectKey: string) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (taskId: number) => deleteTask(projectKey, taskId),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks', projectKey] }),
	});
};
