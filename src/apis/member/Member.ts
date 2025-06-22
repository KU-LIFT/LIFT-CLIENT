export interface inviteMemberType {
	email: string;
	role: string;
}

export interface getMemberType {
	id: number;
	email: string;
	name: string;
	role: string;
}

export interface updateMemberType {
	id: number;
	role: string;
}

export interface deleteMemberType {
	id: number;
}
