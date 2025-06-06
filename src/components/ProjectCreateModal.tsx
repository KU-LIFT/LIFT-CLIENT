import { useEffect, useState } from 'react';
import styled from '@emotion/styled';

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

const CreateProjectModal = ({ onClose, onCreate, defaultValue, isEdit }: Props) => {
	const [projectKey, setProjectKey] = useState('');
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');

	// 수정 모드면 defaultValue로 초기화
	useEffect(() => {
		if (defaultValue) {
			setProjectKey(defaultValue.projectKey);
			setName(defaultValue.name);
			setDescription(defaultValue.description);
		} else {
			setProjectKey('');
			setName('');
			setDescription('');
		}
	}, [defaultValue]);

	const handleSubmit = () => {
		if (!projectKey || !name) return;
		// 실제 api 호출 부분에서 onCreate 호출하도록 변경 가능
		onCreate({ projectKey, name, description });
		onClose();
	};

	return (
		<ModalOverlay>
			<ModalBox>
				<h2>{isEdit ? '프로젝트 수정' : '프로젝트 생성'}</h2>
				<input
					placeholder="projectKey"
					value={projectKey}
					onChange={(e) => setProjectKey(e.target.value)}
					disabled={isEdit} // 수정 모드에서는 projectKey 변경 불가
				/>
				<input placeholder="이름" value={name} onChange={(e) => setName(e.target.value)} />
				<textarea placeholder="설명" value={description} onChange={(e) => setDescription(e.target.value)} />
				<button onClick={handleSubmit}>{isEdit ? '수정' : '생성'}</button>
				<button onClick={onClose}>닫기</button>
			</ModalBox>
		</ModalOverlay>
	);
};

const ModalOverlay = styled.div`
	position: fixed;
	left: 0;
	top: 0;
	width: 100vw;
	height: 100vh;
	background: rgba(0, 0, 0, 0.3);
	display: flex;
	align-items: center;
	justify-content: center;
`;

const ModalBox = styled.div`
	background: #fff;
	padding: 2rem;
	border-radius: 8px;
	display: flex;
	flex-direction: column;
	gap: 1rem;
`;

export default CreateProjectModal;
