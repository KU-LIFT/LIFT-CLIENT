import { Global, css, useTheme } from '@emotion/react';

const GlobalStyle = () => {
	const theme = useTheme();

	const style = css`
		/* http://meyerweb.com/eric/tools/css/reset/ 
       v2.0 | 20110126
       License: none (public domain)
    */
		html,
		body,
		div,
		span,
		applet,
		object,
		iframe,
		h1,
		h2,
		h3,
		h4,
		h5,
		h6,
		p,
		blockquote,
		pre,
		a,
		abbr,
		acronym,
		address,
		big,
		cite,
		code,
		del,
		dfn,
		em,
		img,
		ins,
		kbd,
		q,
		s,
		samp,
		small,
		strike,
		strong,
		sub,
		sup,
		tt,
		var,
		b,
		u,
		i,
		center,
		dl,
		dt,
		dd,
		ol,
		ul,
		li,
		fieldset,
		form,
		label,
		legend,
		table,
		caption,
		tbody,
		tfoot,
		thead,
		tr,
		th,
		td,
		article,
		aside,
		canvas,
		details,
		embed,
		figure,
		figcaption,
		footer,
		header,
		hgroup,
		menu,
		nav,
		output,
		ruby,
		section,
		summary,
		time,
		mark,
		audio,
		video,
		button {
			margin: 0;
			padding: 0;

			font: inherit;
			font-size: 100%;
			vertical-align: baseline;

			border: 0;
		}

		/* HTML5 display-role reset for older browsers */
		article,
		aside,
		details,
		figcaption,
		figure,
		footer,
		header,
		hgroup,
		menu,
		nav,
		section {
			display: block;
		}

		body {
			font-family: 'Pretendard', sans-serif;
			line-height: 1.5;
			user-select: none;
			background-color: ${theme.ui.background};
			color: ${theme.text.primary};
		}

		ol,
		ul {
			list-style: none;
		}

		blockquote,
		q {
			quotes: none;
		}

		blockquote::before,
		blockquote::after,
		q::before,
		q::after {
			content: none;
		}

		table {
			border-collapse: collapse;
			border-spacing: 0;
		}

		html {
			font-size: 62.5%;
		}

		* {
			box-sizing: border-box;
		}

		:root {
			--fc-highlight-color: #dfe9ff;
			--fc-event-border-color: #ffff;
		}

		button {
			cursor: pointer;
			background-color: transparent;
			color: inherit;
		}

		a {
			text-decoration: none;
			color: inherit;
		}
	`;

	return <Global styles={style} />;
};

export default GlobalStyle;
