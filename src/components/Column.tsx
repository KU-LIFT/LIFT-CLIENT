import styled from '@emotion/styled';
import { TaskType } from '@/types/TaskType';
import { BoardType } from '@/types/Board';
import { useDroppable } from '@dnd-kit/core';
import Button from '@/components/common/Button';
import TaskDraggable from '@/components/TaskDraggable';

type ColumnProps = {
	board: BoardType;
	tasks: Array<TaskType>;
	onOpenAddModal: (columnName: string, columnId: number) => void;
	onTaskClick: (task: TaskType) => void;
	hoverDisabled: boolean;
};

function Column({ board, tasks, onOpenAddModal, onTaskClick, hoverDisabled }: ColumnProps) {
	const { setNodeRef } = useDroppable({ id: board.id.toString() });

	return (
		<BoardItem ref={setNodeRef} id={board.id.toString()}>
			<BoardHeader>
				<BoardTitle>{board.name}</BoardTitle>
				<Button type="outlined-assistive" label="Task 추가" onClick={() => onOpenAddModal(board.name, board.id)} />
			</BoardHeader>

			<CardListContainer>
				{tasks.map((task) => (
					<TaskDraggable key={task.id} task={task} onTaskClick={onTaskClick} hoverDisabled={hoverDisabled} />
				))}
			</CardListContainer>
		</BoardItem>
	);
}

export default Column;

const BoardItem = styled.div`
	min-width: 40rem;
	height: 80rem;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: flex-start;

	border: 2px solid ${({ theme }) => theme.colors.border};
	border-radius: 20px;
	background-color: ${({ theme }) => theme.colors.boardBackground};
	overflow: visible;
`;

const BoardHeader = styled.div`
	display: flex;
	width: 100%;
	justify-content: space-between;
	padding: 2rem;
	box-sizing: border-box;
`;

const BoardTitle = styled.p`
	font-size: 2rem;
	font-weight: 500;
	color: ${({ theme }) => theme.colors.title};
`;

const CardListContainer = styled.div`
	flex-grow: 1;
	padding: 2rem;
	display: flex;
	flex-direction: column;
	gap: 1rem;
	overflow-y: auto;
	&::-webkit-scrollbar {
		display: none;
	}
`;
