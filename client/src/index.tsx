import React, { useReducer, useState } from "react";
import ReactDOM from "react-dom";
import {
  ChakraProvider,
  ColorModeScript,
  extendTheme,
  ThemeConfig,
} from "@chakra-ui/react";
import App from "./App";
import customTheme from "./overrides";
import { BrowserRouter as Router } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { UserContextProvider } from "./contexts/UserContext";
import { mode } from "@chakra-ui/theme-tools";

const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache(),
});

const Index = () => {
  const [fontSize, toggleFontSize] = useReducer((state) => !state, false);
  const [colorTheme, changeColorTheme] = useState<any>({
    50: "#EFFBF1",
    100: "#CCE0D1",
    200: "#A6C9AE",
    300: "#4FCF62",
    400: "#30B043",
    500: "#2F8122",
    600: "#758173",
    700: "#4E564D",
    800: "#31493B",
    900: "#020402",
  });

  const config: ThemeConfig = {
    initialColorMode: "dark",
    useSystemColorMode: false,
  };
  const styles = {
    global: (props: any) => ({
      body: {
        fontFamily: "body",
        color: mode("gray.800", "whiteAlpha.900")(props),
        bg: mode("brand.200", "brand.900")(props),
        lineHeight: "tall",
      },
      "*::placeholder": {
        color: mode("gray.400", "whiteAlpha.400")(props),
      },
      "*, *::before, &::after": {
        borderColor: mode("gray.200", "whiteAlpha.300")(props),
        wordWrap: "break-word",
      },
      a: {
        color: mode("teal.300", "teal.500")(props),
      },
      hr: {
        backgroundColor: mode("white", "black"),
      },
      Link: {
        fontSize: "xl",
      },
      p: {
        fontSize: "lg",
      },
      div: {
        fontSize: "lg",
      },
      VStack: {
        fontSize: "lg",
      },
      Text: {
        fontSize: "lg",
      },
    }),
  };

  const colors = {
    brand: colorTheme,
  };

  const fonts: any = {
    textStyles: {
      h1: {
        xl: "1.25rem",
        "2xl": "1.5rem",
      },
    },
  };

  const components = {
    Tooltip: {
      baseStyle: {
        color: mode("gray.800", "whiteAlpha.900"),
        bg: mode("brand.200", "brand.900"),
        colorScheme: "brand",
      },
    },
  };

  const theme = extendTheme({ config, styles, components, colors, fonts });

  return (
    <ChakraProvider theme={fontSize ? customTheme : theme}>
      <ApolloProvider client={client}>
        <UserContextProvider>
          <Router>
            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            <App
              toggleFont={toggleFontSize}
              changeColorTheme={changeColorTheme}
              cusTheme={theme}
            />
          </Router>
        </UserContextProvider>
      </ApolloProvider>
    </ChakraProvider>
  );
};

ReactDOM.render(<Index />, document.getElementById("root"));
