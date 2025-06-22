export type getMeResponse = {
	id: number;
	name: string;
	email: string;
	role: 'USER' | 'ADMIN';
	provider: string;
};
