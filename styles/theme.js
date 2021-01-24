import { extendTheme } from '@chakra-ui/react';
// import { mode } from '@chakra-ui/theme-tools';

const colors = {
  primary: {
    50: '#F0FFF4',
    100: '#C6F6D5',
    200: '#9AE6B4',
    300: '#68D391',
    400: '#48BB78',
    500: '#38A169',
    600: '#2F855A',
    700: '#276749',
    800: '#22543D',
    900: '#1C4532',
  },
  secondary: {
    50: '#F7FAFC',
    100: '#EDF2F7',
    200: '#E2E8F0',
    300: '#CBD5E0',
    400: '#A0AEC0',
    500: '#718096',
    600: '#4A5568',
    700: '#2D3748',
    800: '#1A202C',
    900: '#171923',
  },
};

// const theme = extendTheme({});

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  // styles: {
  //   global: {
  //     body: {
  //       bg: 'white',
  //     },
  //   },
  // },
  colors: {
    primary: colors.primary,
  },
  components: {
    Container: {
      baseStyle: {
        maxW: {
          base: '100%',
          sm: '65ch',
          md: '75ch',
          lg: '95ch',
        },
      },
      variants: {
        fluid: {
          maxW: {
            base: '100%',
            sm: '100%',
            md: '100%',
            lg: '100%',
          },
        },
      },
    },
  },
});

export default theme;
