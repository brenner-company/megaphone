import { useAuth } from '@/lib/auth';
import Link from 'next/link';
import {
  useColorMode,
  useColorModeValue,
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
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from '@chakra-ui/react';
import { Button } from '@/components/Button';
import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  RiUser3Fill,
  RiUser3Line,
  RiMoonClearFill,
  RiLogoutBoxRLine,
} from 'react-icons/ri';

export default function Header() {
  const auth = useAuth();

  const { colorMode, toggleColorMode } = useColorMode();
  const isDarkMode = colorMode === 'dark';

  const styles = {
    menu: {
      item: {
        variants: {
          error: {
            color: useColorModeValue('red.500', 'red.300'),
            _focus: {
              bg: useColorModeValue('red.50', 'redLightAlpha.300'),
            },
            _active: {
              color: useColorModeValue('red.600', 'red.400'),
              bg: useColorModeValue('red.100', 'redLightAlpha.400'),
            },
          },
        },
      },
    },
  };

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

            <HStack spacing={[4, 8]}>
              <FormControl display="flex" alignItems="stretch" flex="0">
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
                <Box>
                  <Menu placement="bottom-end">
                    <MenuButton
                      as={Button}
                      variant="solid"
                      rightIcon={<ChevronDownIcon />}
                    >
                      {/* <Icon as={RiUser2Fill} mr={1} /> */}
                      {auth.user.displayName}
                    </MenuButton>
                    <MenuList>
                      <Link href="/account">
                        <MenuItem>
                          <Box mr={1}>
                            <RiUser3Line />
                          </Box>
                          My Account
                        </MenuItem>
                      </Link>
                      <MenuDivider />
                      <MenuItem
                        onClick={handleSignout}
                        color={styles.menu.item.variants.error.color}
                        _focus={{
                          bg: styles.menu.item.variants.error._focus.bg,
                        }}
                        _active={{
                          color: styles.menu.item.variants.error._active.color,
                          bg: styles.menu.item.variants.error._active.bg,
                        }}
                      >
                        <Box mr={1}>
                          <RiLogoutBoxRLine />
                        </Box>
                        Sign out
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Box>
              ) : (
                <Link href="/login">
                  <Button leftIcon={<RiUser3Fill />}>
                    {/* RiLoginBoxLine */}
                    Sign up or log in
                  </Button>
                </Link>
              )}
            </HStack>
          </Flex>
        </Box>
      </Container>
    </Box>
  );
}
