import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { LanguageProvider } from 'contexts/Localization';
import { store } from 'store';

const ThemeProviderWrapper = (props) => {
	const theme = { main: "mediumseagreen" };
	return <ThemeProvider theme={theme} {...props} />
}

const Providers: React.FC = ({ children }) => {
	return (
		<Provider store={store}>
			<ThemeProviderWrapper>
				<LanguageProvider>
					{children}
				</LanguageProvider>
			</ThemeProviderWrapper>
		</Provider> 
	)
}

export default Providers;