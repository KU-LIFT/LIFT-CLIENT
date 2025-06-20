import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import IconButton from './common/IconButton';
import Button from './common/Button';

type Project = {
	projectKey: string;
	name: string;
	description: string;
	createdAt?: string;
};

type Props = {
	onClose: () => void;
	onCreate: (project: Project) => void;
	defaultValue?: Project;
	isEdit?: boolean;
};

const ProjectDetailModal = ({ onClose, onCreate, defaultValue, isEdit }: Props) => {
	const [projectKey, setProjectKey] = useState('');
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');

	// 수정 모드면 defaultValue로 초기화
	useEffect(() => {
		if (defaultValue) {
			setProjectKey(defaultValue.projectKey);
			setName(defaultValue.name);
			setDescription(defaultValue.description);
		}
	}, [defaultValue]);

	const handleSubmit = () => {
		if (!projectKey || !name) {
			alert('프로젝트 키와 이름은 필수 항목입니다.');
			return;
		}
		onCreate({ projectKey, name, description });
	};

	return (
		<BackDrop
			onClick={(e) => {
				if (e.target === e.currentTarget) {
					onClose();
				}
			}}
		>
			<ModalContainer>
				<ModalHeader>
					<Title>{isEdit ? '프로젝트 수정' : '새 프로젝트 생성'}</Title>
					<IconButton type="normal" iconName="IcnX" onClick={onClose} />
				</ModalHeader>
				<ModalContent>
					<Input
						placeholder="프로젝트 키 (예: LIFT-123)"
						value={projectKey}
						onChange={(e) => setProjectKey(e.target.value)}
						disabled={isEdit}
					/>
					<Input placeholder="프로젝트 이름" value={name} onChange={(e) => setName(e.target.value)} />
					<Textarea
						placeholder="프로젝트에 대한 간단한 설명을 입력하세요."
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						rows={5}
					/>
				</ModalContent>
				<ModalFooter>
					<Button type="secondary" label="취소" onClick={onClose} />
					<Button type="primary" label={isEdit ? '수정' : '생성'} onClick={handleSubmit} />
				</ModalFooter>
			</ModalContainer>
		</BackDrop>
	);
};

const BackDrop = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.4);
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 1000;
`;

const ModalContainer = styled.div`
	width: 500px;
	background-color: ${({ theme }) => theme.ui.panel};
	border-radius: 8px;
	box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
	display: flex;
	flex-direction: column;
`;

const ModalHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 1.6rem 2rem;
	border-bottom: 1px solid ${({ theme }) => theme.ui.border};
`;

const Title = styled.h2`
	font-size: 1.8rem;
	font-weight: 600;
	color: ${({ theme }) => theme.text.primary};
`;

const ModalContent = styled.div`
	padding: 2rem;
	display: flex;
	flex-direction: column;
	gap: 1.6rem;
`;

const inputBaseStyles = (theme: any) => `
	width: 100%;
	padding: 1rem 1.2rem;
	font-size: 1.4rem;
	background-color: ${theme.ui.background};
	border: 1px solid ${theme.ui.border};
	border-radius: 6px;
	color: ${theme.text.primary};
	transition: border-color 0.2s;
	box-sizing: border-box;

	&:focus {
		outline: none;
		border-color: ${theme.interactive.primary};
	}

	&::placeholder {
		color: ${theme.text.disabled};
	}

	&:disabled {
		background-color: ${theme.ui.border};
		cursor: not-allowed;
	}
`;

const Input = styled.input`
	${({ theme }) => inputBaseStyles(theme)}
`;

const Textarea = styled.textarea`
	${({ theme }) => inputBaseStyles(theme)}
	resize: vertical;
	font-family: inherit;
`;

const ModalFooter = styled.div`
	display: flex;
	justify-content: flex-end;
	gap: 1rem;
	padding: 1.6rem 2rem;
	border-top: 1px solid ${({ theme }) => theme.ui.border};
`;

export default ProjectDetailModal;
