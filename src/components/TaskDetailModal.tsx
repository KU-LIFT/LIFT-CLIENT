import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { useUpdateTask } from '@/apis/task/query';
import useProjectKeyStore from '@/stores/useProjectKeyStore';
import { TaskType } from '@/types/TaskType';
import { UpdateTaskRequest } from '@/apis/task/Task';
import Button from './common/Button';
import IconButton from './common/IconButton';
import { useProjectBranches, useCreateBranch, useCommits, usePullRequests } from '@/apis/git/query';
import { useGetMembers } from '@/apis/member/query';
import { css } from '@emotion/react';
import { useQueryClient } from '@tanstack/react-query';
import { getMemberType } from '@/apis/member/Member';

const TaskDetailModal = ({
	open,
	task,
	onClose,
	onBranchLinked,
}: {
	open: boolean;
	task: TaskType;
	onClose: () => void;
	onBranchLinked?: () => void;
}) => {
	const projectKey = useProjectKeyStore((store) => store.projectKey);
	const queryClient = useQueryClient();
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [assigneeId, setAssigneeId] = useState<number | undefined>();
	const updateTaskMutation = useUpdateTask(projectKey, task.id);
	const [dueDate, setDueDate] = useState('');

	const { data: members = [] } = useGetMembers(projectKey);

	// --- Github 연동 관련 ---
	const { data: branches, isLoading: isBranchesLoading, isError: isBranchesError } = useProjectBranches(projectKey);
	const createBranchMutation = useCreateBranch(projectKey, task.id);
	const [newBranch, setNewBranch] = useState('');
	const [baseBranch, setBaseBranch] = useState('');
	const [selectedBranch, setSelectedBranch] = useState(task.githubBranch || '');
	const [tempSelectedBranch, setTempSelectedBranch] = useState(task.githubBranch || '');
	const { data: commits } = useCommits(projectKey, task.id);
	const { data: pullRequests } = usePullRequests(projectKey, task.id);

	useEffect(() => {
		if (task && members.length > 0) {
			setName(task.name);
			setDescription(task.description ?? '');
			setSelectedBranch(task.githubBranch || '');
			setTempSelectedBranch(task.githubBranch || '');
			setDueDate(task.dueDate?.split('T')[0] || '');

			if (task.assignee) {
				const assignedMember = members.find((member: getMemberType) => member.name === task.assignee);
				if (assignedMember) {
					setAssigneeId(assignedMember.id);
				}
			} else {
				setAssigneeId(undefined);
			}
		}
	}, [task, members]);

	// 태스크의 이름, 설명, 브랜치 등 모든 정보를 업데이트하는 함수
	const handleUpdate = (branchToUpdate?: string) => {
		if (!name) {
			alert('태스크 이름은 필수 항목입니다.');
			return;
		}
		if (!assigneeId) {
			alert('담당자를 지정해주세요.');
			return;
		}

		// 선택된 날짜를 ISO 형식으로 변환
		const formattedDueDate = dueDate ? new Date(dueDate).toISOString() : null;

		const payload: UpdateTaskRequest = {
			name,
			description,
			columnId: task.columnId,
			assigneeId,
			priority: task.priority,
			dueDate: formattedDueDate,
			githubBranch: branchToUpdate || selectedBranch,
		};

		updateTaskMutation.mutate(payload, {
			onSuccess: () => {
				if (branchToUpdate) {
					setSelectedBranch(branchToUpdate);
					alert('브랜치가 연동되었습니다!');
					queryClient.invalidateQueries({ queryKey: ['gitCommits', projectKey, task.id] });
					onBranchLinked?.();
				} else {
					onClose(); // 저장 버튼을 누른 경우 모달 닫기
				}
			},
			onError: (error: any) => console.error(error.response?.data),
		});
	};

	// 새 브랜치를 '생성'하고 태스크에 연결하는 함수
	const handleCreateAndLinkBranch = (branchName: string, baseBranchName?: string) => {
		createBranchMutation.mutate(
			{ newBranch: branchName, baseBranch: baseBranchName },
			{
				onSuccess: () => {
					setSelectedBranch(branchName);
					setTempSelectedBranch(branchName);
					alert('브랜치가 생성 및 연동되었습니다!');
					onBranchLinked?.();
				},
				onError: (err: any) => {
					alert(err?.response?.data?.message || '브랜치 생성 실패');
				},
			}
		);
	};

	if (!open) return null;
	return (
		<BackDrop
			onClick={(e) => {
				if (e.target === e.currentTarget) {
					onClose();
				}
			}}
		>
			<ModalContainer>
				<ModalHeader>
					<Title>태스크 상세조회</Title>
					<IconButton type="normal" iconName="IcnX" onClick={onClose} />
				</ModalHeader>
				<ModalContent>
					<Input value={name} onChange={(e) => setName(e.target.value)} placeholder="task 이름" />
					<Textarea
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						placeholder="태스크에 대한 간단한 설명을 입력하세요."
						rows={5}
					/>
					<div>
						<Label>담당자</Label>
						<AssigneeSelect value={assigneeId} onChange={(e) => setAssigneeId(Number(e.target.value))}>
							<option value="">담당자 선택</option>
							{members.map((member: any) => (
								<option key={member.id} value={member.id}>
									{member.name}
								</option>
							))}
						</AssigneeSelect>
					</div>

					{/* --- 깃 브랜치 연동 UI --- */}
					<GithubSection>
						<GithubSectionTitle>깃 브랜치 연동</GithubSectionTitle>
						<BranchRow>
							<BranchSelect
								value={tempSelectedBranch}
								onChange={(e) => setTempSelectedBranch(e.target.value)}
								disabled={isBranchesLoading}
							>
								{isBranchesLoading && <option>브랜치 목록 로딩 중...</option>}
								{isBranchesError && <option>브랜치를 불러올 수 없습니다.</option>}
								{!isBranchesLoading && !isBranchesError && (
									<>
										<option value="">브랜치 선택</option>
										{branches?.map((b) => (
											<option key={b.name} value={b.name}>
												{b.name}
											</option>
										))}
									</>
								)}
							</BranchSelect>
							<Button
								type="primary"
								label="연동"
								onClick={() => handleUpdate(tempSelectedBranch)}
								additionalCss={css`
									min-width: 80px;
								`}
								disabled={!tempSelectedBranch || tempSelectedBranch === selectedBranch}
							/>
						</BranchRow>
						<BranchRow>
							<InputSmall value={newBranch} onChange={(e) => setNewBranch(e.target.value)} placeholder="새 브랜치명" />
							<InputSmall
								value={baseBranch}
								onChange={(e) => setBaseBranch(e.target.value)}
								placeholder="기준 브랜치(선택)"
							/>
							<Button
								type="primary"
								label="생성+연동"
								onClick={() => handleCreateAndLinkBranch(newBranch, baseBranch)}
								additionalCss={css`
									min-width: 120px;
								`}
								disabled={!newBranch}
							/>
						</BranchRow>
						{selectedBranch && (
							<CurrentBranch>
								현재 연동 브랜치: <b>{selectedBranch}</b>
							</CurrentBranch>
						)}
					</GithubSection>

					<DateSection>
						<DateInfo>
							<DateLabel>생성일</DateLabel>
							<DateValue>{task ? new Date(task.createdAt).toLocaleString() : ''}</DateValue>
						</DateInfo>
						<DateInfo>
							<DateLabel>수정일</DateLabel>
							<DateValue>{task?.updatedAt ? new Date(task.updatedAt).toLocaleString() : 'N/A'}</DateValue>
						</DateInfo>
						<DateInfo>
							<DateLabel>마감일</DateLabel>
							<Input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
						</DateInfo>
					</DateSection>

					{/* --- 커밋 리스트 --- */}
					{selectedBranch && (
						<CommitSection>
							<CommitSectionTitle>커밋 내역</CommitSectionTitle>
							<CommitList>
								{commits?.map((c) => (
									<CommitItem key={c.sha}>
										<div>
											<b>{c.commit.message}</b>
										</div>
										<div>
											by {c.commit.author.name} ({c.commit.author.date.slice(0, 10)})
										</div>
										<div className="commit-meta">
											SHA: {c.sha.slice(0, 7)}
											{c.html_url && (
												<a className="commit-link" href={c.html_url} target="_blank" rel="noreferrer">
													자세히
												</a>
											)}
										</div>
									</CommitItem>
								))}
							</CommitList>
						</CommitSection>
					)}

					{/* --- PR 리스트 --- */}
					{selectedBranch && pullRequests && pullRequests.length > 0 && (
						<PrSection>
							<PrSectionTitle>Pull Request 내역</PrSectionTitle>
							<PrList>
								{pullRequests.map((pr) => (
									<PrItem key={pr.sha}>
										<div>
											<b>PR #{pr.sha.slice(0, 7)}</b>
										</div>
										<div className="pr-meta">
											상태: <span className={`pr-state ${pr.state}`}>{pr.state}</span>
											{pr.url && (
												<a className="pr-link" href={pr.url} target="_blank" rel="noreferrer">
													GitHub에서 보기
												</a>
											)}
										</div>
									</PrItem>
								))}
							</PrList>
						</PrSection>
					)}
				</ModalContent>
				<ModalFooter>
					<Button type="secondary" label="취소" onClick={onClose} />
					<Button type="primary" label="저장" onClick={() => handleUpdate()} />
				</ModalFooter>
			</ModalContainer>
		</BackDrop>
	);
};

export default TaskDetailModal;

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
	width: 500px;
	min-height: 80vh;
	max-height: 90vh;
	background-color: ${({ theme }) => theme.ui.panel};
	border-radius: 8px;
	box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
	display: flex;
	flex-direction: column;
`;

const ModalHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 1.6rem 2rem;
	border-bottom: 1px solid ${({ theme }) => theme.ui.border};
`;

const Title = styled.h2`
	font-size: 1.8rem;
	font-weight: 600;
	color: ${({ theme }) => theme.text.primary};
`;

const ModalContent = styled.div`
	padding: 2rem;
	display: flex;
	flex-direction: column;
	gap: 1.6rem;
`;

const inputBaseStyles = (theme: any) => `
	width: 100%;
	padding: 1rem 1.2rem;
	font-size: 1.4rem;
	background-color: ${theme.ui.background};
	border: 1px solid ${theme.ui.border};
	border-radius: 6px;
	color: ${theme.text.primary};
	transition: border-color 0.2s;
	box-sizing: border-box;

	&:focus {
		outline: none;
		border-color: ${theme.interactive.primary};
	}

	&::placeholder {
		color: ${theme.text.disabled};
	}

	&:disabled {
		background-color: ${theme.ui.border};
		cursor: not-allowed;
	}
`;

const Input = styled.input`
	${({ theme }) => inputBaseStyles(theme)}
	font-size: 1.7rem;
`;

const Textarea = styled.textarea`
	${({ theme }) => inputBaseStyles(theme)}
	resize: vertical;
	font-family: inherit;
	font-size: 1.5rem;
`;

const ModalFooter = styled.div`
	display: flex;
	justify-content: flex-end;
	gap: 1rem;
	padding: 1.6rem 2rem;
	border-top: 1px solid ${({ theme }) => theme.ui.border};
`;

const GithubSection = styled.div`
	margin-top: 2rem;
	padding: 1.2rem;
	background: ${({ theme }) => theme.ui.background};
	border-radius: 8px;
	border: 1px solid ${({ theme }) => theme.ui.border};
	display: flex;
	flex-direction: column;
	gap: 1.2rem;
`;
const GithubSectionTitle = styled.h3`
	font-size: 1.3rem;
	font-weight: 600;
	color: ${({ theme }) => theme.text.primary};
	margin-bottom: 0.5rem;
`;
const BranchRow = styled.div`
	display: flex;
	gap: 1rem;
	align-items: center;
`;
const BranchSelect = styled.select`
	min-width: 160px;
	padding: 0.9rem 1.4rem;
	border-radius: 6px;
	border: 1.5px solid ${({ theme }) => theme.ui.border};
	background: ${({ theme }) => theme.ui.background};
	color: ${({ theme }) => theme.text.primary};
	font-size: 1.5rem;
	font-weight: 500;
	transition: border 0.2s;
	&:hover,
	&:focus {
		border-color: ${({ theme }) => theme.interactive.primary};
		outline: none;
	}
`;
const InputSmall = styled.input`
	width: 150px;
	padding: 0.8rem 1.2rem;
	font-size: 1.4rem;
	border-radius: 6px;
	border: 1px solid ${({ theme }) => theme.ui.border};
	background: ${({ theme }) => theme.ui.panel};
	color: ${({ theme }) => theme.text.primary};
`;
const CurrentBranch = styled.div`
	margin-top: 0.5rem;
	font-size: 1.2rem;
	color: ${({ theme }) => theme.text.secondary};
`;
const CommitSection = styled.div`
	margin-top: 2.4rem;
`;
const CommitSectionTitle = styled.h4`
	font-size: 1.2rem;
	font-weight: 600;
	color: ${({ theme }) => theme.text.primary};
	margin-bottom: 0.5rem;
`;
const CommitList = styled.ul`
	list-style: none;
	padding: 0;
	margin: 0;
	border-radius: 8px;
	background: ${({ theme }) => theme.ui.panel};
	border: none;
	display: flex;
	flex-direction: column;
	gap: 1.2rem;
	max-height: 220px;
	overflow-y: auto;
`;
const CommitItem = styled.li`
	background: ${({ theme }) => theme.ui.background};
	border-radius: 8px;
	box-shadow: 0 2px 8px ${({ theme }) => theme.ui.shadow};
	padding: 1.4rem 2rem;
	display: flex;
	flex-direction: column;
	gap: 0.7rem;
	font-size: 1.4rem;
	color: ${({ theme }) => theme.text.primary};
	transition: box-shadow 0.2s;
	&:hover {
		box-shadow: 0 4px 16px ${({ theme }) => theme.ui.shadow};
	}
	b {
		font-size: 1.5rem;
		color: ${({ theme }) => theme.text.accent};
	}
	.commit-meta {
		display: flex;
		align-items: center;
		gap: 1.2rem;
		font-size: 1.2rem;
	}
	.commit-link {
		color: ${({ theme }) => theme.interactive.primary};
		text-decoration: underline;
		font-size: 1.2rem;
		margin-left: 0.5rem;
	}
	.pr-link {
		color: ${({ theme }) => theme.interactive.primary};
		font-weight: 600;
		margin-left: 0.5rem;
		font-size: 1.2rem;
		text-decoration: underline;
	}
`;

const PrSection = styled.div`
	margin-top: 2.4rem;
`;

const PrSectionTitle = styled.h4`
	font-size: 1.2rem;
	font-weight: 600;
	color: ${({ theme }) => theme.text.primary};
	margin-bottom: 0.5rem;
`;

const PrList = styled.ul`
	list-style: none;
	padding: 0;
	margin: 0;
	border-radius: 8px;
	background: ${({ theme }) => theme.ui.panel};
	border: none;
	display: flex;
	flex-direction: column;
	gap: 1.2rem;
	max-height: 220px;
	overflow-y: auto;
`;

const PrItem = styled.li`
	background: ${({ theme }) => theme.ui.background};
	border-radius: 8px;
	box-shadow: 0 2px 8px ${({ theme }) => theme.ui.shadow};
	padding: 1.4rem 2rem;
	display: flex;
	flex-direction: column;
	gap: 0.7rem;
	font-size: 1.4rem;
	color: ${({ theme }) => theme.text.primary};
	transition: box-shadow 0.2s;
	&:hover {
		box-shadow: 0 4px 16px ${({ theme }) => theme.ui.shadow};
	}
	b {
		font-size: 1.5rem;
		color: ${({ theme }) => theme.text.accent};
	}
	.pr-meta {
		display: flex;
		align-items: center;
		gap: 1.2rem;
		font-size: 1.2rem;
	}
	.pr-link {
		color: ${({ theme }) => theme.interactive.primary};
		font-weight: 600;
		margin-left: 0.5rem;
		font-size: 1.2rem;
		text-decoration: underline;
	}
`;

const Label = styled.label`
	display: block;
	margin-bottom: 0.8rem;
	font-size: 1.4rem;
	font-weight: 500;
	color: ${({ theme }) => theme.text.primary};
`;

const AssigneeSelect = styled.select`
	${({ theme }) => inputBaseStyles(theme)}
	margin-bottom: 1rem;
`;

const DateSection = styled.div`
	margin-top: 1rem;
	padding: 1.2rem;
	background: ${({ theme }) => theme.ui.background};
	border-radius: 8px;
	border: 1px solid ${({ theme }) => theme.ui.border};
	display: flex;
	flex-direction: column;
	gap: 1.2rem;
`;

const DateInfo = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const DateLabel = styled.span`
	word-break: keep-all;
	font-size: 1.4rem;
	font-weight: 500;
	color: ${({ theme }) => theme.text.secondary};
`;

const DateValue = styled.span`
	font-size: 1.4rem;
	color: ${({ theme }) => theme.text.primary};
`;
