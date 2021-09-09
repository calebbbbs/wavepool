import React, {useReducer} from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider, ColorModeScript} from '@chakra-ui/react';
import App from './App';
import customTheme from './overrides';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { UserContextProvider } from './contexts/UserContext';
import theme from "./theme"
const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

const AppStyles = () =>{
  const [fontSize, toggleFontSize] = useReducer((state) => !state, false);
  return (
  <ChakraProvider theme={fontSize ? customTheme : theme}>
    <ApolloProvider client={client}>
      <UserContextProvider>
      <Router>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <App toggleFont={toggleFontSize}/>
      </Router>
      </UserContextProvider>
    </ApolloProvider>
  </ChakraProvider>
  )
};

ReactDOM.render(
  <AppStyles/>,
  document.getElementById('root')
);
