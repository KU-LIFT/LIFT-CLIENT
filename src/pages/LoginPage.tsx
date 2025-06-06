import { useState } from 'react';
import styled from '@emotion/styled';
import googleImg from '@/assets/google-logo.png';
import githubImg from '@/assets/github-logo.png';
import { AuthInput, AuthButton, AuthTitle, AuthInputContainer } from '@/components/common/AuthComponents';
import SignupModal from '@/components/SignupModal';
import userLogin from '@/apis/auth/login';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [pw, setPw] = useState('');
	const [isSignupOpen, setIsSignupOpen] = useState(false);

	const handleLogin = async () => {
		try {
			const res = await userLogin({ email, password: pw });
			localStorage.setItem('access_token', res.accessToken);
			localStorage.setItem('refresh_token', res.refreshToken);
			alert('로그인 성공!');
			navigate('/');
		} catch (err: any) {
			alert(err?.response?.data?.message || err.message || '로그인 실패');
		}
	};

	return (
		<LoginPageLayout>
			<LoginPageTextContainer>
				<LoginPageTitle>LIFT</LoginPageTitle>
				<LoginPageText>Lightweight Issue & Flow Tracker</LoginPageText>
			</LoginPageTextContainer>

			<LoginContainer>
				<AuthTitle>Login</AuthTitle>
				<AuthInputContainer
					onKeyDown={(e) => {
						if (e.key === 'Enter') handleLogin();
					}}
				>
					<AuthInput type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email" />
					<AuthInput type="password" value={pw} onChange={(e) => setPw(e.target.value)} placeholder="password" />
					<AuthButton onClick={handleLogin}>로그인</AuthButton>
					<LoginTextContainer>
						{isSignupOpen && <SignupModal onClose={() => setIsSignupOpen(false)} />}
						<LoginText onClick={() => setIsSignupOpen(true)}>회원가입</LoginText>
						<LoginText>아이디/비밀번호 찾기</LoginText>
					</LoginTextContainer>
				</AuthInputContainer>

				<SocialLoginContainer>
					<SocialLoginBtn onClick={() => (window.location.href = 'http://kulift.com/oauth2/authorization/google')}>
						<img src={googleImg} alt="google" width="30" height="30" />
					</SocialLoginBtn>
					<SocialLoginBtn onClick={() => (window.location.href = 'http://kulift.com/oauth2/authorization/github')}>
						<img src={githubImg} alt="github" width="30" height="30" />
					</SocialLoginBtn>
				</SocialLoginContainer>
			</LoginContainer>
		</LoginPageLayout>
	);
};

export default LoginPage;

const LoginPageLayout = styled.div`
	display: flex;
	width: 100%;
	height: 100vh;
	justify-content: space-between;
	align-items: center;

	background-color: ${({ theme }) => theme.colors.background};

	gap: 50px;
`;

const LoginPageTextContainer = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1;
	align-items: flex-start;
	justify-content: center;

	margin-left: 10rem;

	gap: 20px;
`;

const LoginPageTitle = styled.p`
	font-size: 7rem;
	font-weight: 700;

	color: ${({ theme }) => theme.colors.title};
`;

const LoginPageText = styled.p`
	font-size: 3rem;
	font-weight: 400;
	font-style: italic;

	color: ${({ theme }) => theme.colors.secondaryText};
`;

const LoginContainer = styled.div`
	height: 100%;
	width: 40%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;

	box-sizing: border-box;
	padding: 10rem;

	background-color: white;
	gap: 50px;
`;

const LoginTextContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;

	gap: 20px;
`;

const LoginText = styled.p`
	font-size: 1.6rem;
	font-weight: 400;
	color: ${({ theme }) => theme.colors.secondaryText};
	cursor: pointer;
	&:hover {
		text-decoration: underline;
	}
	&:active {
		color: ${({ theme }) => theme.colors.accent};
	}
`;

const SocialLoginContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 20px;
`;

const SocialLoginBtn = styled.button`
	width: 20rem;
	height: 7rem;
	border: 1px solid lightgray;
	border-radius: 20px;
	background-color: #fff;

	font-size: 1.6rem;
	font-weight: 400;
	cursor: pointer;
`;
