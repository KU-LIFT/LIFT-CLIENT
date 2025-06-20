import { useState } from 'react';
import styled from '@emotion/styled';
import googleImg from '@/assets/google-logo.png';
import githubImg from '@/assets/github-logo.png';
import { AuthInput, AuthButton, AuthTitle, AuthInputContainer } from '@/components/common/AuthComponents';
import SignupModal from '@/components/SignupModal';
import userLogin from '@/apis/auth/login';
import { useNavigate } from 'react-router-dom';
import MESSAGES from '@/apis/messages';

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
			alert(MESSAGES.LOGIN.SUCCESS);
			navigate('/');
		} catch (err: any) {
			alert(err?.response?.data?.message || err.message || '로그인 실패');
		}
	};

	return (
		<FullPageContainer>
			<LeftSection>
				<BrandTitle>LIFT</BrandTitle>
				<BrandSlogan>Lightweight Issue & Flow Tracker</BrandSlogan>
			</LeftSection>
			<RightSection>
				<LoginCard>
					<ModalHeader>
						<div />
						{isSignupOpen && <SignupModal onClose={() => setIsSignupOpen(false)} />}
					</ModalHeader>
					<AuthTitle>Login</AuthTitle>
					<AuthInputContainer
						onKeyDown={(e) => {
							if (e.key === 'Enter') handleLogin();
						}}
					>
						<AuthInput
							style={{ height: '62px', fontSize: '2.04rem' }}
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="이메일"
						/>
						<AuthInput
							style={{ height: '62px', fontSize: '2.04rem' }}
							type="password"
							value={pw}
							onChange={(e) => setPw(e.target.value)}
							placeholder="비밀번호"
						/>
						<AuthButton style={{ height: '62px', fontSize: '2.04rem' }} onClick={handleLogin}>
							로그인
						</AuthButton>
						<LoginTextContainer>
							<LoginText onClick={() => setIsSignupOpen(true)}>회원가입</LoginText>
							<LoginText>아이디/비밀번호 찾기</LoginText>
						</LoginTextContainer>
					</AuthInputContainer>
					<SocialLoginContainer>
						<SocialLoginBtn onClick={() => (window.location.href = 'http://kulift.com/oauth2/authorization/google')}>
							<img src={googleImg} alt="google" width="30" height="30" />
							<span>Google로 로그인</span>
						</SocialLoginBtn>
						<SocialLoginBtn onClick={() => (window.location.href = 'http://kulift.com/oauth2/authorization/github')}>
							<img src={githubImg} alt="github" width="30" height="30" />
							<span>Github로 로그인</span>
						</SocialLoginBtn>
					</SocialLoginContainer>
				</LoginCard>
			</RightSection>
		</FullPageContainer>
	);
};

export default LoginPage;

const FullPageContainer = styled.div`
	display: flex;
	height: 100vh;
	width: 100vw;
	background: ${({ theme }) => theme.ui.background};

	@media (max-width: 900px) {
		flex-direction: column;
	}
`;

const LeftSection = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	flex: 1;
	align-items: flex-start;
	justify-content: center;
	background: ${({ theme }) => theme.colorToken.Primary.normal};
	color: ${({ theme }) => theme.text.inverse};
	min-width: 0;

	padding-left: 10rem;
	box-sizing: border-box;

	@media (max-width: 900px) {
		height: 180px;
		padding: 2rem 0;
	}
`;

const BrandTitle = styled.h1`
	font-size: 7rem;
	font-weight: 700;
	letter-spacing: 0.1em;
	margin-bottom: 1.2rem;
`;

const BrandSlogan = styled.p`
	font-size: 3rem;
	font-weight: 400;
	opacity: 0.95;
	font-style: italic;
`;

const RightSection = styled.div`
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: center;
	min-width: 0;

	@media (max-width: 900px) {
		flex: none;
		padding: 2rem 0 4rem;
	}
`;

const LoginCard = styled.div`
	width: 504px;
	background-color: ${({ theme }) => theme.ui.panel};
	border-radius: 9.6px;
	box-shadow: 0 9.6px 28.8px ${({ theme }) => theme.ui.shadow};
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 2.88rem;
	padding: 3.84rem 2.88rem 2.88rem;
`;

const ModalHeader = styled.div`
	display: flex;
	justify-content: flex-end;
	width: 100%;
`;

const LoginTextContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 2.4rem;
	width: 100%;
	margin-top: 1.44rem;
`;

const LoginText = styled.p`
	font-size: 1.56rem;
	font-weight: 400;
	color: ${({ theme }) => theme.text.secondary};
	cursor: pointer;

	&:hover {
		text-decoration: underline;
	}
	&:active {
		color: ${({ theme }) => theme.interactive.primary};
	}
`;

const SocialLoginContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 1.44rem;
	width: 100%;
	margin-top: 2.88rem;
`;

const SocialLoginBtn = styled.button`
	flex: 1;
	display: flex;
	align-items: center;
	gap: 1.44rem;
	justify-content: center;
	padding: 1.44rem 0;
	border: 1.2px solid ${({ theme }) => theme.ui.border};
	border-radius: 7.2px;
	background-color: ${({ theme }) => theme.ui.background};
	font-size: 1.68rem;
	font-weight: 500;
	color: ${({ theme }) => theme.text.primary};
	cursor: pointer;
	transition:
		background 0.2s,
		border 0.2s;

	&:hover {
		background: ${({ theme }) => theme.ui.border};
		border-color: ${({ theme }) => theme.interactive.primary};
	}
`;
