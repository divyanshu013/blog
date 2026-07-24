module.exports = {
	testEnvironment: 'jsdom',
	transform: {
		'^.+\\.[jt]sx?$': ['babel-jest', { presets: ['babel-preset-gatsby'] }],
	},
	moduleNameMapper: {
		'.+\\.(css|styl|less|sass|scss)$': 'identity-obj-proxy',
		'.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
			'<rootDir>/__mocks__/fileMock.js',
	},
	testPathIgnorePatterns: ['node_modules', '\\.cache', 'public'],
	transformIgnorePatterns: ['node_modules/(?!(gatsby|gatsby-script|gatsby-link)/)'],
	globals: {
		__PATH_PREFIX__: '',
	},
	setupFilesAfterEnv: ['<rootDir>/jest-setup.js'],
	testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
};
