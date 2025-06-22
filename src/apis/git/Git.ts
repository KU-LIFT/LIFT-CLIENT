// src/apis/git/Git.ts
export interface BranchInfoDto {
	/** 브랜치 이름 */
	name: string;
	/** 커밋 정보 (sha) */
	commit: {
		sha: string;
	};
}

export interface CommitDto {
	/** 커밋 SHA */
	sha: string;
	/** 커밋 메시지·작성자·날짜 */
	commit: {
		message: string;
		author: {
			name: string;
			date: string;
		};
	};
	/** PR 링크 */
	html_url: string;
	/** GitHub 사용자 로그인 */
	author: {
		login: string;
	};
}

export interface GitPullRequestDto {
	/** PR URL */
	url: string;
	/** PR 생성 커밋 SHA */
	sha: string;
	/** PR 상태 */
	state: string;
}

export interface CreatePrRequest {
	/** PR 제목 */
	title: string;
	/** PR 본문 */
	body: string;
}
