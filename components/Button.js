import { omitThemingProps } from '@chakra-ui/system';
import { Button as ChakraButton } from '@chakra-ui/react';

export default function Button(props) {
  const { colorScheme, children, ...rest } = omitThemingProps(props);

  return (
    <ChakraButton {...rest} colorScheme="primary">
      {children}
    </ChakraButton>
  );
}
