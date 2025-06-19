import { useMutation, useQueryClient } from '@tanstack/react-query';
import { importTodosFromText, importTodosFromFile } from '@/apis/ai/axios';
import { AiTextRequest, TaskResponse } from '@/apis/ai/AITasks';

/**
 * AI 추출 텍스트로 TODO 생성
 */
export const useImportTodosFromText = (projectKey: string, boardId: number | string) => {
	const queryClient = useQueryClient();
	return useMutation<TaskResponse[], Error, AiTextRequest>({
		mutationFn: ({ text }) => importTodosFromText(projectKey, boardId, text),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['tasks', projectKey] });
		},
	});
};

/**
 * AI 추출 파일로 TODO 생성
 */
export const useImportTodosFromFile = (projectKey: string, boardId: number | string) => {
	const queryClient = useQueryClient();
	return useMutation<TaskResponse[], Error, { file: File }>({
		mutationFn: ({ file }) => importTodosFromFile(projectKey, boardId, file),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['tasks', projectKey] });
		},
	});
};
