import { TaskType } from '@/types/TaskType';

export interface AiTextRequest {
	text: string;
}

export interface TaskResponse extends TaskType {}
