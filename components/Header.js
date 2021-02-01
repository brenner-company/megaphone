import Link from 'next/link';
import {
  useColorMode,
  Container,
  Link as Hyperlink,
  Flex,
  Box,
  FormControl,
  FormLabel,
  Switch,
  Icon,
  VisuallyHidden,
  HStack,
  Heading,
} from '@chakra-ui/react';
import { Button } from '@/components/Button';
import { RiUser3Fill, RiMoonClearFill } from 'react-icons/ri';

export default function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDarkMode = colorMode === 'dark';

  return (
    <Box borderBottomWidth="1px">
      <Container variant="fluid">
        <Box py={4}>
          <Flex alignItems="center" justifyContent="space-between">
            <Link href="/">
              <Hyperlink mr={2}>
                <Heading as="h1" fontSize="2xl">
                  Megaphone
                </Heading>
              </Hyperlink>
            </Link>

            <HStack spacing={4}>
              <FormControl display="flex" alignItems="stretch" flex="0" mr={4}>
                <FormLabel
                  htmlFor="email-alerts"
                  mb="0"
                  mr={2}
                  display="flex"
                  alignItems="center"
                >
                  <VisuallyHidden>Dark mode</VisuallyHidden>
                  <Icon as={RiMoonClearFill} />
                </FormLabel>

                <Switch
                  id="email-alerts"
                  isChecked={isDarkMode}
                  onChange={toggleColorMode}
                  colorScheme="primary"
                />
              </FormControl>
              <Link href="/login">
                <Button leftIcon={<RiUser3Fill />}>Sign up or log in</Button>
              </Link>
            </HStack>
          </Flex>
        </Box>
      </Container>
    </Box>
  );
}
