// components/AddTaskModal.tsx
import { useState } from 'react';
import { useCreateTask } from '@/apis/task/query';
import useProjectKeyStore from '@/stores/useProjectKeyStore';
import styled from '@emotion/styled';
import Button from './common/Button';
import IconButton from './common/IconButton';

const TaskModal = ({
	open,
	onClose,
	columnName,
	columnId,
}: {
	open: boolean;
	onClose: () => void;
	columnName: string;
	columnId: number;
}) => {
	const projectKey = useProjectKeyStore((s) => s.projectKey);
	const createTaskMutation = useCreateTask(projectKey);

	const [name, setName] = useState('');
	const [description, setDescription] = useState('');

	const handleCreate = () => {
		if (!name) {
			alert('태스크 이름은 필수 항목입니다.');
			return;
		}
		createTaskMutation.mutate(
			{
				name,
				description,
				columnId,
				assigneeId: 1, // 임의값
				priority: 'HIGH', // 임의값
				dueDate: new Date().toISOString(),
				tags: [],
			},
			{
				onSuccess: () => {
					onClose();
					setName('');
					setDescription('');
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
					<Title>{columnName}에 태스크 추가</Title>
					<IconButton type="normal" iconName="IcnX" onClick={onClose} />
				</ModalHeader>
				<ModalContent>
					<Input placeholder="태스크 이름" value={name} onChange={(e) => setName(e.target.value)} />
					<Textarea
						placeholder="태스크에 대한 간단한 설명을 입력하세요."
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						rows={5}
					/>
				</ModalContent>
				<ModalFooter>
					<Button type="secondary" label="취소" onClick={onClose} />
					<Button type="primary" label="추가" onClick={handleCreate} />
				</ModalFooter>
			</ModalContainer>
		</BackDrop>
	);
};

export default TaskModal;

// ProjectDetailModal과 동일한 스타일을 많이 공유하므로,
// 공통 모달 컴포넌트나 스타일을 만드는 것을 고려해볼 수 있습니다.
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
