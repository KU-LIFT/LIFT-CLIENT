import { useState } from 'react';
import styled from '@emotion/styled';
import { useUpdateTask } from '@/apis/task/query';
import useProjectKeyStore from '@/stores/useProjectKeyStore';
import { Task } from '@/types/Task';
import { UpdateTaskRequest } from '@/apis/task/Task';
import useUserStore from '@/stores/useUserStore';

const EditTaskModal = ({ open, task, onClose }: { open: boolean; task: Task; onClose: () => void }) => {
	const projectKey = useProjectKeyStore((store) => store.projectKey);
	const [name, setName] = useState(task.name);
	const [description, setDescription] = useState(task.description);
	const updateTaskMutation = useUpdateTask(projectKey, task.id);

	const currentUserId = useUserStore((state) => state.userId);

	const handleUpdate = () => {
		const payload: UpdateTaskRequest = {
			name,
			description,
			columnId: task.columnId,
			assigneeId: currentUserId!,
			priority: task.priority,
			dueDate: task.dueDate,
			tags: task.tags.length ? task.tags : [''],
		};

		updateTaskMutation.mutate(payload, {
			onError: (error: any) => console.error(error.response?.data),
			onSuccess: onClose,
		});
	};

	if (!open) return null;
	return (
		<ModalOverlay onClick={onClose}>
			<ModalContainer onClick={(e) => e.stopPropagation()}>
				<input value={name} onChange={(e) => setName(e.target.value)} style={{ width: '100%', marginBottom: '1rem' }} />
				<textarea
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					style={{ width: '100%', height: '6rem', marginBottom: '1rem' }}
				/>
				<div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
					<button onClick={handleUpdate}>저장</button>
					<button onClick={onClose}>닫기</button>
				</div>
			</ModalContainer>
		</ModalOverlay>
	);
};

export default EditTaskModal;

const ModalOverlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.3);
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 1000;
`;

const ModalContainer = styled.div`
	background: #fff;
	border: 1px solid #ccc;
	padding: 2rem;
	border-radius: 8px;
	min-width: 30rem;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;
