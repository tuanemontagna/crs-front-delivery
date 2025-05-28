import { SimpleGrid, Box, Image, Text, Spinner, Button } from "@chakra-ui/react";

export default function ProductGradeAdmin({ products, loading, onAddToCart }) {
  if (loading) return <Spinner mt={10} color="#eb722b" size="xl" />;
  if (!products.length) return null;

  return (
    <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={6}>
      {products.map(prod => (
        <Box
          key={prod.id}
          bg="white"
          borderRadius="xl"
          boxShadow="md"
          p={4}
          _hover={{ boxShadow: "xl", transform: "translateY(-4px)" }}
          transition="all 0.2s"
        >
          <Image
            src={prod.image ? `http://localhost:3333/${prod.image}` : "/images/delivery.png"}
            alt={prod.name}
            borderRadius="lg"
            boxSize="120px"
            objectFit="cover"
            mx="auto"
            mb={3}
          />
          <Text fontWeight="bold" fontSize="lg" mb={1} color="#eb722b">
            {prod.name}
          </Text>
          <Text fontSize="sm" color="gray.600" mb={2}>
            {prod.description}
          </Text>
          <Text fontWeight="bold" color="#eb722b" fontSize="md" mb={3}>
            {prod.price?.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
          </Text>
        </Box>
      ))}
    </SimpleGrid>
  );
}