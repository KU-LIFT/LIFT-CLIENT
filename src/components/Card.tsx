import styled from '@emotion/styled';
import { Task } from '@/types/Task';
import IconButton from './common/IconButton';
import { useDeleteTask } from '@/apis/task/query';
import useProjectKeyStore from '@/stores/useProjectKeyStore';

type CardProps = {
	onClick?: (card: Task) => void;
	card: Task;
};

const Card = ({ card, onClick }: CardProps) => {
	const projectKey = useProjectKeyStore((store) => store.projectKey);

	const deleteTaskMutation = useDeleteTask(projectKey);

	return (
		<CardLayout>
			<CardTitle>{card.name}</CardTitle>
			<CardDescription>{card.description}</CardDescription>
			<IconButton
				type="outlined"
				iconName="IcnDelete"
				onClick={() => {
					deleteTaskMutation.mutate(card.id);
				}}
			/>
		</CardLayout>
	);
};

export default Card;

const CardLayout = styled.div`
	width: 34rem;
	height: 14rem;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;

	border: 2px solid ${({ theme }) => theme.colors.border};
	border-radius: 20px;
	background-color: ${({ theme }) => theme.colors.cardBackground};
	box-shadow: 0 4px 8px ${({ theme }) => theme.colors.shadow};

	box-sizing: border-box;
	padding: 2rem;

	gap: 1.5rem;
`;

const CardTitle = styled.p`
	font-size: 2rem;
	font-weight: 500;
	color: ${({ theme }) => theme.colors.title};
`;

const CardDescription = styled.p`
	font-size: 1.6rem;
	font-weight: 400;
	line-height: 2.4rem;
	color: ${({ theme }) => theme.colors.secondaryText};
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
`;
