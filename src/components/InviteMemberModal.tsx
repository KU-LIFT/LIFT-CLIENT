import { useState } from 'react';
import styled from '@emotion/styled';
import { useInviteMember } from '@/apis/member/query';
import useProjectKeyStore from '@/stores/useProjectKeyStore';
import Button from './common/Button';
import IconButton from './common/IconButton';

const InviteMemberModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
	const projectKey = useProjectKeyStore((s) => s.projectKey);
	const inviteMemberMutation = useInviteMember(projectKey);
	const [email, setEmail] = useState('');
	const [role, setRole] = useState('MEMBER');

	const handleInvite = () => {
		if (!email) {
			alert('이메일을 입력해주세요.');
			return;
		}
		inviteMemberMutation.mutate(
			{ email, role },
			{
				onSuccess: () => {
					alert('멤버를 초대했습니다.');
					onClose();
				},
				onError: (err: any) => {
					alert(err?.response?.data?.message || '멤버 초대에 실패했습니다.');
				},
			}
		);
	};

	if (!open) return null;

	return (
		<BackDrop
			onClick={(e) => {
				if (e.target === e.currentTarget) {
					onClose();
				}
			}}
		>
			<ModalContainer>
				<ModalHeader>
					<Title>멤버 초대</Title>
					<IconButton type="normal" iconName="IcnX" onClick={onClose} />
				</ModalHeader>
				<ModalContent>
					<Input
						type="email"
						placeholder="초대할 멤버의 이메일"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<Select value={role} onChange={(e) => setRole(e.target.value)}>
						<option value="MEMBER">MEMBER</option>
						<option value="OWNER">OWNER</option>
					</Select>
				</ModalContent>
				<ModalFooter>
					<Button type="secondary" label="취소" onClick={onClose} />
					<Button type="primary" label="초대" onClick={handleInvite} />
				</ModalFooter>
			</ModalContainer>
		</BackDrop>
	);
};

export default InviteMemberModal;

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
	width: 400px;
	background-color: ${({ theme }) => theme.ui.panel};
	border-radius: 8px;
	box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
	display: flex;
	flex-direction: column;
`;

const ModalHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 1.6rem 2rem;
	border-bottom: 1px solid ${({ theme }) => theme.ui.border};
`;

const Title = styled.h2`
	font-size: 1.8rem;
	font-weight: 600;
	color: ${({ theme }) => theme.text.primary};
`;

const ModalContent = styled.div`
	padding: 2rem;
	display: flex;
	flex-direction: column;
	gap: 1.6rem;
`;

const inputBaseStyles = (theme: any) => `
	width: 100%;
	padding: 1rem 1.2rem;
	font-size: 1.4rem;
	background-color: ${theme.ui.background};
	border: 1px solid ${theme.ui.border};
	border-radius: 6px;
	color: ${theme.text.primary};
	transition: border-color 0.2s;
	box-sizing: border-box;

	&:focus {
		outline: none;
		border-color: ${theme.interactive.primary};
	}

	&::placeholder {
		color: ${theme.text.disabled};
	}
`;

const Input = styled.input`
	${({ theme }) => inputBaseStyles(theme)}
`;

const Select = styled.select`
	${({ theme }) => inputBaseStyles(theme)}
`;

const ModalFooter = styled.div`
	display: flex;
	justify-content: flex-end;
	gap: 1rem;
	padding: 1.6rem 2rem;
	border-top: 1px solid ${({ theme }) => theme.ui.border};
`;
