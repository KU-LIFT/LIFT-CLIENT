import { useQuery } from '@tanstack/react-query';
import { getBoards } from './axios';

export function useBoards(projectKey: string) {
	return useQuery({
		queryKey: ['boards', projectKey],
		queryFn: () => getBoards(projectKey),
		enabled: !!projectKey,
	});
}
