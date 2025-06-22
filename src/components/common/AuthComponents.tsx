import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { theme } from '@/styles/theme';

export const AuthTitle = styled.h2`
	font-size: 3.6rem;
	font-weight: 600;
	color: ${({ theme }) => theme.text.primary};
	text-align: center;
`;

const inputStyles = css`
	width: 100%;
	height: 4.8rem;
	padding: 0 1.6rem;
	font-size: 1.6rem;
	background-color: ${theme.ui.background};
	border: 1px solid ${theme.ui.border};
	border-radius: 6px;
	color: ${theme.text.primary};
	box-sizing: border-box;
	transition: border-color 0.2s;

	&:focus {
		outline: none;
		border-color: ${theme.interactive.primary};
	}

	&::placeholder {
		color: ${theme.text.disabled};
	}
`;

export const AuthInput = styled.input`
	${inputStyles}
`;

export const AuthButton = styled.button`
	width: 100%;
	height: 4.8rem;
	border-radius: 6px;
	background-color: ${({ theme, disabled }) => (disabled ? theme.interactive.secondary : theme.interactive.primary)};
	font-size: 1.6rem;
	font-weight: 600;
	color: ${({ theme }) => theme.text.inverse};
	cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
	border: none;
	transition: background-color 0.2s;

	&:hover {
		background-color: ${({ theme, disabled }) => !disabled && theme.interactive.primaryHover};
	}
`;

export const AuthInputContainer = styled.div`
	width: 90%;
	display: flex;
	flex-direction: column;
	gap: 1.6rem;
`;
