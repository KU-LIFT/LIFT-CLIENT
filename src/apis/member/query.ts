import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { inviteMember, getMembers, deleteMember, updateMemberRole } from '@/apis/member/axios';
import { inviteMemberType, updateMemberType } from '@/apis/member/Member';

// 멤버 목록 조회
export const useGetMembers = (projectKey: string) =>
	useQuery({
		queryKey: ['members', projectKey],
		queryFn: () => getMembers(projectKey),
		enabled: !!projectKey,
	});

// 멤버 초대
export const useInviteMember = (projectKey: string) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (data: inviteMemberType) => inviteMember(projectKey, data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['members', projectKey] });
		},
	});
};

// 멤버 삭제
export const useDeleteMember = (projectKey: string) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (memberId: number) => deleteMember(projectKey, memberId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['members', projectKey] });
		},
	});
};

// 멤버 역할 업데이트
export const useUpdateMemberRole = (projectKey: string) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (data: updateMemberType) => updateMemberRole(projectKey, data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['members', projectKey] });
		},
	});
};
