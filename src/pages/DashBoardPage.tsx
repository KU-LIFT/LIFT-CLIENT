import { useGetMe } from '@/apis/auth/getMe/query';
import { useUserProjects, useCreateProject, useDeleteProject, useUpdateProject } from '@/apis/project/query';
import Button from '@/components/common/Button';
import IconButton from '@/components/common/IconButton';
import MemberModal from '@/components/MemberModal';
import ProjectDetailModal from '@/components/ProjectDetailModal';
import useProjectKeyStore from '@/stores/useProjectKeyStore';
import useUserStore from '@/stores/useUserStore';
import { Project } from '@/types/Project';
import styled from '@emotion/styled';
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetAssignedTasks } from '@/apis/task/query';

function DashBoardPage() {
	const navigate = useNavigate();

	const { data: me } = useGetMe();
	const setUserId = useUserStore((state) => state.setUserId);

	useEffect(() => {
		if (me) {
			console.log(me);
			setUserId(me.id);
		}
	}, [me, setUserId]);

	// GitHub 앱 설치 링크를 클릭했을 때
	const handleInstallClick = (projectKey: string) => {
		useProjectKeyStore.getState().setProjectKey(projectKey);
		window.open(`https://github.com/apps/kulift/installations/new?state=${projectKey}`, '_blank');
	};

	const [showModal, setShowModal] = useState(false);

	const handleAddProject = () => setShowModal(true);

	const { mutate } = useCreateProject();
	const handleCreateProject = (project: Project) => {
		mutate(
			{
				projectKey: project.projectKey,
				name: project.name,
				description: project.description,
			},
			{
				onSuccess: () => {
					setShowModal(false);
				},
			}
		);
	};

	const { data: projects, isLoading, isError } = useUserProjects();
	const { mutate: deleteProject } = useDeleteProject();

	const handleDeleteProject = (projectKey: string) => {
		if (window.confirm('정말 삭제하시겠습니까?')) {
			deleteProject(projectKey);
		}
	};

	const { mutate: updateProject } = useUpdateProject();

	const [editTarget, setEditTarget] = useState<Project | null>(null);
	// 수정 버튼 클릭 시
	const handleEditProject = (project: Project) => {
		setEditTarget(project);
	};

	// 수정 모달에서 저장 클릭 시
	const handleUpdateProject = (project: Project) => {
		updateProject(
			{
				projectKey: project.projectKey,
				name: project.name,
				description: project.description,
			},
			{
				onSuccess: () => setEditTarget(null),
				onError: (err) => {
					console.error('수정 실패:', err);
					alert('수정 실패!');
				},
			}
		);
	};

	const [open, setOpen] = useState(false);

	const { data: recentIssues, isLoading: recentIssuesLoading, isError: recentIssuesError } = useGetAssignedTasks(5);

	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const menuRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
				setIsMenuOpen(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	const handleLogout = () => {
		localStorage.removeItem('access_token');
		localStorage.removeItem('refresh_token');
		localStorage.removeItem('projectKey');
		navigate('/login');
	};

	return (
		<PageContainer>
			<Header>
				<UserMenu ref={menuRef}>
					{me && <Button type="secondary" label={me.name} onClick={() => setIsMenuOpen((prev) => !prev)} />}
					<IconButton type="normal" iconName="IcnSetting" onClick={() => navigate('/setting')} />
					{isMenuOpen && me && (
						<DropdownMenu>
							<UserInfo>
								<InfoLabel>이름</InfoLabel>
								<InfoValue>{me.name}</InfoValue>
							</UserInfo>
							<UserInfo>
								<InfoLabel>이메일</InfoLabel>
								<InfoValue>{me.email}</InfoValue>
							</UserInfo>
							<Divider />
							<LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
						</DropdownMenu>
					)}
				</UserMenu>
			</Header>
			<PageLayout>
				<MemberModal open={open} onClose={() => setOpen(false)} />

				<PageTitle>내 작업</PageTitle>

				<Section>
					<SectionHeader>
						<SectionTitle>프로젝트</SectionTitle>
						<Button type="primary" label="+ 새 프로젝트" onClick={handleAddProject} />
						{showModal && <ProjectDetailModal onClose={() => setShowModal(false)} onCreate={handleCreateProject} />}
					</SectionHeader>
					<ProjectGrid>
						{isLoading && <div>로딩 중...</div>}
						{isError && <div>프로젝트 불러오기 실패</div>}
						{projects &&
							projects.map((project) => (
								<ProjectCard key={project.projectKey}>
									<CardHeader
										onClick={() => {
											useProjectKeyStore.getState().setProjectKey(project.projectKey);
											navigate('/boards');
										}}
									>
										<ProjectIntoTitle>{project.name}</ProjectIntoTitle>
										<ProjectInfoDesc>{project.description}</ProjectInfoDesc>
									</CardHeader>
									<CardFooter>
										<FooterActions>
											<Button
												type="text"
												label="멤버 관리"
												onClick={() => {
													useProjectKeyStore.setState({ projectKey: project.projectKey });
													setOpen(true);
												}}
											/>
											<Button type="text" label="GitHub 연결" onClick={() => handleInstallClick(project.projectKey)} />
										</FooterActions>
										<FooterIconActions>
											<IconButton type="normal" iconName="IcnModify" onClick={() => handleEditProject(project)} />
											<IconButton
												type="normal"
												iconName="IcnDelete"
												onClick={() => handleDeleteProject(project.projectKey)}
											/>
										</FooterIconActions>
									</CardFooter>
								</ProjectCard>
							))}
					</ProjectGrid>
					{/* 수정 모달 */}
					{editTarget && (
						<ProjectDetailModal
							defaultValue={editTarget}
							onClose={() => setEditTarget(null)}
							onCreate={handleUpdateProject}
							isEdit
						/>
					)}
				</Section>

				<Section>
					<SectionHeader>
						<SectionTitle>최근 내 이슈</SectionTitle>
					</SectionHeader>
					<IssueList>
						{recentIssuesLoading && <Message>로딩 중...</Message>}
						{recentIssuesError && <Message>이슈를 불러오는 데 실패했습니다.</Message>}
						{!recentIssuesLoading && !recentIssuesError && recentIssues?.length === 0 && (
							<Message>최근 이슈가 없습니다.</Message>
						)}
						{!recentIssuesLoading &&
							!recentIssuesError &&
							recentIssues?.map((issue) => (
								<IssueItem key={issue.id}>
									<IssueName>{issue.name}</IssueName>
									<IssueDueDate>
										마감일: {issue.dueDate ? new Date(issue.dueDate).toLocaleDateString() : '미정'}
									</IssueDueDate>
								</IssueItem>
							))}
					</IssueList>
				</Section>
			</PageLayout>
		</PageContainer>
	);
}

export default DashBoardPage;

const PageContainer = styled.div`
	display: flex;
	flex-direction: column;
	background: ${({ theme }) => theme.ui.background};
	min-height: 100vh;
`;

const Header = styled.header`
	display: flex;
	justify-content: flex-end;
	align-items: center;
	padding: 1.6rem 6rem;
	border-bottom: 1px solid ${({ theme }) => theme.ui.border};
`;

const UserMenu = styled.div`
	display: flex;
	align-items: center;
	gap: 0.8rem;
	position: relative;
`;

const PageLayout = styled.div`
	display: flex;
	flex-direction: column;
	gap: 3rem;
	padding: 3rem 6rem;
`;

const PageTitle = styled.h1`
	font-size: 2.8rem;
	font-weight: 700;
	color: ${({ theme }) => theme.text.primary};
`;

const Section = styled.section`
	display: flex;
	flex-direction: column;
	gap: 2rem;
`;

const SectionHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const SectionTitle = styled.h2`
	font-size: 2rem;
	font-weight: 600;
	color: ${({ theme }) => theme.text.primary};
`;

const ProjectGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
	gap: 2rem;
`;

const ProjectCard = styled.div`
	background: ${({ theme }) => theme.ui.panel};
	border-radius: 8px;
	box-shadow: 0 4px 12px ${({ theme }) => theme.ui.shadow};
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	transition:
		transform 0.2s ease-in-out,
		box-shadow 0.2s ease-in-out;

	&:hover {
		transform: translateY(-4px);
		box-shadow: 0 8px 24px ${({ theme }) => theme.ui.shadow};
	}
`;

const CardHeader = styled.div`
	padding: 2rem;
	cursor: pointer;
	flex-grow: 1;
`;

const ProjectIntoTitle = styled.h3`
	font-size: 1.8rem;
	font-weight: 600;
	color: ${({ theme }) => theme.text.primary};
	margin-bottom: 0.8rem;
`;

const ProjectInfoDesc = styled.p`
	font-size: 1.4rem;
	color: ${({ theme }) => theme.text.secondary};
	line-height: 1.6;
	height: 6.7rem; /* 3 lines with 1.6 line-height */
	display: -webkit-box;
	-webkit-line-clamp: 3;
	-webkit-box-orient: vertical;
	overflow: hidden;
	text-overflow: ellipsis;
`;

const CardFooter = styled.div`
	padding: 1rem 2rem;
	border-top: 1px solid ${({ theme }) => theme.ui.border};
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const FooterActions = styled.div`
	display: flex;
	gap: 1rem;
`;

const FooterIconActions = styled.div`
	display: flex;
	gap: 0.5rem;
`;

const IssueList = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
`;

const IssueItem = styled.div`
	padding: 1rem 1.2rem;
	background-color: ${({ theme }) => theme.ui.panel};
	border-radius: 6px;
	border: 1px solid ${({ theme }) => theme.ui.border};
	font-size: 1.4rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
	transition: background-color 0.2s;

	&:hover {
		background-color: ${({ theme }) => theme.color.Grey[200]};
	}
`;

const IssueName = styled.span`
	font-weight: 500;
	color: ${({ theme }) => theme.text.primary};
`;

const IssueDueDate = styled.span`
	font-size: 1.2rem;
	color: ${({ theme }) => theme.text.secondary};
`;

const Message = styled.div`
	padding: 2rem;
	text-align: center;
	font-size: 1.4rem;
	color: ${({ theme }) => theme.text.secondary};
`;

const DropdownMenu = styled.div`
	position: absolute;
	top: 100%;
	right: 0;
	margin-top: 1rem;
	width: 240px;
	background-color: ${({ theme }) => theme.ui.panel};
	border: 1px solid ${({ theme }) => theme.ui.border};
	border-radius: 8px;
	box-shadow: 0 4px 12px ${({ theme }) => theme.ui.shadow};
	padding: 0;
	overflow: hidden;
	display: flex;
	flex-direction: column;
	gap: 1rem;
	z-index: 10;
`;

const UserInfo = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.4rem;
	padding: 1.2rem;
`;

const InfoLabel = styled.span`
	font-size: 1.2rem;
	color: ${({ theme }) => theme.text.secondary};
`;

const InfoValue = styled.span`
	font-size: 1.5rem;
	font-weight: 500;
	color: ${({ theme }) => theme.text.primary};
`;

const Divider = styled.div`
	height: 1px;
	background-color: ${({ theme }) => theme.ui.border};
	margin: 0;
`;

const LogoutButton = styled.button`
	width: 100%;
	padding: 1.2rem;
	background: none;
	border: none;
	font-size: 1.4rem;
	font-weight: 500;
	color: ${({ theme }) => theme.color.Red[600]};
	text-align: left;
	cursor: pointer;

	&:hover {
		background-color: ${({ theme }) => theme.color.Red[100]};
	}
`;
