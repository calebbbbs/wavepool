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
      bg: mode("white", "#080d09")(props),
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
    }
  })
}

const colors = {
  brand: {
    // 100: "#f7fafc",
    // // ...
    // 900: "#1e332b",
  },
}

const theme = extendTheme({ config, styles, colors })
export default theme