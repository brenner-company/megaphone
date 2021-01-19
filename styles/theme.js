import { extendTheme } from '@chakra-ui/react';

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
};

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: 'gray.100',
      },
    },
  },
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
    },
  },
});

export default theme;
