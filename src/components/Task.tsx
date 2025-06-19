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
	return (
		<TaskLayout
			onClick={(e: React.MouseEvent<HTMLDivElement>) => {
				e.stopPropagation();
				onTaskClick?.(task);
			}}
		>
			<Container>
				<TaskTitle>{task.name}</TaskTitle>
				<TaskDescription>{task.description}</TaskDescription>
			</Container>
			<div onClick={handleDeleteClick}>
				<IconButton type="outlined" iconName="IcnDelete" />
			</div>
		</TaskLayout>
	);
}

export default Task;

const TaskLayout = styled.div`
	width: 34rem;
	height: 14rem;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: flex-start;

	border: 2px solid ${({ theme }) => theme.colors.border};
	border-radius: 20px;
	background-color: ${({ theme }) => theme.colors.cardBackground};
	box-shadow: 0 4px 8px ${({ theme }) => theme.colors.shadow};

	box-sizing: border-box;
	padding: 2rem;

	gap: 1.5rem;
`;

const TaskTitle = styled.p`
	font-size: 2rem;
	font-weight: 500;
	color: ${({ theme }) => theme.colors.title};
`;

const TaskDescription = styled.p`
	font-size: 1.6rem;
	font-weight: 400;
	line-height: 2.4rem;
	color: ${({ theme }) => theme.colors.secondaryText};
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
`;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	gap: 2rem;
`;
