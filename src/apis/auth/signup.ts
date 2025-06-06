import { isAxiosError } from 'axios';
import instance from '../axios';
import { SignupRequest } from '../auth/authInterface';
import MESSAGES from '../messages';

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
