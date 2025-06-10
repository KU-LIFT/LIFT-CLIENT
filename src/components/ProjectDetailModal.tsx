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
		<BackDrop>
			<ModalLayout>
				<MemberModalHeader>
					<Title>{isEdit ? '프로젝트 수정' : '프로젝트 생성'}</Title>
					<IconButton type="normal" iconName="IcnX" onClick={onClose} />
				</MemberModalHeader>

				<FirstContainer>
					<Input
						placeholder="projectKey"
						value={projectKey}
						onChange={(e) => setProjectKey(e.target.value)}
						disabled={isEdit} // 수정 모드에서는 projectKey 변경 불가
					/>
					<Input placeholder="이름" value={name} onChange={(e) => setName(e.target.value)} />
					<textarea placeholder="설명" value={description} onChange={(e) => setDescription(e.target.value)} />
				</FirstContainer>

				<Wrapper>
					<Button type="outlined-primary" label={isEdit ? '수정' : '생성'} onClick={handleSubmit} />
				</Wrapper>
			</ModalLayout>
		</BackDrop>
	);
};

const BackDrop = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.2);
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	z-index: 1000;
`;

const ModalLayout = styled.div`
	background-color: ${({ theme }) => theme.color.Grey.White};

	width: 600px;

	padding: 20px;

	border-radius: 8px;
`;

const MemberModalHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 16px 0;
	background: #fff;
	border-bottom: 1px solid #eaeaea;

	h1 {
		margin: 0;
		font-size: 1.5rem;
		color: #333;
	}
`;

const FirstContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;

	padding: 20px 10px;

	gap: 15px;
`;

const Title = styled.p`
	font-size: 2.4rem;
	font-weight: 600;
`;

const Wrapper = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: flex-end;
`;

const Input = styled.input`
	padding: 5px 10px;
	width: 90%;

	font-size: 1.4rem;
`;

export default ProjectDetailModal;
