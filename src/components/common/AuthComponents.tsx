import styled from '@emotion/styled';

export const AuthTitle = styled.p`
	font-size: 4rem;
	font-weight: 600;
	color: ${({ theme }) => theme.colors.primaryText};
`;

export const AuthInput = styled.input`
	width: 40rem;
	height: 7rem;
	border: 1px solid lightgray;
	border-radius: 20px;
	padding: 0 2rem;
	box-sizing: border-box;
	font-size: 1.6rem;
`;

export const AuthButton = styled.button`
	width: 40rem;
	height: 7rem;
	border-radius: 20px;
	background-color: ${({ theme }) => theme.colors.accent};
	font-size: 2rem;
	font-weight: 600;
	color: white;
	cursor: pointer;
`;

export const AuthInputContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 15px;
`;
