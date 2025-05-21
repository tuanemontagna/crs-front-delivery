import { HStack, VStack, Box, Image, Text } from "@chakra-ui/react";

export default function CategoryCarrossel({ categories, selectedCategoryId, setSelectedCategoryId }) {
  return (
    <HStack overflowX="auto" spacing={4} py={2}>
      <VStack
        minW="90px"
        spacing={2}
        cursor="pointer"
        onClick={() => setSelectedCategoryId(null)}
        borderBottom={selectedCategoryId === null ? "2px solid #eb722b" : "2px solid transparent"}
        transition="border 0.2s"
      >
        <Box
          boxSize="56px"
          bg="white"
          borderRadius="full"
          boxShadow="md"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Image src="/category-default.png" alt="Todos" boxSize="32px" />
        </Box>
        <Text
          fontSize="sm"
          color={selectedCategoryId === null ? "#eb722b" : "gray.700"}
          fontWeight="semibold"
        >
          todos
        </Text>
      </VStack>
      {categories.map(cat => (
        <VStack
          key={cat.id}
          minW="90px"
          spacing={2}
          cursor="pointer"
          onClick={() => setSelectedCategoryId(cat.id)}
          borderBottom={selectedCategoryId === cat.id ? "2px solid #eb722b" : "2px solid transparent"}
          transition="border 0.2s"
        >
          <Box
            boxSize="56px"
            bg="white"
            borderRadius="full"
            boxShadow="md"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Image src={cat.iconUrl || "/category-default.png"} alt={cat.name} boxSize="32px" />
          </Box>
          <Text
            fontSize="sm"
            color={selectedCategoryId === cat.id ? "#eb722b" : "gray.700"}
            fontWeight="semibold"
          >
            {cat.name}
          </Text>
        </VStack>
      ))}
    </HStack>
  );
}