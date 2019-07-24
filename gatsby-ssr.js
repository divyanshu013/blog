import { createElement } from 'react';

const applyDarkModeClass = `
(function() {
  try {
    var mode = localStorage.getItem('theme');
    if (mode === 'dark') {
			document.body.classList.add('dark');
		}
  } catch (e) {}
})();
`;

export const onRenderBody = ({ setPreBodyComponents }) => {
	const script = createElement('script', {
		dangerouslySetInnerHTML: {
			__html: applyDarkModeClass,
		},
	});
	setPreBodyComponents([script]);
};
