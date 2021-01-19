import { Container, Link, Flex, Box } from '@chakra-ui/react';
import Button from '@/components/Button';
import { RiUser3Fill } from 'react-icons/ri';

export default function Header() {
  return (
    <Box bgColor="white">
      <Container>
        <Box py={4}>
          <Flex alignItems="center" justifyContent="space-between">
            <Link mr={2} fontWeight="bold" fontSize="xl">
              Megaphone
            </Link>

            <Box>
              <Button leftIcon={<RiUser3Fill />} colorScheme="primary">
                Sign up or log in
              </Button>
            </Box>
          </Flex>
        </Box>
      </Container>
    </Box>
  );
}
