import styled from '@emotion/styled';

type TagProps = {
	name: string;
};

const Tag = ({ name }: TagProps) => {
	return <TagContainer>{name}</TagContainer>;
};

export default Tag;

const TagContainer = styled.div`
	display: flex;
	padding: 0px 12px;
	justify-content: center;
	align-items: center;
	gap: 12px;
	border-radius: 6px;
	background: var(--Blue-Grey-Blue-Grey-050, #f0f4f8);

	color: var(--Blue-Grey-Blue-Grey-900, #102a43);
	font-family: Inter;
	font-size: 15px;
	font-style: normal;
	font-weight: 400;
	line-height: 27px;
`;
