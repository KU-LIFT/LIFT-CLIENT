import { CardStatusType, CardStatusMap } from '@/types/Card';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';

type CardStatusProps = {
	status: CardStatusType;
};

function CardStatus({ status }: CardStatusProps) {
	const { colors } = useTheme();

	const statusColorMap = {
		TODO: colors.tagYellow,
		IN_PROGRESS: colors.tagBlue,
		DONE: colors.tagGreen,
	};
	return (
		<StatusWrapper>
			<StatusDot color={statusColorMap[status]} />
			<StatusText>{CardStatusMap[status].text}</StatusText>
		</StatusWrapper>
	);
}

export default CardStatus;

const StatusWrapper = styled.div`
	display: flex;
	align-items: center;
	gap: 0.6rem;
`;

const StatusDot = styled.span<{ color: string }>`
	width: 0.8rem;
	height: 0.8rem;
	border-radius: 50%;
	background-color: ${({ color }) => color};
`;

const StatusText = styled.span`
	font-size: 1.4rem;
	color: #333;
`;
