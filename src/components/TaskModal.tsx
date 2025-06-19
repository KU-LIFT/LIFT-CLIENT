// components/AddTaskModal.tsx
import { useState } from 'react';
import { useCreateTask } from '@/apis/task/query';
import useProjectKeyStore from '@/stores/useProjectKeyStore';

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
		<div
			style={{
				position: 'fixed',
				top: 100,
				left: '50%',
				transform: 'translateX(-50%)',
				background: '#fff',
				border: '1px solid #eee',
				padding: 20,
				zIndex: 10,
			}}
		>
			<h4>{columnName}에 할일 추가</h4>
			<input value={name} onChange={(e) => setName(e.target.value)} placeholder="이름" />
			<textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="설명" />
			<button onClick={handleCreate}>추가</button>
			<button onClick={onClose}>닫기</button>
		</div>
	);
};

export default TaskModal;
