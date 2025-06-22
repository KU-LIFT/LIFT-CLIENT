import color from './color';
import colorToken from './colorToken';
import font from './font';

export const theme = {
	ui: {
		background: color.Grey[100],
		panel: color.Grey.White,
		border: color.Grey[300],
		shadow: 'rgba(0, 0, 0, 0.1)',
	},
	text: {
		primary: color.Grey[900],
		secondary: color.Grey[700],
		disabled: color.Grey[500],
		accent: colorToken.Primary.normal,
		inverse: color.Grey.White,
	},
	interactive: {
		primary: colorToken.Primary.normal,
		primaryHover: colorToken.Primary.strong,
		primaryActive: colorToken.Primary.heavy,
		secondary: color.Grey[300],
		secondaryHover: color.Grey[400],
		danger: '#dc3545',
	},
	status: {
		todo: color.Blue.Blue1,
		inProgress: color.Blue.Blue2,
		done: color.Grey[300],
	},

	colorToken,
	color,
	font,
};

export type ThemeType = typeof theme;
