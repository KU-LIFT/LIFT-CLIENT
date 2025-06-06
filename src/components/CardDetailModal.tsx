import { CardType } from '@/types/Card';
import styled from '@emotion/styled';
import IconButton from './common/IconButton';
import CardStatus from './CardStatus';

type CardDetailModalProps = {
	onClose: () => void;
	card: CardType;
};

const CardDetailModal = ({ onClose, card }: CardDetailModalProps) => {
	return (
		<ModalOverlay onClick={onClose}>
			<ModalContent onClick={(e) => e.stopPropagation()}>
				<ModalHeader>
					<ModalTitle>{card.title}</ModalTitle>
					<IconButton type="normal" iconName="IcnX" onClick={onClose} />
				</ModalHeader>
				<ModalBody>
					{/* 왼쪽 영역 */}
					<ModalLeft>
						{/* 생성일 / 수정일 */}
						<ModalSection>
							<ModalSectionTitle>생성일</ModalSectionTitle>
							<ModalSectionContent>2025-05-01</ModalSectionContent>
						</ModalSection>
						<ModalSection>
							<ModalSectionTitle>수정일</ModalSectionTitle>
							<ModalSectionContent>2025-05-09</ModalSectionContent>
						</ModalSection>

						{/* 이미지 */}
						<ModalImage src="https://placehold.co/400x200" alt="Card Image" />

						{/* 설명 */}
						<ModalSection>
							<ModalSectionTitle>설명</ModalSectionTitle>
							<ModalSectionContent>{card.description}</ModalSectionContent>
						</ModalSection>
					</ModalLeft>

					{/* 오른쪽 영역 */}
					<ModalRight>
						{/* 상태 */}
						<ModalSection>
							<ModalSectionTitle>상태</ModalSectionTitle>
							<CardStatus status={card.status} />
						</ModalSection>

						{/* 담당자 */}
						<ModalSection>
							<ModalSectionTitle>담당자</ModalSectionTitle>
							<ModalSectionContent>김지원</ModalSectionContent>
						</ModalSection>

						{/* 생성자 */}
						<ModalSection>
							<ModalSectionTitle>생성자</ModalSectionTitle>
							<ModalSectionContent>최창규</ModalSectionContent>
						</ModalSection>
					</ModalRight>
				</ModalBody>
				<ModalFooter>
					<ModalCancelButton onClick={onClose}>취소</ModalCancelButton>
					<ModalButton>저장</ModalButton>
				</ModalFooter>
			</ModalContent>
		</ModalOverlay>
	);
};

export default CardDetailModal;

const ModalOverlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 1000;
`;

const ModalContent = styled.div`
	width: 50rem;
	background: white;
	border-radius: 12px;
	padding: 3rem;
	box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
	display: flex;
	flex-direction: column;
	gap: 2rem;
`;

const ModalHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-bottom: 1px solid ${({ theme }) => theme.colors.border};
	padding-bottom: 1rem;
`;

const ModalTitle = styled.h2`
	font-size: 2.4rem;
	font-weight: 700;
	color: ${({ theme }) => theme.colors.title};
`;

const ModalSection = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
`;

const ModalSectionTitle = styled.h3`
	font-size: 1.8rem;
	font-weight: 600;
	color: ${({ theme }) => theme.colors.title};
`;

const ModalSectionContent = styled.p`
	font-size: 1.6rem;
	color: ${({ theme }) => theme.colors.secondaryText};
	line-height: 2.4rem;
`;

const ModalFooter = styled.div`
	display: flex;
	justify-content: flex-end;
	gap: 1rem;
	margin-top: 2rem;
`;

const ModalButton = styled.button`
	padding: 1rem 2rem;
	font-size: 1.6rem;
	font-weight: 500;
	color: white;
	background-color: ${({ theme }) => theme.colors.primary};
	border: none;
	border-radius: 8px;
	cursor: pointer;
	transition: background-color 0.2s ease;

	&:hover {
		background-color: ${({ theme }) => theme.colors.primaryHover};
	}
`;

const ModalCancelButton = styled(ModalButton)`
	background-color: ${({ theme }) => theme.colors.secondary};
	&:hover {
		background-color: ${({ theme }) => theme.colors.secondaryHover};
	}
`;

const ModalBody = styled.div`
	display: flex;
	gap: 3rem; /* 좌우 영역 간 간격 추가 */
	font-size: 1.6rem;
	line-height: 2.4rem;
	color: ${({ theme }) => theme.colors.secondaryText};
`;

const ModalLeft = styled.div`
	flex: 2;
	display: flex;
	flex-direction: column;
	gap: 2rem; /* 섹션 간 간격 추가 */
	padding-right: 1.5rem; /* 오른쪽 여백 추가 */
`;

const ModalRight = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	gap: 2rem; /* 섹션 간 간격 추가 */
	padding-left: 1.5rem; /* 왼쪽 여백 추가 */
	border-left: 1px solid ${({ theme }) => theme.colors.border}; /* 구분선 추가 */
`;

const ModalImage = styled.img`
	width: 100%;
	height: auto;
	border-radius: 8px;
	object-fit: cover;
	margin-bottom: 1.5rem;
`;
