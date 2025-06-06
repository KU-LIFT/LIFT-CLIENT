import { useState } from 'react';
import styled from '@emotion/styled';
import CardStatus from './CardStatus';
import Icon from './common/Icon';

type Issue = {
	id: number;
	name: string;
	description: string;
	columnId: number;
	assigneeId: number;
	priority: string;
	dueDate: string | null;
	tags: string[];
	createdAt: string;
	updatedAt: string | null;
	createdById: number;
	updatedById: number | null;
};

const dummyIssues: Issue[] = [
	{
		id: 1,
		name: '사용자 인증',
		description: '이메일/비밀번호 로그인, OAuth2(Google, GitHub) 로그인',
		columnId: 1,
		assigneeId: 1,
		priority: 'MEDIUM',
		dueDate: null,
		tags: ['AI-import'],
		createdAt: '2025-05-06T07:04:15.879990666',
		updatedAt: null,
		createdById: 1,
		updatedById: null,
	},
	{
		id: 2,
		name: '게시물 관리',
		description: '텍스트·이미지·동영상 업로드, 댓글·대댓글 기능, 좋아요·공유 기능',
		columnId: 1,
		assigneeId: 1,
		priority: 'MEDIUM',
		dueDate: null,
		tags: ['AI-import'],
		createdAt: '2025-05-06T07:04:15.901483113',
		updatedAt: null,
		createdById: 1,
		updatedById: null,
	},
	{
		id: 3,
		name: '알림',
		description: '팔로우 사용자 활동 알림, 댓글·좋아요 알림',
		columnId: 1,
		assigneeId: 1,
		priority: 'MEDIUM',
		dueDate: null,
		tags: ['AI-import'],
		createdAt: '2025-05-06T07:04:15.913090004',
		updatedAt: null,
		createdById: 1,
		updatedById: null,
	},
	{
		id: 4,
		name: '사용자 설정',
		description: '프로필 수정, 알림 설정',
		columnId: 1,
		assigneeId: 1,
		priority: 'MEDIUM',
		dueDate: null,
		tags: ['AI-import'],
		createdAt: '2025-05-06T07:04:15.922222041',
		updatedAt: null,
		createdById: 1,
		updatedById: null,
	},
	{
		id: 5,
		name: '팔로우 기능',
		description: '사용자 간 팔로우 및 언팔로우 기능 구현',
		columnId: 1,
		assigneeId: 1,
		priority: 'LOW',
		dueDate: null,
		tags: ['AI-import'],
		createdAt: '2025-05-06T07:04:15.933512000',
		updatedAt: null,
		createdById: 1,
		updatedById: null,
	},
	{
		id: 6,
		name: '이미지 최적화',
		description: '업로드된 이미지 리사이징 및 압축 처리',
		columnId: 1,
		assigneeId: 1,
		priority: 'LOW',
		dueDate: null,
		tags: ['AI-import'],
		createdAt: '2025-05-06T07:04:15.944000000',
		updatedAt: null,
		createdById: 1,
		updatedById: null,
	},
	{
		id: 7,
		name: '접근 제어',
		description: '비공개 게시물, 신고 기능, 차단 사용자 처리',
		columnId: 1,
		assigneeId: 1,
		priority: 'HIGH',
		dueDate: null,
		tags: ['AI-import'],
		createdAt: '2025-05-06T07:04:15.955000000',
		updatedAt: null,
		createdById: 1,
		updatedById: null,
	},
	{
		id: 8,
		name: '댓글 정렬 기능',
		description: '좋아요순, 최신순 등 댓글 정렬 기능 추가',
		columnId: 1,
		assigneeId: 1,
		priority: 'MEDIUM',
		dueDate: null,
		tags: ['AI-import'],
		createdAt: '2025-05-06T07:04:15.966000000',
		updatedAt: null,
		createdById: 1,
		updatedById: null,
	},
];

const AIChatModal = ({ onClose }: { onClose: () => void }) => {
	const [input, setInput] = useState('');
	const [issues, setIssues] = useState<Issue[]>([]);

	const handleGenerateIssues = () => {
		// 이슈 자동 생성 로직 (여기서는 dummyIssues를 사용)
		setIssues(dummyIssues);
	};

	return (
		<ModalOverlay>
			<ModalContent>
				<ModalHeader>
					<ModalTitle>AI 이슈 생성</ModalTitle>
					<CloseButton onClick={onClose}>X</CloseButton>
				</ModalHeader>
				<ModalBody>
					<InputContainer>
						<TextArea placeholder="요구사항을 입력하세요..." value={input} onChange={(e) => setInput(e.target.value)} />
						<GenerateButton onClick={handleGenerateIssues}>
							이슈 자동 생성
							<Icon name="IcnEnter" />
						</GenerateButton>
					</InputContainer>

					<RightSection>
						<ModalTitle>생성된 이슈</ModalTitle>
						<IssueList>
							{issues.map((issue) => (
								<CardItem key={issue.id}>
									<CardStatus status="TODO" />
									<CardTitle>{issue.name}</CardTitle>
									<CardDescription>{issue.description}</CardDescription>
								</CardItem>
							))}
						</IssueList>
					</RightSection>
				</ModalBody>
			</ModalContent>
		</ModalOverlay>
	);
};

export default AIChatModal;

const ModalOverlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 1000;
`;

const ModalContent = styled.div`
	width: 80%;
	height: 80%;
	background: white;
	border-radius: 12px;
	padding: 3rem;
	box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
	display: flex;
	flex-direction: column;
	gap: 2rem;

	overflow: hidden;
`;

const ModalHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-bottom: 1px solid #e0e0e0;
	padding-bottom: 1rem;
`;

const ModalTitle = styled.h2`
	font-size: 2.4rem;
	font-weight: 700;
	color: #333;
`;

const CloseButton = styled.button`
	background: none;
	border: none;
	font-size: 2rem;
	cursor: pointer;
`;

const ModalBody = styled.div`
	display: flex;
	flex-direction: column;
	gap: 5rem;
`;

const InputContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 2rem;

	height: 40rem;
	max-height: 60rem;
`;

const TextArea = styled.textarea`
	padding: 2rem;
	box-sizing: border-box;
	font-size: 1.8rem;
	border: 1px solid #ccc;
	border-radius: 8px;
	resize: none; /* 사용자가 크기를 조정하지 못하도록 설정 */
	width: 100%;
	height: 100%; /* 높이를 늘려 더 많은 텍스트를 입력할 수 있도록 설정 */
	line-height: 1.8rem;
`;

const GenerateButton = styled.button`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: row;

	width: fit-content;
	height: fit-content;
	padding: 1rem 2rem;
	font-size: 2rem;
	color: white;
	background-color: #007bff;
	border: none;
	border-radius: 8px;
	cursor: pointer;
	transition: background-color 0.2s ease;

	gap: 1rem;

	&:hover {
		background-color: #0056b3;
	}
`;

const IssueList = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 1fr);

	gap: 0.5rem; /* 카드 간 간격 */
	height: 60rem;
	overflow: hidden; /* 스크롤 비활성화 */
	overflow-y: scroll; /* 스크롤 활성화 */
`;

const CardItem = styled.div`
	width: 34rem;
	height: 14rem;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;

	border: 2px solid ${({ theme }) => theme.colors.border};
	border-radius: 20px;
	background-color: ${({ theme }) => theme.colors.cardBackground};
	box-shadow: 0 4px 8px ${({ theme }) => theme.colors.shadow};

	box-sizing: border-box;
	padding: 2rem;

	gap: 1.5rem;

	cursor: pointer;

	&:hover {
		transform: translateY(-2px);
		box-shadow: 0 6px 16px rgba(0, 0, 0, 0.06);
	}
`;

const CardTitle = styled.p`
	font-size: 2rem;
	font-weight: 500;
	color: ${({ theme }) => theme.colors.title};
`;

const CardDescription = styled.p`
	font-size: 1.6rem;
	font-weight: 400;
	line-height: 2.4rem;
	color: ${({ theme }) => theme.colors.secondaryText};
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 1; /* 최대 2줄로 제한 */
	-webkit-box-orient: vertical;
`;

const RightSection = styled.div`
	display: flex;
	flex-direction: column;
	gap: 2rem;
	width: 100%;
	height: 100%;
`;
