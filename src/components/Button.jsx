import styled from '@emotion/styled';

import { COLOR_PRIMARY, CUBIC_BEZIER_TRANSITION } from '../utils/theme';

const Button = styled('button')(props => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	borderRadius: props.circular ? '50%' : 4,
	background: 'transparent',
	border: `1px solid ${props.theme.borderColor}`,
	padding: props.circular ? 16 : '16px 32px',
	transition: CUBIC_BEZIER_TRANSITION,
	cursor: 'pointer',
	color: 'inherit',
	'&:hover, &:focus': {
		outline: 0,
		color: COLOR_PRIMARY,
		boxShadow: '0 1px 3px 0 rgba(0,0,0,0.1),0 1px 2px 0 rgba(0,0,0,0.06)',
		borderColor: props.theme.borderHoverColor,
	},
}));

export default Button;
