import color from './color';
import colorToken from './colorToken';

export const theme = {
	colors: {
		// 기본 배경 및 텍스트
		background: '#f8fafc', // 전체 배경
		title: '#1f2937', // 큰 제목용 텍스트
		primaryText: '#4b5563', // 일반 텍스트
		secondaryText: '#9ca3af', // 안내, 설명, placeholder
		transparent: 'rgba(0, 0, 0, 0)',

		// 포인트 컬러
		accent: '#3b82f6', // 파란색 (버튼, 강조)
		hover: 'rgba(59, 130, 246, 0.1)', // 파란색의 흐린 hover 배경

		// 카드 및 UI 요소
		boardBackground: '#f1f5f9', // 연한 회색
		cardBackground: '#ffffff', // 카드/박스 배경
		border: '#e2e8f0', // 카드/박스 경계선
		shadow: 'rgba(0, 0, 0, 0.05)', // 카드 그림자

		// 상태 라벨 색 (To do / In Progress / Done 등 구분)
		statusTodo: '#e0f2fe', // 연한 하늘
		statusInProgress: '#dbeafe', // 연한 파랑
		statusDone: '#e2e8f0', // 연한 회색 (완료 느낌)

		// 사용자 태그 색 (랜덤 또는 라벨 컬러)
		tagBlue: '#60a5fa',
		tagGreen: '#4ade80',
		tagYellow: '#facc15',
		tagRed: '#f87171',
		tagPurple: '#c084fc',

		primary: '#007BFF',
		primaryHover: '#0056b3',
		secondary: '#6C757D',
		secondaryHover: '#5A6268',
	},

	colorChip: {
		Icon: {
			normal: '#4b5563', // primaryText 수준
			strong: '#1f2937', // title 수준 (강조)
			heavy: '#0f172a', // title보다 더 진하게 (아이콘 강조용)
			primary: '#3b82f6', // 파란 포인트
			inverse: '#ffffff', // 밝은 배경용 대비 흰색
		},
	},

	colorToken,
	color,
};

export type ThemeType = typeof theme;
