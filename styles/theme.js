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
  redLightAlpha: {
    50: 'rgba(254, 178, 178, 0.04)',
    100: 'rgba(254, 178, 178, 0.06)',
    200: 'rgba(254, 178, 178, 0.08)',
    300: 'rgba(254, 178, 178, 0.16)',
    400: 'rgba(254, 178, 178, 0.24)',
    500: 'rgba(254, 178, 178, 0.36)',
    600: 'rgba(254, 178, 178, 0.48)',
    700: 'rgba(254, 178, 178, 0.64)',
    800: 'rgba(254, 178, 178, 0.80)',
    900: 'rgba(254, 178, 178, 0.92)',
  },
};

// const theme = extendTheme({});

const theme = extendTheme({
  config: {
    initialColorMode: 'light',
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
    redLightAlpha: colors.redLightAlpha,
  },
  shadows: {
    outline: '0 0 0 3px rgba(72, 187, 120, 0.5)',
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
        narrow: {
          maxW: {
            base: '100%',
            sm: '45ch',
            md: '45ch',
            lg: '45ch',
          },
        },
      },
    },
  },
});

export default theme;
