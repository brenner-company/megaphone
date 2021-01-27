import { Container, Box, SimpleGrid, HStack } from '@chakra-ui/react';
import Event from '@/components/Event';
import { Button } from '@/components/Button';
// import { FaCalendarPlus } from 'react-icons/fa';

export default function Dashboard() {
  return (
    <Container variant="fluid">
      <Box py={6}>
        <Box mb={3}>
          <HStack justify="flex-end">
            <Button variant="outline">Add an event</Button>
          </HStack>
        </Box>
        <SimpleGrid
          templateColumns="repeat(auto-fill, minmax(280px, 1fr))"
          autoRows="minmax(150px, auto)"
          spacing={6}
        >
          <Event />
          <Event />
          <Event />
        </SimpleGrid>
      </Box>
    </Container>
  );
}
