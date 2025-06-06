import { isAxiosError } from 'axios';
import instance from '../axios';
import { LoginRequest, LoginResponse } from '../auth/authInterface';
import MESSAGES from '../messages';

const AUTH_URL = {
	LOGIN: '/auth/login',
};

const userLogin = async (data: LoginRequest): Promise<LoginResponse> => {
	try {
		const response = await instance.post<LoginResponse>(AUTH_URL.LOGIN, data);
		return response.data;
	} catch (error) {
		if (isAxiosError(error)) throw error;
		else throw new Error(MESSAGES.UNKNOWN_ERROR);
	}
};

export default userLogin;
