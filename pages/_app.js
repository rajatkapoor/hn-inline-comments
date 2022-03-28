import { Box, ChakraProvider } from "@chakra-ui/react";
import { theme } from "../theme";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider resetCSS={false} theme={theme}>
      <Box minH={"100vh"} bg="blue.900" p={16}>
        <Box height={"100%"} rounded={"xl"} bg="white" padding={16}>
          <Component {...pageProps} />
        </Box>
      </Box>
    </ChakraProvider>
  );
}

export default MyApp;
