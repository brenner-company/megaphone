import { ChakraProvider } from '@chakra-ui/react';
import { ProvideAuth } from '@/lib/auth';
import theme from '@/styles/theme';

// import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <ProvideAuth>
        <Component {...pageProps} />
      </ProvideAuth>
    </ChakraProvider>
  );
}

export default MyApp;
