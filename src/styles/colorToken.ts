import color from './color';

const colorToken = {
	Primary: {
		normal: color.Purple[500],
		strong: color.Purple[600],
		heavy: color.Purple[700],
		strongVariant: color.Purple[100],
		heavyVariant: color.Purple[200],
	},
	Neutral: {
		normal: color.Grey.White,
		strong: color.Grey[100],
		heavy: color.Grey[200],
		accent: color.Grey[300],
		light: color.Grey[800],
	},
	Text: {
		primary: color.Grey[900],
		primaryVariant: color.Purple[500],
		neutralDark: color.Grey.White,
		neutralLight: color.Grey[800],
		assistive: color.Grey[600],
		assistiveLight: color.Grey[500],
		disable: color.Grey[400],
	},
	Outline: {
		primaryNormal: color.Purple[300],
		primaryStrong: color.Purple[500],
		neutralNormal: color.Grey[300],
		neutralStrong: color.Grey[400],
	},
	Divider: {
		neutral: color.Grey[300],
		primary: color.Purple[200],
	},
	Component: {
		normal: color.Grey.White,
		strong: color.Purple[50],
		heavy: color.Purple[100],
		accent: color.Purple[300],
		assistive: color.Grey[100],
	},
	Icon: {
		normal: color.Grey[600],
		strong: color.Grey[700],
		heavy: color.Grey[900],
		primary: color.Purple[500],
		inverse: color.Grey.White,
	},
};

export default colorToken;
