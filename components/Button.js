// import { forwardRef } from '@chakra-ui/system';
import { forwardRef, Button as ChakraButton } from '@chakra-ui/react';

export const Button = forwardRef((props, ref) => {
  const { colorScheme, children, ...rest } = props;

  return (
    <ChakraButton ref={ref} {...rest} colorScheme="primary">
      {children}
    </ChakraButton>
  );
});
