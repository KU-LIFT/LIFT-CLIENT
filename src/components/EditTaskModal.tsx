import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { useUpdateTask } from '@/apis/task/query';
import useProjectKeyStore from '@/stores/useProjectKeyStore';
import { TaskType } from '@/types/TaskType';
import { UpdateTaskRequest } from '@/apis/task/Task';
import useUserStore from '@/stores/useUserStore';
import Button from './common/Button';
import IconButton from './common/IconButton';

const EditTaskModal = ({ open, task, onClose }: { open: boolean; task: TaskType; onClose: () => void }) => {
	const projectKey = useProjectKeyStore((store) => store.projectKey);
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const updateTaskMutation = useUpdateTask(projectKey, task.id);

	const currentUserId = useUserStore((state) => state.userId);

	useEffect(() => {
		if (task) {
			setName(task.name);
			setDescription(task.description ?? '');
		}
	}, [task]);

	const handleUpdate = () => {
		if (!name) {
			alert('태스크 이름은 필수 항목입니다.');
			return;
		}

		const payload: UpdateTaskRequest = {
			name,
			description,
			columnId: task.columnId,
			assigneeId: currentUserId!,
			priority: task.priority,
		};

		updateTaskMutation.mutate(payload, {
			onError: (error: any) => console.error(error.response?.data),
			onSuccess: onClose,
		});
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
					<Title>태스크 수정</Title>
					<IconButton type="normal" iconName="IcnX" onClick={onClose} />
				</ModalHeader>
				<ModalContent>
					<Input value={name} onChange={(e) => setName(e.target.value)} placeholder="태스크 이름" />
					<Textarea
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						placeholder="태스크에 대한 간단한 설명을 입력하세요."
						rows={5}
					/>
				</ModalContent>
				<ModalFooter>
					<Button type="secondary" label="취소" onClick={onClose} />
					<Button type="primary" label="저장" onClick={handleUpdate} />
				</ModalFooter>
			</ModalContainer>
		</BackDrop>
	);
};

export default EditTaskModal;

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
`;

const Textarea = styled.textarea`
	${({ theme }) => inputBaseStyles(theme)}
	resize: vertical;
	font-family: inherit;
`;

const ModalFooter = styled.div`
	display: flex;
	justify-content: flex-end;
	gap: 1rem;
	padding: 1.6rem 2rem;
	border-top: 1px solid ${({ theme }) => theme.ui.border};
`;
