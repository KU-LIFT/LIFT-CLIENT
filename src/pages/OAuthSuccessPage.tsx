import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function OAuthSuccessPage() {
	const [params] = useSearchParams();
	const navigate = useNavigate();

	useEffect(() => {
		const token = params.get('token');
		if (token) {
			localStorage.setItem('access_token', token);
			navigate('/');
		} else {
			alert('토큰이 없습니다.');
			navigate('/login');
		}
	}, [params, navigate]);

	return <div>로그인 처리 중...</div>;
}
