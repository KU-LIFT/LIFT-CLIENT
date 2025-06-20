import styled from '@emotion/styled';
import { useState } from 'react';
import { AuthInput, AuthButton, AuthTitle, AuthInputContainer } from '@/components/common/AuthComponents';
import IconButton from './common/IconButton';
import userSignup from '@/apis/auth/signup';

type Props = {
	onClose: () => void;
};

function SignupModal({ onClose }: Props) {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [pw, setPw] = useState('');
	const [loading, setLoading] = useState(false);

	const handleSignup = async () => {
		setLoading(true);
		try {
			const message = await userSignup({ name, email, password: pw });
			alert(message || '회원가입 성공!');
			onClose();
		} catch (err: any) {
			alert(err?.response?.data?.message || err.message || '회원가입 실패');
		} finally {
			setLoading(false);
		}
	};

	return (
		<BackDrop onClick={(e) => (e.target === e.currentTarget ? onClose() : null)}>
			<ModalContainer>
				<ModalHeader>
					<div />
					<IconButton type="normal" iconName="IcnX" onClick={onClose} />
				</ModalHeader>
				<ModalContent>
					<AuthTitle>계정 생성</AuthTitle>
					<AuthInputContainer>
						<AuthInput type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="이름" />
						<AuthInput type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="이메일" />
						<AuthInput type="password" value={pw} onChange={(e) => setPw(e.target.value)} placeholder="비밀번호" />
						<AuthButton onClick={handleSignup} disabled={loading}>
							{loading ? '가입 중...' : '회원가입'}
						</AuthButton>
					</AuthInputContainer>
				</ModalContent>
			</ModalContainer>
		</BackDrop>
	);
}

export default SignupModal;

const BackDrop = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.4);
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 1000;
`;

const ModalContainer = styled.div`
	width: 420px;
	background-color: ${({ theme }) => theme.ui.panel};
	border-radius: 8px;
	box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
	display: flex;
	flex-direction: column;
`;

const ModalHeader = styled.div`
	display: flex;
	justify-content: flex-end;
	padding: 1rem;
`;

const ModalContent = styled.div`
	padding: 2rem 4rem 4rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 2.4rem;
`;
