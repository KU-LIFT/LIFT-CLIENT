import { useState } from 'react';
// import axios from '../apis/axios';

import styled from '@emotion/styled';
// import { User } from '@/types/User';
import { useGetMembers } from '@/apis/member/query';
import Icon from '@/components/common/Icon';
import useProjectKeyStore from '@/stores/useProjectKeyStore';
import { getMemberType } from '@/apis/member/Member';

const ROLE_OPTIONS = [
	{ label: '전체', value: 'ALL' },
	{ label: 'OWNER', value: 'OWNER' },
	{ label: 'MEMBER', value: 'MEMBER' },
];

export default function UserListPage() {
	const projectKey = useProjectKeyStore((s) => s.projectKey);
	const { data: users = [], isLoading, isError } = useGetMembers(projectKey);
	const [roleFilter, setRoleFilter] = useState<'ALL' | 'OWNER' | 'MEMBER'>('ALL');

	const filteredUsers = roleFilter === 'ALL' ? users : users.filter((user: getMemberType) => user.role === roleFilter);

	return (
		<PageLayout>
			{/* {error && <p>{error}</p>}
			{!error && users.length === 0 && <p>등록된 유저가 없습니다.</p>} */}

			<FilterCard>
				<FilterTitle>필터</FilterTitle>
				<FilterList>
					{ROLE_OPTIONS.map((option) => {
						const checked = roleFilter === option.value;
						return (
							<FilterLabel key={option.value} checked={checked}>
								<FilterCheckbox
									type="radio"
									name="role"
									value={option.value}
									checked={checked}
									onChange={() => setRoleFilter(option.value as 'ALL' | 'OWNER' | 'MEMBER')}
								/>
								<CustomCheckIcon>{checked ? <Icon name="IcnCheck" /> : <Icon name="IcnCheckboxOff" />}</CustomCheckIcon>
								<span>{option.label}</span>
							</FilterLabel>
						);
					})}
				</FilterList>
			</FilterCard>
			<Section>
				<SectionHeader>
					<SectionTitle>멤버 목록</SectionTitle>
				</SectionHeader>

				{isLoading && <Message>로딩 중...</Message>}
				{isError && <Message>사용자 목록을 불러오는 데 실패했습니다.</Message>}
				{!isLoading && !isError && filteredUsers.length === 0 && <Message>표시할 사용자가 없습니다.</Message>}

				{!isLoading && !isError && (
					<UserList>
						{filteredUsers.map((user: getMemberType) => (
							<UserCard key={user.id}>
								<UserInfo>
									<UserName>{user.name}</UserName>
									<UserEmail>{user.email}</UserEmail>
								</UserInfo>
								<UserRole>{user.role}</UserRole>
							</UserCard>
						))}
					</UserList>
				)}
			</Section>
		</PageLayout>
	);
}

const PageLayout = styled.div`
	display: flex;
	gap: 4rem;
	padding: 4rem 6rem;
	background: ${({ theme }) => theme.ui.background};
	min-height: 100vh;
`;

const FilterCard = styled.div`
	min-width: 220px;
	background: ${({ theme }) => theme.ui.panel};
	border: 1px solid ${({ theme }) => theme.ui.border};
	border-radius: 8px;
	box-shadow: 0 2px 8px ${({ theme }) => theme.ui.shadow};
	padding: 2.4rem 2rem;
	display: flex;
	flex-direction: column;
	gap: 2.4rem;
	height: fit-content;
`;

const FilterTitle = styled.h3`
	font-size: 1.6rem;
	font-weight: 600;
	color: ${({ theme }) => theme.text.primary};
	margin-bottom: 1rem;
`;

const FilterList = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1.2rem;
`;

const FilterLabel = styled.label<{ checked: boolean }>`
	display: flex;
	align-items: center;
	gap: 0.8rem;
	font-size: 1.4rem;
	font-weight: 500;
	cursor: pointer;
	padding: 0.7rem 1.4rem;
	border-radius: 6px;
	border: 1.5px solid ${({ checked, theme }) => (checked ? theme.interactive.primary : theme.ui.border)};
	background: ${({ checked, theme }) => (checked ? theme.interactive.primary : theme.ui.background)};
	color: ${({ checked, theme }) => (checked ? theme.text.inverse : theme.text.primary)};
	transition: all 0.15s;

	&:hover {
		border-color: ${({ theme }) => theme.interactive.primary};
	}
`;

const FilterCheckbox = styled.input`
	display: none;
`;

const CustomCheckIcon = styled.span`
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Section = styled.section`
	display: flex;
	flex-direction: column;
	gap: 2.4rem;
	flex: 1;
`;

const SectionHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const SectionTitle = styled.h2`
	font-size: 2rem;
	font-weight: 700;
	color: ${({ theme }) => theme.text.primary};
`;

const UserList = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1.6rem;
`;

const UserCard = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 1.6rem 2rem;
	background-color: ${({ theme }) => theme.ui.panel};
	border: 1px solid ${({ theme }) => theme.ui.border};
	border-radius: 8px;
	box-shadow: 0 2px 6px ${({ theme }) => theme.ui.shadow};
	cursor: pointer;
	transition:
		box-shadow 0.2s,
		transform 0.2s;

	&:hover {
		transform: translateY(-2px);
		box-shadow: 0 6px 16px ${({ theme }) => theme.ui.shadow};
	}
`;

const UserInfo = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
`;

const UserName = styled.span`
	font-size: 1.6rem;
	font-weight: 600;
	color: ${({ theme }) => theme.text.primary};
`;

const UserEmail = styled.span`
	font-size: 1.3rem;
	color: ${({ theme }) => theme.text.secondary};
`;

const UserRole = styled.span`
	font-size: 1.3rem;
	font-weight: 500;
	color: ${({ theme }) => theme.text.secondary};
	background: ${({ theme }) => theme.ui.border};
	padding: 0.3rem 1.2rem;
	border-radius: 4px;
`;

const Message = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 200px;
	font-size: 1.6rem;
	color: ${({ theme }) => theme.text.secondary};
	background-color: ${({ theme }) => theme.ui.panel};
	border-radius: 8px;
	border: 1px solid ${({ theme }) => theme.ui.border};
`;
