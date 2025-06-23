import styled from '@emotion/styled';
import { TaskType } from '@/types/TaskType';
import IconButton from './common/IconButton';
import { useDeleteTask } from '@/apis/task/query';
import useProjectKeyStore from '@/stores/useProjectKeyStore';

type TaskProps = {
	onTaskClick?: (task: TaskType) => void;
	task: TaskType;
};

function Task({ task, onTaskClick }: TaskProps) {
	const projectKey = useProjectKeyStore((store) => store.projectKey);
	const deleteTaskMutation = useDeleteTask(projectKey);

	const handleDeleteClick = (e: React.MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();
		if (window.confirm('정말 이 태스크를 삭제하시겠습니까?')) {
			deleteTaskMutation.mutate(task.id);
		}
	};

	const isOverdue = !!(task.dueDate && new Date(task.dueDate) < new Date());

	return (
		<TaskCard
			isOverdue={isOverdue}
			onClick={(e: React.MouseEvent<HTMLDivElement>) => {
				e.stopPropagation();
				onTaskClick?.(task);
			}}
		>
			<ContentWrapper>
				<div>
					<TaskTitle>{task.name}</TaskTitle>
					<TaskDescription>{task.description}</TaskDescription>
				</div>
				{task.assignee && <AssigneeName>{task.assignee}</AssigneeName>}
			</ContentWrapper>
			<DeleteButtonWrapper className="delete-button-wrapper">
				<IconButton type="normal" size="small" iconName="IcnDelete" onClick={handleDeleteClick} />
			</DeleteButtonWrapper>
		</TaskCard>
	);
}

export default Task;

const ContentWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	flex: 1;
	gap: 1rem;
`;

const DeleteButtonWrapper = styled.div`
	opacity: 0;
	transition: opacity 0.2s ease-in-out;
`;

const TaskCard = styled.div<{ isOverdue: boolean }>`
	width: 100%;
	padding: 1.2rem 1.6rem;
	background-color: ${({ theme }) => theme.ui.panel};
	border: 1px solid ${({ theme, isOverdue }) => (isOverdue ? theme.color.Red[600] : theme.ui.border)};
	border-radius: 6px;
	box-shadow: 0 1px 2px ${({ theme }) => theme.ui.shadow};
	cursor: pointer;
	transition:
		background-color 0.2s ease-in-out,
		box-shadow 0.2s ease-in-out;
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	gap: 1rem;

	&:hover {
		background-color: ${({ theme }) => theme.color.Grey[200]};
		box-shadow: 0 2px 4px ${({ theme }) => theme.ui.shadow};
	}

	&:hover .delete-button-wrapper {
		opacity: 1;
	}
`;

const TaskTitle = styled.h3`
	font-size: 1.6rem;
	font-weight: 500;
	color: ${({ theme }) => theme.text.primary};
	margin-bottom: 0.4rem;
	overflow: hidden;
	text-overflow: ellipsis;
	line-height: 1.5;
`;

const AssigneeName = styled.p`
	font-size: 1.2rem;
	font-weight: 500;
	color: ${({ theme }) => theme.text.primary};
	background-color: ${({ theme }) => theme.ui.background};
	border: 1px solid ${({ theme }) => theme.ui.border};
	border-radius: 4px;
	padding: 0.4rem 0.8rem;
	align-self: flex-start;
`;

const TaskDescription = styled.p`
	font-size: 1.4rem;
	color: ${({ theme }) => theme.text.secondary};
	white-space: pre-wrap;
	word-break: break-all;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	overflow: hidden;
	text-overflow: ellipsis;
	line-height: 1.5;
`;
