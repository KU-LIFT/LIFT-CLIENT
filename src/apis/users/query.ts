import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { PasswordUpdateRequest, UserResponse } from './Users';
import instance from '../instance';

// 비밀번호 변경
export const useUpdatePassword = () => {
	return useMutation({
		mutationFn: (data: PasswordUpdateRequest) => instance.patch<string>('/users/me', data).then((res) => res.data),
	});
};

// 회원 탈퇴
export const useDeleteUser = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (id: number) => instance.delete<string>(`/users/${id}`).then((res) => res.data),
		onSuccess: () => {
			queryClient.invalidateQueries(); // 필요 시 추가
		},
	});
};

// 내 정보 가져오기
export const useMyInfo = () => {
	return useQuery<UserResponse>({
		queryKey: ['me'],
		queryFn: () => instance.get('/users/me').then((res) => res.data),
	});
};
