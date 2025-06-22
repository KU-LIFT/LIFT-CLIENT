import instance from '@/apis/instance';
import { inviteMemberType, updateMemberType } from '@/apis/member/Member';

// 멤버 초대
export const inviteMember = async (projectKey: string, { email, role }: inviteMemberType) => {
	const { data } = await instance.post(`/projects/${projectKey}/members`, {
		email,
		role,
	});
	return data;
};

// 멤버 목록 조회
export const getMembers = async (projectKey: string) => {
	const { data } = await instance.get(`/projects/${projectKey}/members`);
	return data;
};

// 멤버 삭제
export const deleteMember = async (projectKey: string, memberId: number) => {
	const { data } = await instance.delete(`/projects/${projectKey}/members/${memberId}`);
	return data;
};

// 멤버 역할 업데이트
export const updateMemberRole = async (projectKey: string, { id, role }: updateMemberType) => {
	const { data } = await instance.patch(`/projects/${projectKey}/members/role`, {
		id,
		role,
	});
	return data;
};
