import Image from 'next/image';
import { Box, Badge } from '@chakra-ui/react';

export default function Event() {
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Image
        src="/images/events/5b218ef7-5d98-11eb-b07d-02b7b76bf47f.jpg"
        alt="Bike race"
        layout="responsive"
        width={1280}
        height={720}
        priority
      />

      <Box p="6">
        <Box d="flex" alignItems="baseline">
          <Badge borderRadius="full" px="2" colorScheme="primary">
            New
          </Badge>
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
          >
            Cycling
          </Box>
        </Box>

        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          Santos Tour Down Under
        </Box>

        <Box>
          <Box as="span" color="gray.600" fontSize="sm">
            19/01 - 24/01
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
