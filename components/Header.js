import { useAuth } from '@/lib/auth';
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
  Text,
} from '@chakra-ui/react';
import { Button } from '@/components/Button';
import { RiUser3Fill, RiMoonClearFill } from 'react-icons/ri';

export default function Header() {
  const auth = useAuth();

  const { colorMode, toggleColorMode } = useColorMode();
  const isDarkMode = colorMode === 'dark';

  const handleSignout = () => {
    auth.signout();
  };

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
                  htmlFor="dark-mode"
                  mb="0"
                  mr={2}
                  display="flex"
                  alignItems="center"
                >
                  <VisuallyHidden>Dark mode</VisuallyHidden>
                  <Icon as={RiMoonClearFill} />
                </FormLabel>

                <Switch
                  id="dark-mode"
                  isChecked={isDarkMode}
                  onChange={toggleColorMode}
                  colorScheme="primary"
                />
              </FormControl>
              {auth.user ? (
                <>
                  <Text>{auth.user.displayName}</Text>
                  <Button onClick={handleSignout}>Sign out</Button>
                </>
              ) : (
                <Link href="/login">
                  <Button leftIcon={<RiUser3Fill />}>Sign up or log in</Button>
                </Link>
              )}
            </HStack>
          </Flex>
        </Box>
      </Container>
    </Box>
  );
}
