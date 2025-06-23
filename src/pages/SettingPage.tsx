import { useState } from 'react';
import styled from '@emotion/styled';
import Icon from '@/components/common/Icon';

type SettingMenu = 'account' | 'notifications';

const SettingPage = () => {
	const [activeMenu, setActiveMenu] = useState<SettingMenu>('account');

	// 알림 설정 상태
	const [notificationEmail, setNotificationEmail] = useState('');
	const [registeredEmail, setRegisteredEmail] = useState(''); // 등록된 이메일
	const [notifications, setNotifications] = useState({
		roleChange: false,
		taskAssignment: false,
		projectInvitation: false,
	});

	const handleNotificationChange = (key: keyof typeof notifications) => {
		setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
	};

	const handleRegisterEmail = () => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(notificationEmail)) {
			alert('올바른 이메일 형식이 아닙니다.');
			return;
		}
		setRegisteredEmail(notificationEmail);
		alert(`'${notificationEmail}' (으)로 알림 이메일이 등록되었습니다.`);
	};

	return (
		<PageLayout>
			<SideMenu>
				<MenuTitle>설정</MenuTitle>
				<MenuList>
					<MenuItem active={activeMenu === 'account'} onClick={() => setActiveMenu('account')}>
						<Icon name="IcnSetting" />
						<span>계정</span>
					</MenuItem>
					<MenuItem active={activeMenu === 'notifications'} onClick={() => setActiveMenu('notifications')}>
						<Icon name="IcnAlert" />
						<span>알림</span>
					</MenuItem>
				</MenuList>
			</SideMenu>

			<Content>
				{activeMenu === 'account' && (
					<Section>
						<SectionTitle>계정 관리</SectionTitle>
						<SettingCard>
							<CardHeader>
								<CardTitle>비밀번호 변경</CardTitle>
								<CardDescription>보안을 위해 주기적으로 비밀번호를 변경해주세요.</CardDescription>
							</CardHeader>
							<CardContent>
								<Input type="password" placeholder="현재 비밀번호" />
								<Input type="password" placeholder="새 비밀번호" />
								<Input type="password" placeholder="새 비밀번호 확인" />
							</CardContent>
							<CardFooter>
								<Button>비밀번호 변경</Button>
							</CardFooter>
						</SettingCard>

						<SettingCard dangerZone>
							<CardHeader>
								<CardTitle>회원 탈퇴</CardTitle>
								<CardDescription>계정을 삭제하면 모든 데이터가 영구적으로 삭제됩니다.</CardDescription>
							</CardHeader>
							<CardFooter>
								<Button danger>회원 탈퇴</Button>
							</CardFooter>
						</SettingCard>
					</Section>
				)}

				{activeMenu === 'notifications' && (
					<Section>
						<SectionTitle>알림 설정</SectionTitle>
						<SettingCard>
							<CardHeader>
								<CardTitle>이메일 알림</CardTitle>
								<CardDescription>알림을 받을 이메일을 등록해야 아래 설정을 변경할 수 있습니다.</CardDescription>
							</CardHeader>
							<CardContent>
								<EmailRegistrationWrapper>
									<Input
										type="email"
										placeholder="연락받을 이메일 주소"
										value={notificationEmail}
										onChange={(e) => setNotificationEmail(e.target.value)}
									/>
									<Button onClick={handleRegisterEmail} style={{ flexShrink: 0 }}>
										{registeredEmail ? '이메일 변경' : '이메일 등록'}
									</Button>
								</EmailRegistrationWrapper>
							</CardContent>

							<NotificationListWrapper disabled={!registeredEmail}>
								<NotificationItem>
									<label htmlFor="roleChange">멤버 역할이 변경된 경우</label>
									<ToggleSwitch
										id="roleChange"
										checked={notifications.roleChange}
										onChange={() => handleNotificationChange('roleChange')}
										disabled={!registeredEmail}
									/>
								</NotificationItem>
								<NotificationItem>
									<label htmlFor="taskAssignment">새로운 태스크를 할당받은 경우</label>
									<ToggleSwitch
										id="taskAssignment"
										checked={notifications.taskAssignment}
										onChange={() => handleNotificationChange('taskAssignment')}
										disabled={!registeredEmail}
									/>
								</NotificationItem>
								<NotificationItem>
									<label htmlFor="projectInvitation">프로젝트에 초대되거나 제외된 경우</label>
									<ToggleSwitch
										id="projectInvitation"
										checked={notifications.projectInvitation}
										onChange={() => handleNotificationChange('projectInvitation')}
										disabled={!registeredEmail}
									/>
								</NotificationItem>
							</NotificationListWrapper>
						</SettingCard>
					</Section>
				)}
			</Content>
		</PageLayout>
	);
};

export default SettingPage;

// --- Styled Components ---

const PageLayout = styled.div`
	display: flex;
	height: calc(100vh - 60px); // MainLayout의 헤더 높이를 뺀 값
	background-color: ${({ theme }) => theme.ui.background};
`;

const SideMenu = styled.aside`
	width: 240px;
	padding: 2.4rem;
	border-right: 1px solid ${({ theme }) => theme.ui.border};
	background-color: ${({ theme }) => theme.ui.panel};
	display: flex;
	flex-direction: column;
	gap: 2.4rem;
`;

const MenuTitle = styled.h1`
	font-size: 2rem;
	font-weight: 700;
	padding: 0 1.2rem;
	color: ${({ theme }) => theme.text.primary};
`;

const MenuList = styled.ul`
	list-style: none;
	padding: 0;
	margin: 0;
	display: flex;
	flex-direction: column;
	gap: 0.8rem;
`;

const MenuItem = styled.li<{ active: boolean }>`
	display: flex;
	align-items: center;
	gap: 1.2rem;
	padding: 1.2rem;
	border-radius: 6px;
	font-size: 1.5rem;
	font-weight: 500;
	cursor: pointer;
	color: ${({ active, theme }) => (active ? theme.text.inverse : theme.text.primary)};
	background-color: ${({ active, theme }) => (active ? theme.interactive.primary : 'transparent')};
	transition: background-color 0.2s;

	&:hover {
		background-color: ${({ active, theme }) => (active ? theme.interactive.primary : theme.ui.hover)};
	}
`;

const Content = styled.main`
	flex: 1;
	padding: 4rem;
	overflow-y: auto;
`;

const Section = styled.section`
	max-width: 700px;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	gap: 2.4rem;
`;

const SectionTitle = styled.h2`
	font-size: 2.4rem;
	font-weight: 700;
	color: ${({ theme }) => theme.text.primary};
	padding-bottom: 1.2rem;
	border-bottom: 1px solid ${({ theme }) => theme.ui.border};
`;

const SettingCard = styled.div<{ dangerZone?: boolean }>`
	background-color: ${({ theme }) => theme.ui.panel};
	border: 1px solid ${({ theme, dangerZone }) => (dangerZone ? theme.interactive.danger : theme.ui.border)};
	border-radius: 8px;
	overflow: hidden;
`;

const CardHeader = styled.div`
	padding: 2rem;
`;

const CardTitle = styled.h3`
	font-size: 1.8rem;
	font-weight: 600;
	margin-bottom: 0.4rem;
	color: ${({ theme }) => theme.text.primary};
`;

const CardDescription = styled.p`
	font-size: 1.4rem;
	color: ${({ theme }) => theme.text.secondary};
`;

const CardContent = styled.div`
	padding: 0 2rem;
	display: flex;
	flex-direction: column;
	gap: 1.6rem;
`;

const CardFooter = styled.div`
	display: flex;
	justify-content: flex-end;
	padding: 1.6rem 2rem;
	background-color: ${({ theme }) => theme.ui.background};
	border-top: 1px solid ${({ theme }) => theme.ui.border};
	margin-top: 2rem;
`;

const Input = styled.input`
	width: 100%;
	padding: 1rem 1.2rem;
	font-size: 1.4rem;
	background-color: ${({ theme }) => theme.ui.background};
	border: 1px solid ${({ theme }) => theme.ui.border};
	border-radius: 6px;
	color: ${({ theme }) => theme.text.primary};

	&:focus {
		outline: none;
		border-color: ${({ theme }) => theme.interactive.primary};
	}
`;

const Button = styled.button<{ danger?: boolean }>`
	padding: 0.8rem 1.6rem;
	border: none;
	border-radius: 6px;
	font-size: 1.4rem;
	font-weight: 500;
	cursor: pointer;
	background-color: ${({ theme, danger }) => (danger ? theme.interactive.danger : theme.interactive.primary)};
	color: ${({ theme }) => theme.text.inverse};

	&:hover {
		background-color: ${({ theme, danger }) =>
			danger ? theme.interactive.dangerHover : theme.interactive.primaryHover};
	}
`;

const NotificationItem = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 1.2rem 0;
	border-bottom: 1px solid ${({ theme }) => theme.ui.border};

	&:last-child {
		border-bottom: none;
	}

	label {
		font-size: 1.5rem;
		color: ${({ theme }) => theme.text.primary};
	}
`;

// --- Custom Toggle Switch ---
const ToggleSwitchContainer = styled.label`
	position: relative;
	display: inline-block;
	width: 44px;
	height: 24px;
`;

const ToggleSwitchInput = styled.input`
	opacity: 0;
	width: 0;
	height: 0;

	&:checked + span {
		background-color: ${({ theme }) => theme.interactive.primary};
	}

	&:checked + span:before {
		transform: translateX(20px);
	}

	&:disabled + span {
		cursor: not-allowed;
		background-color: ${({ theme }) => theme.color.Grey[300]} !important;
	}

	&:disabled:checked + span {
		background-color: ${({ theme }) => theme.color.Grey[400]} !important;
	}
`;

const ToggleSlider = styled.span`
	position: absolute;
	cursor: pointer;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: ${({ theme }) => theme.ui.border};
	border-radius: 24px;
	transition: 0.4s;

	&:before {
		position: absolute;
		content: '';
		height: 18px;
		width: 18px;
		left: 3px;
		bottom: 3px;
		background-color: white;
		border-radius: 50%;
		transition: 0.4s;
	}
`;

const ToggleSwitch = ({
	id,
	checked,
	onChange,
	disabled,
}: {
	id: string;
	checked: boolean;
	onChange: () => void;
	disabled?: boolean;
}) => (
	<ToggleSwitchContainer htmlFor={id}>
		<ToggleSwitchInput type="checkbox" id={id} checked={checked} onChange={onChange} disabled={disabled} />
		<ToggleSlider />
	</ToggleSwitchContainer>
);

const EmailRegistrationWrapper = styled.div`
	display: flex;
	gap: 1.2rem;
	align-items: center;
`;

const NotificationListWrapper = styled.div<{ disabled: boolean }>`
	padding: 0 2rem;
	display: flex;
	flex-direction: column;
	margin-top: 1.6rem;
	padding-top: 1.6rem;
	border-top: 1px solid ${({ theme }) => theme.ui.border};
	transition: opacity 0.3s;
	opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
	pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
`;
