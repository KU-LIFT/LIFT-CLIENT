import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import {
	DndContext,
	PointerSensor,
	useSensor,
	useSensors,
	useDroppable,
	useDraggable,
	DragOverlay,
} from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

import { CardType } from '@/types/Card';
import Card from '@/components/Card';
import IconButton from '@/components/common/IconButton';
import AIChatModal from '@/components/AIChatModal';
import CardDetailModal from '@/components/CardDetailModal';
import useProjectKeyStore from '@/stores/useProjectKeyStore';
import { useBoards } from '@/apis/board/query';
import { BoardsType, BoardType } from '@/types/Board';

const BoardPage = () => {
	const projectKey = useProjectKeyStore((store) => store.projectKey);

	const { data: boardsData, isLoading, isError } = useBoards(projectKey);

	useEffect(() => {
		console.log('getBoards result:', boardsData);
		if (boardsData && boardsData.length > 0) {
			console.log('getBoards 이름:', boardsData[0].name);
			console.log(
				'getBoards 컬럼:',
				boardsData.map((board: BoardsType) => board.columns)
			);
		}
	}, [boardsData]);

	const boardState = boardsData?.[0]?.columns ?? [];

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isAIModalOpen, setIsAIModalOpen] = useState(false);
	const [selectedCard, setSelectedCard] = useState<CardType | null>(null);
	const [activeCard, setActiveCard] = useState<CardType | null>(null);
	const [activeCardId, setActiveCardId] = useState<number | null>(null);

	const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

	const handleOpenModal = (card: CardType) => {
		setSelectedCard(card);
		setIsModalOpen(true);
	};

	const closeDetailModal = () => {
		setSelectedCard(null);
		setIsModalOpen(false);
	};
	const openAIChatModal = () => setIsAIModalOpen(true);
	const closeAIChatModal = () => setIsAIModalOpen(false);

	const onDragStart = (e: any) => {
		const cardId = Number(e.active.id);
		const card = boardState.flatMap((board) => board.cards).find((c) => c.id === cardId);
		setActiveCard(card || null);
		setActiveCardId(cardId);
	};

	const handleDragEnd = (event: any) => {
		const { active, over } = event;
		if (!over || !active) return;

		const cardId = Number(active.id);
		const toBoardIdx = Number(over.id);

		let fromBoardIdx = -1,
			fromCardIdx = -1;
		boardState.forEach((board, bIdx) => {
			const cIdx = board.cards.findIndex((c) => c.id === cardId);
			if (cIdx !== -1) {
				fromBoardIdx = bIdx;
				fromCardIdx = cIdx;
			}
		});
		if (fromBoardIdx === -1 || fromCardIdx === -1) return;
	};

	if (isLoading) return <div>로딩 중...</div>;
	if (isError) return <div>에러 발생</div>;
	if (!boardsData || boardsData.length === 0) return <div>데이터 없음</div>;

	return (
		<BoardPageLayout>
			<BoardPageHeader>
				<BoardPageTitle>{boardsData[0].name}</BoardPageTitle>
				<IconButton type="normal" iconName="IcnPlus" size="big" onClick={openAIChatModal} />
			</BoardPageHeader>
			<DndContext
				sensors={sensors}
				onDragStart={onDragStart}
				onDragEnd={(e) => {
					setActiveCard(null);
					setActiveCardId(null);
					handleDragEnd(e);
				}}
				onDragCancel={() => {
					setActiveCard(null);
					setActiveCardId(null);
				}}
			>
				<BoardContainer>
					{boardState.map((board: BoardType) => (
						<ColumnDroppable key={board.id} id={board.id}>
							<BoardItem>
								<BoardHeader>
									<BoardTitle>{board.name}</BoardTitle>
									<IconButton type="normal" iconName="IcnPlus" />
								</BoardHeader>
								{/* <CardListContainer>
									{board.cards.map((card) => {
										if (activeCardId === card.id) return null;
										return <DraggableCard key={card.id} card={card} onClick={handleOpenModal} id={card.id} />;
									})}
								</CardListContainer> */}
							</BoardItem>
						</ColumnDroppable>
					))}
				</BoardContainer>
				<DragOverlay>{activeCard && <Card card={activeCard} onClick={() => {}} />}</DragOverlay>
			</DndContext>
			{isModalOpen && selectedCard && <CardDetailModal onClose={closeDetailModal} card={selectedCard} />}
			{isAIModalOpen && <AIChatModal onClose={closeAIChatModal} />}
		</BoardPageLayout>
	);
};

export default BoardPage;

// Drop 영역 (컬럼)
function ColumnDroppable({ id, children }: { id: number; children: React.ReactNode }) {
	const { setNodeRef } = useDroppable({ id });
	return <div ref={setNodeRef}>{children}</div>;
}

// Draggable 카드 (변경 없음)
function DraggableCard({ card, onClick, id }: { card: CardType; onClick: (card: CardType) => void; id: number }) {
	const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });
	const style = {
		transform: transform ? CSS.Translate.toString(transform) : undefined,
	};
	return (
		<div ref={setNodeRef} style={style} {...listeners} {...attributes}>
			<Card card={card} onClick={onClick} />
		</div>
	);
}

const BoardPageLayout = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;

	padding: 4rem 6rem;
	box-sizing: border-box;
	gap: 4rem;
`;

const BoardPageHeader = styled.div`
	width: 100%;
	height: fit-content;
	display: flex;
	justify-content: space-between;
	align-items: center;

	flex-shrink: 0;
`;

const BoardPageTitle = styled.p`
	font-size: 4rem;
	font-weight: 500;
	color: ${({ theme }) => theme.colors.title};
`;

const BoardContainer = styled.div`
	display: flex;
	justify-content: space-around;
	align-items: center;

	gap: 20px;
`;

const BoardItem = styled.div`
	width: fit-content;
	min-width: 40rem;
	height: 80rem;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: flex-start;

	border: 2px solid ${({ theme }) => theme.colors.border};
	border-radius: 20px;
	background-color: ${({ theme }) => theme.colors.boardBackground};

	overflow: hidden;

	padding: 0 0 5rem 0;
`;

const BoardHeader = styled.div`
	width: 100%;
	height: 5rem;
	display: flex;
	justify-content: space-between;
	align-items: center;

	margin-top: 1rem;
	box-sizing: border-box;
	padding: 2rem;
`;

const BoardTitle = styled.p`
	font-size: 2rem;
	font-weight: 500;
	color: ${({ theme }) => theme.colors.title};
`;

const CardListContainer = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	flex-shrink: 0;

	gap: 1rem;
	box-sizing: border-box;
	padding: 2rem;

	overflow: hidden;
	overflow-y: scroll;

	&::-webkit-scrollbar {
		display: none;
	}
`;
