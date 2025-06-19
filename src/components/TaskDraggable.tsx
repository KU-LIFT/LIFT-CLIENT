import styled from '@emotion/styled';
import { Task } from '@/types/Task';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import Card from '@/components/Card';

type TaskDraggableProps = {
	task: Task;
};

function TaskDraggable({ task }: TaskDraggableProps) {
	const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
		id: task.id.toString(),
	});

	const style = {
		opacity: isDragging ? 0 : 1, // ← 드래그 중 원본 숨김
		...(transform
			? {
					position: 'absolute' as const,
					zIndex: 1000,
					width: 'fit-content',
					transform: CSS.Translate.toString(transform),
				}
			: {}),
	};

	return (
		<DraggableWrapper ref={setNodeRef} style={style} {...listeners} {...attributes}>
			<Card card={task} />
		</DraggableWrapper>
	);
}

export default TaskDraggable;

const DraggableWrapper = styled.div`
	display: inline-block;
	width: fit-content;
`;
