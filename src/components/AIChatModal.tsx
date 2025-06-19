import { useState } from 'react';
import styled from '@emotion/styled';
import Icon from './common/Icon';
import { TaskType } from '@/types/TaskType';
import { useImportTodosFromText } from '@/apis/ai/query';
import useProjectKeyStore from '@/stores/useProjectKeyStore';
import Task from './Task';
import Button from './common/Button';
import { css } from '@emotion/react';

type AIChatModalProps = {
	columnId: number;
	onClose: () => void;
};

const AIChatModal = ({ columnId, onClose }: AIChatModalProps) => {
	const [input, setInput] = useState('');
	const [tasks, setTasks] = useState<TaskType[]>([]);
	const projectKey = useProjectKeyStore((store) => store.projectKey);

	const { mutate, isPending, error } = useImportTodosFromText(projectKey, columnId);

	const handleGenerateIssues = () => {
		if (!input.trim()) return;
		mutate(
			{ text: input },
			{
				onSuccess: (data) => {
					setTasks(data);
				},
				onError: (e) => {
					console.error(e);
					// 에러 처리 UI 추가 가능
				},
			}
		);
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
						<GenerateButton onClick={handleGenerateIssues} disabled={isPending}>
							{isPending ? '생성 중...' : '이슈 자동 생성'}
							<Icon name="IcnEnter" />
						</GenerateButton>
						{error && <ErrorText>생성 중 오류가 발생했습니다.</ErrorText>}
					</InputContainer>

					<RightSection>
						<ModalTitle>생성된 이슈</ModalTitle>
						<IssueList>
							{tasks.map((task) => (
								<Task key={task.id} task={task} />
							))}
						</IssueList>
						<Button type="outlined-primary" label="확인(닫기)" onClick={onClose} additionalCss={ButtonCSS} />
					</RightSection>
				</ModalBody>
			</ModalContent>
		</ModalOverlay>
	);
};

export default AIChatModal;

/* …styled components 생략… */

const ErrorText = styled.div`
	margin-top: 0.5rem;
	color: red;
	font-size: 1.4rem;
`;

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

	gap: 5rem; /* 카드 간 간격 */
	overflow: hidden; /* 스크롤 비활성화 */
	overflow-y: scroll; /* 스크롤 활성화 */
`;

const RightSection = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	gap: 2rem;
	box-sizing: border-box;
	width: 100%;
	height: 100%;
`;

const ButtonCSS = css`
	position: absolute;
	bottom: 60px;
	right: 10px;
`;
