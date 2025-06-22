import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import {
	DndContext,
	PointerSensor,
	useSensor,
	useSensors,
	DragEndEvent,
	pointerWithin,
	DragOverlay,
	DragStartEvent,
} from '@dnd-kit/core';

import Card from '@/components/Task';
import AIChatModal from '@/components/AIChatModal';
import useProjectKeyStore from '@/stores/useProjectKeyStore';
import { useBoards } from '@/apis/board/query';
import { BoardType } from '@/types/Board';
import { useGetTasks, useGetTask } from '@/apis/task/query';
import TaskModal from '@/components/TaskModal';
import { TaskType } from '@/types/TaskType';
import { useMoveTask } from '@/apis/task/moveTask/query';
import Column from '@/components/Column';
import EditTaskModal from '@/components/EditTaskModal';
import Button from '@/components/common/Button';

function BoardPage() {
	const projectKey = useProjectKeyStore((store) => store.projectKey);

	// AI 모달
	// BoardPage.tsx
	const [aiModalColumnId, setAIModalColumnId] = useState<number | null>(null);

	const handleOpenAIModal = (boardsId: number) => {
		setAIModalColumnId(boardsId);
	};
	const handleCloseAIModal = () => {
		setAIModalColumnId(null);
	};

	// 수동 Task 추가 모달
	const [addModal, setAddModal] = useState<{ open: boolean; columnName: string; columnId: number }>({
		open: false,
		columnName: '',
		columnId: 0,
	});
	// task edit 모달
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [selectedTask, setSelectedTask] = useState<TaskType | null>(null);
	const { data: refetchedTask, refetch: refetchTask } = useGetTask(projectKey, selectedTask?.id ?? 0);

	const handleTaskClick = (task: TaskType) => {
		setSelectedTask(task);
		setIsEditModalOpen(true);
	};

	// 데이터 조회
	const { data: boardsData, isLoading, isError } = useBoards(projectKey);
	const { data: tasksData } = useGetTasks(projectKey);
	const [localTasks, setLocalTasks] = useState<TaskType[]>([]);
	const moveTaskMutation = useMoveTask(projectKey);

	// 현재 드래그 중인 task
	const [activeTask, setActiveTask] = useState<TaskType | null>(null);

	useEffect(() => {
		if (!activeTask) {
			setLocalTasks(tasksData ?? []);
		}
	}, [tasksData, activeTask]);

	// DnD 센서 설정

	const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

	// 드래그 시작 시
	const handleDragStart = (event: DragStartEvent) => {
		const activeId = event.active.id;
		const taskId = typeof activeId === 'string' ? Number(activeId) : activeId;
		const dragging = tasksData?.find((task: TaskType) => task.id === taskId) ?? null;
		setActiveTask(dragging);
	};

	// 드래그 종료 시
	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;
		if (!over) {
			setActiveTask(null);
			return;
		}

		const taskId = Number(active.id);
		const newColumnId = Number(over.id);
		// 1. 로컬 상태 먼저 업데이트
		setLocalTasks((tasks) => tasks.map((t) => (t.id === taskId ? { ...t, columnId: newColumnId } : t)));
		// 2) 서버에 백그라운드로 요청
		moveTaskMutation.mutate({ taskId, columnId: newColumnId });
		// 3) overlay 제거
		setActiveTask(null);
	};

	const handleBranchLinked = async () => {
		if (selectedTask) {
			const { data } = await refetchTask();
			if (data) setSelectedTask(data);
		}
	};

	if (isLoading) return <div>로딩 중...</div>;
	if (isError) return <div>에러 발생</div>;
	if (!boardsData?.length) return <div>데이터 없음</div>;

	return (
		<DndContext
			sensors={sensors}
			collisionDetection={pointerWithin} // pointer 위치로 over 를 판단
			onDragStart={handleDragStart}
			onDragEnd={handleDragEnd}
			onDragCancel={() => setActiveTask(null)}
		>
			<BoardPageLayout>
				<BoardPageHeader>
					<BoardPageTitle>{boardsData[0].name}</BoardPageTitle>
					<Button type="primary" label="Task 추가 With AI" onClick={() => handleOpenAIModal(boardsData[0].id)} />
				</BoardPageHeader>

				<BoardsContainer>
					{boardsData[0].columns.map((board: BoardType) => {
						// 드래그 중인 Task는 리스트에서 제외
						const visibleTasks = activeTask ? localTasks.filter((t) => t.id !== activeTask.id) : localTasks;
						const tasksForColumn = visibleTasks.filter((t) => t.columnId === board.id);
						return (
							<Column
								key={board.id}
								board={board}
								tasks={tasksForColumn}
								onOpenAddModal={(name, id) => setAddModal({ open: true, columnName: name, columnId: id })}
								onTaskClick={handleTaskClick}
							/>
						);
					})}
				</BoardsContainer>

				{aiModalColumnId !== null && <AIChatModal columnId={aiModalColumnId} onClose={handleCloseAIModal} />}
				<TaskModal
					open={addModal.open}
					columnName={addModal.columnName}
					columnId={addModal.columnId}
					onClose={() => setAddModal({ open: false, columnName: '', columnId: 0 })}
				/>
				{selectedTask && (
					<EditTaskModal
						open={isEditModalOpen}
						task={selectedTask}
						onClose={() => setIsEditModalOpen(false)}
						onBranchLinked={handleBranchLinked}
					/>
				)}
			</BoardPageLayout>
			{/* DragOverlay 에 activeTask가 있을 때만 렌더링 */}
			<DragOverlay dropAnimation={{ duration: 0 }}>
				{activeTask ? (
					<OverlayWrapper>
						<Card task={activeTask} />
					</OverlayWrapper>
				) : null}
			</DragOverlay>
		</DndContext>
	);
}

export default BoardPage;

const BoardPageLayout = styled.div`
	height: 100%;
	display: flex;
	flex-direction: column;
	padding: 2.4rem 4rem;
	box-sizing: border-box;
	gap: 2.4rem;
`;

const BoardPageHeader = styled.div`
	flex-shrink: 0;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const BoardPageTitle = styled.h1`
	font-size: 2.4rem;
	font-weight: 700;
	color: ${({ theme }) => theme.text.primary};
`;

const BoardsContainer = styled.div`
	flex-grow: 1;
	display: flex;
	gap: 2rem;
	overflow-x: auto;
	padding-bottom: 1rem;
`;

const OverlayWrapper = styled.div`
	transform: rotate(3deg);
	box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
	border-radius: 8px;
`;
