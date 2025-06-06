export type CardStatusType = 'TODO' | 'IN_PROGRESS' | 'DONE';

export const CardStatusMap: Record<CardStatusType, { text: string }> = {
	TODO: { text: '할 일' },
	IN_PROGRESS: { text: '진행 중' },
	DONE: { text: '완료됨' },
};

export type CardType = {
	id: number;
	status: CardStatusType;
	title: string;
	description: string;
	assignee?: string;
	createdAt?: string; // (ex: "2025-05-01")
	updatedAt?: string; // (ex: "2025-05-01")
};
