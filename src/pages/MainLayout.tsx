import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import styled from '@emotion/styled';
import { useState, useEffect } from 'react';

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
		navigate('/login');
	};

	return (
		<LayoutWrapper>
			<Sidebar>
				<Logo>LIFT</Logo>
				<MenuList>
					<MenuItem selected={selectedMenu === '/'} onClick={() => navigate('/')}>
						Dashboard
					</MenuItem>
					<MenuItem selected={selectedMenu === '/board'} onClick={() => navigate('/board')}>
						Board
					</MenuItem>
					<MenuItem selected={selectedMenu === '/user'} onClick={() => navigate('/user')}>
						UserPage
					</MenuItem>
					<MenuItem selected={selectedMenu === '/setting'} onClick={() => navigate('/setting')}>
						Settings
					</MenuItem>
				</MenuList>
				<LogoutBtn onClick={handleLogout}>Log out</LogoutBtn>
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
`;

const Sidebar = styled.nav`
	width: 10%;
	flex-direction: column;

	background-color: #ffffff;
	position: relative;
	display: flex;
	justify-content: flex-start;

	padding: 2rem;
	border-radius: 0 20px 20px 0;
	box-shadow: 2px 0 8px rgba(0, 0, 0, 0.2);
`;

const Logo = styled.h1`
	font-size: 3rem;
	font-weight: 600;
	margin-bottom: 40px;
	color: ${({ theme }) => theme.colors.title};
`;

const MenuList = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
`;

const MenuItem = styled.button<{ selected?: boolean }>`
	height: 5rem;
	width: 100%;
	background: none;
	border: none;
	border-radius: 5px;

	font-size: 2rem;
	color: ${({ theme, selected }) => (selected ? theme.colors.title : theme.colors.secondaryText)};
	text-align: left;
	cursor: pointer;

	background-color: ${({ theme, selected }) => (selected ? theme.colors.hover : 'transparent')};

	&:hover {
		color: ${({ theme }) => theme.colors.title};
		background-color: ${({ theme }) => theme.colors.hover};
	}
`;

const LogoutBtn = styled.button`
	position: absolute;
	bottom: 20px;
	background: none;
	border: none;
	font-size: 2rem;
	color: ${({ theme }) => theme.colors.primaryText};
	cursor: pointer;
	text-align: left;
`;

const Content = styled.main`
	flex-grow: 1;
	padding: 40px;
	background: ${({ theme }) => theme.colors.background};
`;
