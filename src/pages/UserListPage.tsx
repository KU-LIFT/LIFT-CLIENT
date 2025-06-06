import { useState } from 'react';
// import axios from '../apis/axios';

import styled from '@emotion/styled';
// import { User } from '@/types/User';
import { usersdummy } from '@/datas/dummyData';
import Icon from '@/components/common/Icon';

const ROLE_OPTIONS = [
	{ label: '전체', value: 'ALL' },
	{ label: 'USER', value: 'USER' },
	{ label: 'ADMIN', value: 'ADMIN' },
];

export default function UserListPage() {
	// const [users, setUsers] = useState<User[]>(usersdummy);
	// const [error, setError] = useState<string | null>(null);

	const [roleFilter, setRoleFilter] = useState<'ALL' | 'USER' | 'ADMIN'>('ALL');

	// useEffect(() => {
	// 	axios
	// 		.get('/users')
	// 		.then((res) => setUsers(res.data.data))
	// 		.catch((err) => {
	// 			setError('유저 목록을 불러올 수 없습니다.');
	// 			console.error(err);
	// 		});
	// }, []);

	const filteredUsers = roleFilter === 'ALL' ? usersdummy : usersdummy.filter((user) => user.role === roleFilter);

	return (
		<UserListPageLayout>
			{/* {error && <p>{error}</p>}
			{!error && users.length === 0 && <p>등록된 유저가 없습니다.</p>} */}

			<Section>
				<SectionHeader>
					<SectionTitle>유저 목록</SectionTitle>
				</SectionHeader>
				<UserList>
					{filteredUsers.map((user, i) => (
						<UserItem key={i}>
							<TextContainer>
								<MainText>{user.name}</MainText>
								<SubText>{user.provider}</SubText>
							</TextContainer>
							<MainText>{user.role}</MainText>
						</UserItem>
					))}
				</UserList>
			</Section>

			<FilterContainer>
				{ROLE_OPTIONS.map((option) => {
					const checked = roleFilter === option.value;
					return (
						<FilterLabel key={option.value} checked={checked}>
							<FilterCheckbox
								type="radio"
								name="role"
								value={option.value}
								checked={checked}
								onChange={() => setRoleFilter(option.value as 'ALL' | 'USER' | 'ADMIN')}
							/>
							<CustomCheckIcon>{checked ? <Icon name="IcnCheck" /> : <Icon name="IcnCheckboxOff" />}</CustomCheckIcon>
							<span>{option.label}</span>
						</FilterLabel>
					);
				})}
			</FilterContainer>
		</UserListPageLayout>
	);
}

const UserListPageLayout = styled.div`
	display: flex;
	flex-direction: row;

	gap: 3rem;
`;

const FilterContainer = styled.div`
	display: flex;
	flex-direction: column;
	height: fit-content;

	padding: 2rem;
	gap: 2rem;
	margin-bottom: 2.4rem;

	background: ${({ theme }) => theme.colors.cardBackground};
	border: 1px solid ${({ theme }) => theme.colors.border};
	border-radius: 1.2rem;
	box-shadow: 0 2px 8px ${({ theme }) => theme.colors.shadow};
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
	font-size: 2.4rem;
	font-weight: 600;
	color: ${({ theme }) => theme.colors.title};
`;

const UserList = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1.6rem;
`;

const UserItem = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 1.6rem 2rem;
	background-color: #ffffff;
	border: 1px solid ${({ theme }) => theme.colors.border};
	border-radius: 1.2rem;
	box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
	cursor: pointer;

	&:hover {
		transform: translateY(-2px);
		box-shadow: 0 6px 16px rgba(0, 0, 0, 0.06);
	}
`;

const TextContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
`;

const MainText = styled.span`
	font-size: 1.6rem;
	font-weight: 500;
	color: ${({ theme }) => theme.colors.title};
`;

const SubText = styled.span`
	font-size: 1.4rem;
	color: ${({ theme }) => theme.colors.secondaryText};
`;

const FilterLabel = styled.label<{ checked: boolean }>`
	display: flex;
	align-items: center;
	gap: 0.8rem;
	font-size: 1.6rem;
	font-weight: 500;
	cursor: pointer;

	padding: 0.7rem 1.4rem;
	border-radius: 0.7rem;
	border: 1.5px solid ${({ checked, theme }) => (checked ? theme.colors.primary : theme.colors.border)};
	background: ${({ checked, theme }) => (checked ? theme.colors.accent : theme.colors.boardBackground)};
	color: ${({ checked, theme }) => (checked ? '#fff' : theme.colors.title)};
	transition: all 0.15s;
	margin-bottom: 0.7rem;

	&:hover {
		border-color: ${({ theme }) => theme.colors.primary};
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
