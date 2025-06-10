import { isAxiosError } from 'axios';
import instance from '@/apis/instance';
import { SignupRequest } from '@/apis/auth/authInterface';
import MESSAGES from '@/apis/messages';

const AUTH_URL = {
	SIGNUP: '/auth/signup',
};

const userSignup = async (data: SignupRequest): Promise<string> => {
	try {
		const response = await instance.post(AUTH_URL.SIGNUP, data);
		return response.data; // ex: "회원가입 성공!"
	} catch (error) {
		if (isAxiosError(error)) throw error;
		else throw new Error(MESSAGES.UNKNOWN_ERROR);
	}
};

export default userSignup;
