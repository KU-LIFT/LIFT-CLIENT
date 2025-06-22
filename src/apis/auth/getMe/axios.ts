import instance from '@/apis/instance';
import { getMeResponse } from '@/apis/auth/getMe/getMe';

export const getMe = async (): Promise<getMeResponse> => {
	const { data } = await instance.get('/users/me');
	return data;
};
