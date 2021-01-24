import {
  useColorMode,
  Container,
  Link,
  Flex,
  Box,
  FormControl,
  FormLabel,
  Switch,
  Icon,
  VisuallyHidden,
  HStack,
} from '@chakra-ui/react';
// import Button from '@/components/Button';
import Login from '@/components/Login';
import { RiMoonClearFill } from 'react-icons/ri';

export default function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDarkMode = colorMode === 'dark';

  return (
    <Box borderBottomWidth="1px">
      <Container variant="fluid">
        <Box py={4}>
          <Flex alignItems="center" justifyContent="space-between">
            <Link mr={2} fontWeight="bold" fontSize="xl">
              Megaphone
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
                />
              </FormControl>
              {/* <Button leftIcon={<RiUser3Fill />} onClick={Login.onOpen}>
                Sign up or log in
              </Button> */}
              <Login />
            </HStack>
          </Flex>
        </Box>
      </Container>
    </Box>
  );
}
