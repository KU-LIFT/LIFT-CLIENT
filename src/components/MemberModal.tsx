import { useEffect, useState } from 'react';
import { useGetMembers, useInviteMember, useDeleteMember, useUpdateMemberRole } from '@/apis/member/query';
import useProjectKeyStore from '@/stores/useProjectKeyStore';
import Button from './common/Button';
import styled from '@emotion/styled';
import IconButton from './common/IconButton';
import { getMemberType as Member } from '@/apis/member/Member';

type Props = {
	open: boolean;
	onClose: () => void;
};

const MemberModal = ({ open, onClose }: Props) => {
	const projectKey = useProjectKeyStore((s) => s.projectKey);
	const { data: members, refetch } = useGetMembers(projectKey);

	// 로그 찍기
	useEffect(() => {
		console.log('members:', members);
	}, [members]);

	const inviteMutation = useInviteMember(projectKey);
	const deleteMutation = useDeleteMember(projectKey);
	const updateMutation = useUpdateMemberRole(projectKey);

	const [inviteEmail, setInviteEmail] = useState('');

	const handleInvite = () => {
		if (!inviteEmail) {
			alert('초대할 멤버의 이메일을 입력해주세요.');
			return;
		}
		inviteMutation.mutate(
			{ email: inviteEmail, role: 'MEMBER' },
			{
				onSuccess: () => {
					setInviteEmail('');
					refetch();
				},
			}
		);
	};

	const handleDelete = (memberId: number) => {
		if (window.confirm('정말로 이 멤버를 추방하시겠습니까?')) {
			deleteMutation.mutate(memberId, { onSuccess: () => refetch() });
		}
	};

	const handleUpdateRole = (memberId: number, role: string) => {
		updateMutation.mutate({ id: memberId, role }, { onSuccess: () => refetch() });
	};

	if (!open) return null;

	return (
		<BackDrop onClick={(e) => (e.target === e.currentTarget ? onClose() : null)}>
			<ModalContainer>
				<ModalHeader>
					<Title>멤버 관리</Title>
					<IconButton type="normal" iconName="IcnX" onClick={onClose} />
				</ModalHeader>

				<ModalContent>
					<Section>
						<SubTitle>멤버 초대</SubTitle>
						<InviteContainer>
							<Input
								type="email"
								placeholder="초대할 멤버의 이메일을 입력하세요"
								value={inviteEmail}
								onChange={(e) => setInviteEmail(e.target.value)}
							/>
							<Button type="primary" label="초대" onClick={handleInvite} />
						</InviteContainer>
					</Section>

					<Section>
						<SubTitle>멤버 목록</SubTitle>
						<ListContainer>
							{(members || []).map((member: Member) => (
								<MemberRow key={member.id}>
									<MemberInfo>
										<MemberEmail>{member.email}</MemberEmail>
										<MemberRole>{member.role}</MemberRole>
									</MemberInfo>
									<MemberActions>
										<Select value={member.role} onChange={(e) => handleUpdateRole(member.id, e.target.value)}>
											<option value="OWNER">OWNER</option>
											<option value="MEMBER">MEMBER</option>
										</Select>
										<Button type="secondary" size="small" label="추방" onClick={() => handleDelete(member.id)} />
									</MemberActions>
								</MemberRow>
							))}
						</ListContainer>
					</Section>
				</ModalContent>
				<ModalFooter>
					<Button type="secondary" label="닫기" onClick={onClose} />
				</ModalFooter>
			</ModalContainer>
		</BackDrop>
	);
};

export default MemberModal;

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
	width: 600px;
	max-height: 80vh;
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
	flex-shrink: 0;
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
	gap: 2.4rem;
	overflow-y: auto;
`;

const Section = styled.section`
	display: flex;
	flex-direction: column;
	gap: 1.2rem;
`;

const SubTitle = styled.h3`
	font-size: 1.6rem;
	font-weight: 600;
	color: ${({ theme }) => theme.text.primary};
`;

const InviteContainer = styled.div`
	display: flex;
	gap: 1rem;
`;

const inputBaseStyles = (theme: any) => `
	padding: 0.8rem 1.2rem;
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
	flex-grow: 1;
`;

const Select = styled.select`
	${({ theme }) => inputBaseStyles(theme)}
`;

const ListContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
`;

const MemberRow = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 1.2rem;
	border: 1px solid ${({ theme }) => theme.ui.border};
	border-radius: 6px;
	background-color: ${({ theme }) => theme.ui.background};
`;

const MemberInfo = styled.div``;

const MemberEmail = styled.span`
	font-size: 1.4rem;
	font-weight: 500;
	color: ${({ theme }) => theme.text.primary};
`;

const MemberRole = styled.span`
	margin-left: 0.8rem;
	font-size: 1.2rem;
	color: ${({ theme }) => theme.text.secondary};
	background-color: ${({ theme }) => theme.ui.border};
	padding: 0.2rem 0.6rem;
	border-radius: 4px;
`;

const MemberActions = styled.div`
	display: flex;
	align-items: center;
	gap: 1rem;
`;

const ModalFooter = styled.div`
	display: flex;
	justify-content: flex-end;
	gap: 1rem;
	padding: 1.6rem 2rem;
	border-top: 1px solid ${({ theme }) => theme.ui.border};
	flex-shrink: 0;
`;
