import axios from 'axios';
import MESSAGES from './messages';

const API_URL = 'http://kulift.com/api';
const instance = axios.create({
	baseURL: API_URL,
});

instance.interceptors.request.use((config) => {
	const token = localStorage.getItem('access_token');
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

// refresh-token
instance.interceptors.response.use(
	(res) => res,
	async (error) => {
		const orig = error.config as any;
		if (error.response?.status === 401 && !orig._retry) {
			orig._retry = true;

			const refresh = localStorage.getItem('refresh_token');

			// refresh api 호출
			try {
				const { data } = await axios.post(`${API_URL}/auth/refresh`, null, {
					headers: { Authorization: `Bearer ${refresh}` },
				});
				const newAccessToken = data.accessToken;
				console.log('[RESP] ▶ Refresh succeeded, newAccessToken:', newAccessToken);

				localStorage.setItem('access_token', newAccessToken);
				orig.headers.Authorization = `Bearer ${newAccessToken}`;

				// 원래 요청 재시도
				return instance(orig);
			} catch (e) {
				localStorage.clear();
				alert(MESSAGES.LOGIN.EXPIRED);
				window.location.replace('/login');
				return Promise.reject(e);
			}
		}
		return Promise.reject(error);
	}
);

export default instance;
