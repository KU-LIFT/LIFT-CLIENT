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
};

function Column({ board, tasks, onOpenAddModal, onTaskClick }: ColumnProps) {
	const { setNodeRef } = useDroppable({ id: board.id.toString() });

	return (
		<ColumnContainer ref={setNodeRef} id={board.id.toString()}>
			<ColumnHeader>
				<ColumnTitle>{board.name}</ColumnTitle>
				<Button
					type="secondary"
					size="small"
					label="+ Task 추가"
					onClick={() => onOpenAddModal(board.name, board.id)}
				/>
			</ColumnHeader>

			<CardList>
				{tasks.map((task) => (
					<TaskDraggable key={task.id} task={task} onTaskClick={onTaskClick} />
				))}
			</CardList>
		</ColumnContainer>
	);
}

export default Column;

const ColumnContainer = styled.div`
	width: 320px;
	flex-shrink: 0;
	height: 100%;
	display: flex;
	flex-direction: column;
	background-color: ${({ theme }) => theme.ui.panel};
	border-radius: 8px;
	box-shadow: 0 2px 4px ${({ theme }) => theme.ui.shadow};
`;

const ColumnHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 1.2rem 1.6rem;
	border-bottom: 1px solid ${({ theme }) => theme.ui.border};
`;

const ColumnTitle = styled.h2`
	font-size: 1.6rem;
	font-weight: 600;
	color: ${({ theme }) => theme.text.primary};
`;

const CardList = styled.div`
	flex-grow: 1;
	padding: 1.6rem;
	display: flex;
	flex-direction: column;
	gap: 1.2rem;
	overflow-y: auto;

	&::-webkit-scrollbar {
		width: 8px;
	}
	&::-webkit-scrollbar-thumb {
		background-color: ${({ theme }) => theme.ui.border};
		border-radius: 4px;
	}
	&::-webkit-scrollbar-track {
		background-color: transparent;
	}
`;
