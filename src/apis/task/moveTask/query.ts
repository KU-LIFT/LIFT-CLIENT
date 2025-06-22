import { useMutation, useQueryClient } from '@tanstack/react-query';
import { moveTask } from '@/apis/task/axios';
import { TaskType } from '@/types/TaskType';

export const useMoveTask = (projectKey: string) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ taskId, columnId }: { taskId: number; columnId: number }) =>
			moveTask(projectKey, taskId, { columnId }),
		// **낙관적 업데이트**
		onMutate: async ({ taskId, columnId }) => {
			// 1) 진행 중인 쿼리 취소
			await queryClient.cancelQueries({ queryKey: ['tasks', projectKey] });

			// 2) 이전 데이터 스냅샷
			const previousTasks = queryClient.getQueryData<TaskType[]>(['tasks', projectKey]);

			// 3) 캐시를 즉시 업데이트
			if (previousTasks) {
				queryClient.setQueryData<TaskType[]>(
					['tasks', projectKey],
					previousTasks.map((t) => (t.id === taskId ? { ...t, columnId } : t))
				);
			}

			// 4) 롤백용 컨텍스트 반환
			return { previousTasks };
		},
		onError: (_err, _vars, context: any) => {
			// 에러 시 롤백
			if (context?.previousTasks) {
				queryClient.setQueryData(['tasks', projectKey], context.previousTasks);
			}
		},
		onSettled: () => {
			// 성공/실패 상관없이 최신 데이터로 리페치
			queryClient.invalidateQueries({ queryKey: ['tasks', projectKey] });
		},
	});
};
