import { useQuery } from '@tanstack/react-query';
import { getMeResponse } from '@/apis/auth/getMe/getMe';
import { getMe } from '@/apis/auth/getMe/axios';

export const useGetMe = () =>
	useQuery<getMeResponse>({
		queryKey: ['me'],
		queryFn: getMe,
		retry: false,
		staleTime: Infinity,
	});
