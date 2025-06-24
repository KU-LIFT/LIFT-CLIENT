import { useState, useRef } from 'react';
import styled from '@emotion/styled';
import { TaskType } from '@/types/TaskType';
import { useImportTodosFromText, useImportTodosFromFile } from '@/apis/ai/query';
import useProjectKeyStore from '@/stores/useProjectKeyStore';
import Task from './Task';
import Button from './common/Button';
import IconButton from './common/IconButton';

type AIChatModalProps = {
	columnId: number;
	onClose: () => void;
};

const AIChatModal = ({ columnId, onClose }: AIChatModalProps) => {
	const [input, setInput] = useState('');
	const [tasks, setTasks] = useState<TaskType[]>([]);
	const projectKey = useProjectKeyStore((store) => store.projectKey);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const { mutate, isPending, error } = useImportTodosFromText(projectKey, columnId);
	const {
		mutate: importFromFile,
		isPending: isImporting,
		error: importError,
	} = useImportTodosFromFile(projectKey, columnId);

	const handleGenerateIssues = () => {
		if (!input.trim()) return;
		mutate(
			{ text: input },
			{
				onSuccess: (data) => {
					setTasks(data);
				},
			}
		);
	};

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			importFromFile(
				{ file },
				{
					onSuccess: (data) => {
						setTasks(data);
					},
				}
			);
		}
	};

	const handleFileUploadClick = () => {
		fileInputRef.current?.click();
	};

	return (
		<BackDrop onClick={(e) => (e.target === e.currentTarget ? onClose() : null)}>
			<ModalContainer>
				<ModalHeader>
					<Title>AI로 태스크 생성</Title>
					<IconButton type="normal" iconName="IcnX" onClick={onClose} />
				</ModalHeader>
				<ModalBody>
					<LeftPanel>
						<SubTitle>1. 요구사항 입력</SubTitle>
						<Textarea
							placeholder="예시) 로그인 페이지를 만들어줘. 아이디와 비밀번호 입력 필드, 그리고 로그인 버튼이 필요해."
							value={input}
							onChange={(e) => setInput(e.target.value)}
						/>
						<ButtonContainer>
							<Button
								type="primary"
								onClick={handleGenerateIssues}
								disabled={isPending || isImporting}
								label={isPending ? '생성 중...' : '자동 생성'}
							/>
							<FileUploadButton onClick={handleFileUploadClick} disabled={isPending || isImporting}>
								파일 업로드
							</FileUploadButton>
							<input type="file" ref={fileInputRef} onChange={handleFileChange} style={{ display: 'none' }} />
						</ButtonContainer>
						{(error || importError) && <ErrorText>오류: 태스크 생성에 실패했습니다. 다시 시도해주세요.</ErrorText>}
					</LeftPanel>
					<RightPanel>
						<SubTitle>2. 생성된 태스크 확인</SubTitle>
						<IssueList>
							{tasks.length > 0 ? (
								tasks.map((task) => <Task key={task.id} task={task} />)
							) : (
								<Placeholder>
									{isPending || isImporting
										? 'AI가 태스크를 생성하고 있습니다...'
										: '이곳에 생성된 태스크가 표시됩니다.'}
								</Placeholder>
							)}
						</IssueList>
					</RightPanel>
				</ModalBody>
				<ModalFooter>
					<Button type="secondary" label="닫기" onClick={onClose} />
				</ModalFooter>
			</ModalContainer>
		</BackDrop>
	);
};

export default AIChatModal;

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
	width: 80vw;
	max-width: 1200px;
	height: 80vh;
	background-color: ${({ theme }) => theme.ui.panel};
	border-radius: 8px;
	box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
	display: flex;
	flex-direction: column;
	overflow: hidden;
	overflow-y: auto;
`;

const ModalHeader = styled.header`
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

const ModalBody = styled.main`
	display: flex;
	flex-grow: 1;
	height: 100%;
`;

const Panel = styled.div`
	padding: 2rem;
	display: flex;
	flex-direction: column;
	gap: 1.6rem;
`;

const LeftPanel = styled(Panel)`
	width: 50%;
	border-right: 1px solid ${({ theme }) => theme.ui.border};
`;

const RightPanel = styled(Panel)`
	width: 50%;
`;

const SubTitle = styled.h3`
	font-size: 1.6rem;
	font-weight: 600;
	color: ${({ theme }) => theme.text.primary};
	margin-bottom: 0.8rem;
`;

const Textarea = styled.textarea`
	width: 100%;
	height: 100%;
	padding: 1.2rem;
	font-size: 1.4rem;
	background-color: ${({ theme }) => theme.ui.background};
	border: 1px solid ${({ theme }) => theme.ui.border};
	border-radius: 6px;
	color: ${({ theme }) => theme.text.primary};
	resize: none;
	box-sizing: border-box;
	font-family: inherit;

	&:focus {
		outline: none;
		border-color: ${({ theme }) => theme.interactive.primary};
	}
`;

const ButtonContainer = styled.div`
	display: flex;
	gap: 1rem;
	align-items: center;
`;

const FileUploadButton = styled.button`
	background: none;
	border: none;
	color: ${({ theme }) => theme.text.primary};
	cursor: pointer;
	font-size: 1.4rem;
	padding: 0;
	text-decoration: underline;

	&:hover {
		color: ${({ theme }) => theme.interactive.primary};
	}

	&:disabled {
		color: ${({ theme }) => theme.text.disabled};
		cursor: not-allowed;
	}
`;

const ErrorText = styled.p`
	font-size: 1.4rem;
	color: ${({ theme }) => theme.interactive.danger};
`;

const IssueList = styled.div`
	flex-grow: 1;
	overflow-y: auto;
	display: flex;
	flex-direction: column;
	gap: 1.2rem;
	padding-right: 1rem;
`;

const Placeholder = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100%;
	color: ${({ theme }) => theme.text.secondary};
	font-size: 1.6rem;
`;

const ModalFooter = styled.footer`
	display: flex;
	justify-content: flex-end;
	gap: 1rem;
	padding: 1.6rem 2rem;
	border-top: 1px solid ${({ theme }) => theme.ui.border};
	flex-shrink: 0;
`;
