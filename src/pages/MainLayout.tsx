import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import styled from '@emotion/styled';
import { useState, useEffect } from 'react';
import Icon from '@/components/common/Icon';

function MainLayout() {
	const navigate = useNavigate();
	const location = useLocation();
	const [selectedMenu, setSelectedMenu] = useState('/');

	useEffect(() => {
		setSelectedMenu(location.pathname);
	}, [location.pathname]);

	const handleLogout = () => {
		localStorage.removeItem('access_token');
		localStorage.removeItem('refresh_token');
		localStorage.removeItem('projectKey');
		navigate('/login');
	};

	const menuItems = [
		{ path: '/', icon: 'IcnDashboard', label: 'Dashboard' },
		{ path: '/board', icon: 'IcnTodolist', label: 'Board' },
		{ path: '/user', icon: 'IcnPlus', label: 'UserPage' },
		{ path: '/setting', icon: 'IcnSetting', label: 'Settings' },
	];

	return (
		<LayoutWrapper>
			<Sidebar>
				<div>
					<Logo onClick={() => navigate('/')}>LIFT</Logo>
					<MenuList>
						{menuItems.map(({ path, icon, label }) => (
							<MenuItem key={path} selected={selectedMenu === path} onClick={() => navigate(path)}>
								<Icon name={icon as any} size="medium" />
								<span>{label}</span>
							</MenuItem>
						))}
					</MenuList>
				</div>
				<LogoutBtn onClick={handleLogout}>
					<Icon name="IcnEnter" size="medium" />
					<span>Log out</span>
				</LogoutBtn>
			</Sidebar>

			<Content>
				<Outlet />
			</Content>
		</LayoutWrapper>
	);
}

export default MainLayout;

const LayoutWrapper = styled.div`
	display: flex;
	height: 100vh;
	overflow: hidden;
	background-color: ${({ theme }) => theme.ui.background};
`;

const Sidebar = styled.nav`
	width: 240px;
	flex-shrink: 0;
	background-color: ${({ theme }) => theme.color.Purple[800]};
	color: ${({ theme }) => theme.color.Purple[100]};
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	padding: 2rem 1.2rem;
`;

const Logo = styled.h1`
	font-size: 2.8rem;
	font-weight: 700;
	margin-bottom: 3rem;
	color: ${({ theme }) => theme.color.Grey.White};
	padding: 0 1.2rem;
	cursor: pointer;
`;

const MenuList = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.8rem;
`;

const MenuItem = styled.button<{ selected?: boolean }>`
	width: 100%;
	padding: 1.2rem;
	display: flex;
	align-items: center;
	gap: 1.2rem;

	background: none;
	border: none;
	border-radius: 6px;

	font-size: 1.6rem;
	font-weight: 500;
	color: ${({ theme, selected }) => (selected ? theme.color.Grey.White : theme.color.Purple[200])};
	text-align: left;
	cursor: pointer;

	background-color: ${({ theme, selected }) => (selected ? theme.color.Purple[900] : 'transparent')};

	&:hover {
		background-color: ${({ theme }) => theme.color.Purple[700]};
		color: ${({ theme }) => theme.color.Grey.White};
	}
`;

const LogoutBtn = styled(MenuItem)`
	color: ${({ theme }) => theme.color.Purple[200]};

	&:hover {
		color: ${({ theme }) => theme.color.Grey.White};
		background-color: ${({ theme }) => theme.color.Purple[700]};
	}
`;

const Content = styled.main`
	flex-grow: 1;
	overflow-y: auto;
`;
