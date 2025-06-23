import instance from '../instance';
import { PasswordUpdateRequest, UserResponse } from './Users';

// 비밀번호 변경
export const updatePassword = (data: PasswordUpdateRequest) => {
	return instance.patch<string>('/users/me', data).then((res) => res.data);
};

// 회원 탈퇴
export const deleteUser = (id: number) => {
	return instance.delete<string>(`/users/${id}`).then((res) => res.data);
};

// 내 정보 조회
export const fetchMyInfo = () => {
	return instance.get<UserResponse>('/users/me').then((res) => res.data);
};
