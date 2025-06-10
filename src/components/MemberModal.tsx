import { useEffect, useState } from 'react';
import { useGetMembers, useInviteMember, useDeleteMember, useUpdateMemberRole } from '@/apis/member/query';
import useProjectKeyStore from '@/stores/useProjectKeyStore';
import Button from './common/Button';
import styled from '@emotion/styled';
import IconButton from './common/IconButton';

type Props = {
	open: boolean;
	onClose: () => void;
};

const MemberModal = ({ open, onClose }: Props) => {
	const projectKey = useProjectKeyStore((s) => s.projectKey);
	const { data: members } = useGetMembers(projectKey);

	// 로그 찍기
	useEffect(() => {
		console.log('members:', members);
	}, [members]);

	const inviteMutation = useInviteMember(projectKey);
	const deleteMutation = useDeleteMember(projectKey);
	const updateMutation = useUpdateMemberRole(projectKey);

	const [inviteEmail, setInviteEmail] = useState('');
	const [inviteRole, setInviteRole] = useState('MEMBER');
	const [updateId, setUpdateId] = useState<number | null>(null);
	const [updateRole, setUpdateRole] = useState('MEMBER');

	if (!open) return null;

	return (
		<BackDrop>
			<MemberModalLayout>
				<MemberModalHeader>
					<Title>멤버 관리</Title>
					<IconButton type="normal" iconName="IcnX" onClick={onClose} />
				</MemberModalHeader>

				{/* 1. 멤버 초대 */}
				<FirstContainer>
					<SubTitle> 멤버 초대</SubTitle>

					<Container>
						<input
							placeholder="이메일"
							value={inviteEmail}
							onChange={(e) => setInviteEmail(e.target.value)}
							style={{ marginRight: 8 }}
						/>
						<select value={inviteRole} onChange={(e) => setInviteRole(e.target.value)}>
							<option value="MEMBER">MEMBER</option>
							<option value="ADMIN">OWNER</option>
						</select>
						<Button
							type="outlined-assistive"
							label="초대"
							onClick={() => {
								inviteMutation.mutate(
									{ email: inviteEmail, role: inviteRole },
									{ onSuccess: () => setInviteEmail('') }
								);
							}}
						/>
					</Container>
				</FirstContainer>

				{/* 2. 멤버 목록 */}
				<FirstContainer>
					<SubTitle> 멤버 목록</SubTitle>
					<ListContainer>
						{(members || []).map((member: any) => (
							<MemberRow key={member.id} style={{ marginBottom: 8 }}>
								<b>{member.email}</b> ({member.role})&nbsp;
								<Button type="solid" label="삭제" onClick={() => deleteMutation.mutate(member.id)} />
								{/* 역할 수정 */}
								<select
									value={updateId === member.id ? updateRole : member.role}
									onChange={(e) => {
										setUpdateId(member.id);
										setUpdateRole(e.target.value);
									}}
									style={{ marginLeft: 8 }}
								>
									<option value="MEMBER">MEMBER</option>
									<option value="ADMIN">OWNER</option>
								</select>
								<button
									onClick={() => {
										console.log(member.id, updateRole);
										updateMutation.mutate({
											id: member.id,
											role: updateRole,
										});
									}}
									disabled={member.role === updateRole}
									style={{ marginLeft: 4 }}
								>
									역할변경
								</button>
							</MemberRow>
						))}
					</ListContainer>
				</FirstContainer>
			</MemberModalLayout>
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
	background: rgba(0, 0, 0, 0.2);
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	z-index: 1000;
`;

const MemberModalLayout = styled.div`
	background-color: ${({ theme }) => theme.color.Grey.White};

	padding: 20px;

	border-radius: 8px;
`;

const MemberModalHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 16px 0;
	background: #fff;
	border-bottom: 1px solid #eaeaea;

	h1 {
		margin: 0;
		font-size: 1.5rem;
		color: #333;
	}
`;

const FirstContainer = styled.div`
	display: flex;
	flex-direction: column;

	padding: 20px;

	gap: 15px;
`;

const MemberRow = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;

	border: 1px solid #eaeaea;

	padding: 8px 16px;
	font-size: 1.4rem;

	gap: 15px;
`;

const Title = styled.p`
	font-size: 2.4rem;
	font-weight: 600;
`;

const SubTitle = styled.p`
	font-size: 1.8rem;
	font-weight: 500;
`;

const Container = styled.div`
	display: flex;
	flex-direction: row;

	gap: 15px;
`;

const ListContainer = styled.div`
	display: flex;
	flex-direction: column;

	gap: 10px;
`;
