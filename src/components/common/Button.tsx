import Icn from '@/assets/svg';
import { css, SerializedStyles, useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import Icon from './Icon';

// 이후 타입 여러군데에서 필요하면 빼서 export
type SizeType = 'small' | 'medium' | 'large';
type ButtonType = 'primary' | 'secondary' | 'text';

type ButtonProps = {
	type: ButtonType;
	size?: SizeType;
	disabled?: boolean;
	leftIcon?: keyof typeof Icn;
	rightIcon?: keyof typeof Icn;
	label: string;
	additionalCss?: SerializedStyles;
	onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
	onMouseDown?: React.MouseEventHandler<HTMLButtonElement>;
};

function Button({
	type,
	size = 'medium',
	disabled = false,
	leftIcon,
	rightIcon,
	label,
	additionalCss,
	onClick,
	onMouseDown,
}: ButtonProps) {
	const { font, color, interactive, text } = useTheme();
	// 크기별 사이즈
	const buttonSizes: Record<SizeType, SerializedStyles> = {
		small: css`
			height: 2.4rem;
			${font.label05}
		`,
		medium: css`
			height: 3.2rem;
			${font.label04}
		`,
		large: css`
			height: 4rem;
			${font.label03}
		`,
	};

	const buttonTypeStyle: Record<ButtonType, SerializedStyles> = {
		primary: css`
			background-color: ${interactive.primary};
			color: ${text.inverse};
			border: none;

			&:hover {
				background-color: ${interactive.primaryHover};
			}
			&:active {
				background-color: ${interactive.primaryActive};
			}
			&:disabled {
				background-color: ${interactive.secondary};
				color: ${text.disabled};
			}
		`,
		secondary: css`
			background-color: ${color.Grey.White};
			color: ${text.primary};
			border: 1px solid ${interactive.secondary};

			&:hover {
				background-color: ${color.Grey[200]};
			}
			&:active {
				background-color: ${color.Grey[300]};
			}
			&:disabled {
				border-color: ${interactive.secondary};
				color: ${text.disabled};
			}
		`,
		text: css`
			background-color: transparent;
			color: ${text.primary};
			border: none;

			&:hover {
				background-color: ${interactive.secondary};
			}
			&:active {
				background-color: ${color.Grey[300]};
			}
			&:disabled {
				color: ${text.disabled};
			}
		`,
	};

	const ButtonLayout = styled.button`
		display: flex;
		gap: 0.8rem;
		align-items: center;
		box-sizing: border-box;
		${buttonSizes[size]};
		padding-right: 1.6rem;
		padding-left: 1.6rem;

		${buttonTypeStyle[type]}
		border-radius: 4px;

		${additionalCss}
		cursor: ${disabled ? 'not-allowed' : 'pointer'};
		transition: background-color 0.2s ease-in-out;
	`;

	/** Button 사이즈에 따라 아이콘 사이즈 결정 */
	const iconSize: Record<SizeType, 'tiny' | 'small' | 'medium'> = {
		small: 'tiny',
		medium: 'small',
		large: 'medium',
	};

	return (
		<ButtonLayout disabled={disabled} onClick={onClick} onMouseDown={onMouseDown}>
			{leftIcon && <Icon name={leftIcon} size={iconSize[size]} />}
			{label}
			{rightIcon && <Icon name={rightIcon} size={iconSize[size]} />}
		</ButtonLayout>
	);
}

export default Button;
