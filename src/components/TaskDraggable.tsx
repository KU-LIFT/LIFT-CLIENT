import styled from '@emotion/styled';
import { TaskType } from '@/types/TaskType';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import Task from '@/components/Task';

type TaskDraggableProps = {
	task: TaskType;
	onTaskClick: (task: TaskType) => void;
};

function TaskDraggable({ task, onTaskClick }: TaskDraggableProps) {
	const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
		id: task.id.toString(),
	});

	const style = {
		opacity: isDragging ? 0 : 1,
		transform: CSS.Translate.toString(transform),
	};

	return (
		<DraggableWrapper ref={setNodeRef} style={style} {...listeners} {...attributes}>
			<Task task={task} onTaskClick={onTaskClick} />
		</DraggableWrapper>
	);
}

export default TaskDraggable;

const DraggableWrapper = styled.div`
	width: 100%;
`;
