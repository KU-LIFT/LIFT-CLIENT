import styled from '@emotion/styled';
import { TaskType } from '@/types/TaskType';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import Card from '@/components/Task';

type TaskDraggableProps = {
	task: TaskType;
	onTaskClick: (task: TaskType) => void;
	hoverDisabled: boolean;
};

function TaskDraggable({ task, onTaskClick, hoverDisabled }: TaskDraggableProps) {
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
		<DraggableWrapper ref={setNodeRef} style={style} hoverDisabled={hoverDisabled} {...listeners} {...attributes}>
			<Card task={task} onTaskClick={onTaskClick} />
		</DraggableWrapper>
	);
}

export default TaskDraggable;

const DraggableWrapper = styled.div<{ hoverDisabled: boolean }>`
	display: inline-block;
	width: fit-content;

	${({ hoverDisabled }) =>
		!hoverDisabled &&
		`&:hover {
      transform: scale(1.03);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
      border-radius: 20px;
    }`}
`;
