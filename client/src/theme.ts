// theme.ts
import { extendTheme, ThemeConfig } from "@chakra-ui/react"
import { mode } from "@chakra-ui/theme-tools"

const config : ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
}
const styles = {
  global: (props: any) => ({
    "body": {
      fontFamily: "body",
      color: mode("gray.800", "whiteAlpha.900")(props),
      bg: mode("brand.200", "brand.900")(props),
      lineHeight: "tall"
    },
    "*::placeholder": {
      color: mode("gray.400", "whiteAlpha.400")(props),
    },
    "*, *::before, &::after": {
      borderColor: mode("gray.200", "whiteAlpha.300")(props),
      wordWrap: "break-word",
    },
    "a": {
      color:  mode("teal.300", "teal.500")(props),
    },
    "Drawer": {
      bg: mode("brand.50", "brand.900")(props),
    }
  })
}


const components = {
  Drawer: {
  baseStyle: {
    bg: "brand.800",
    colorScheme: "brand"
  }
}
}

const colors = {
  brand: {
    50: "#EFFBF1",
    100: "#C5EFCB",
    200: "#6FD87F",
    300: "#4FCF62",
    400: "#30B043",
    500: "#4A824A",
    600: "#758173",
    700: "#4E564D",
    800: "#2D3F27",
    900: "#020402",
  },
}

const theme = extendTheme({ config, styles, colors, components })
export default theme