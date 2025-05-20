import { Box, Image, Text, VStack } from "@chakra-ui/react";

export default function ProductCard({ product }) {
  return (
    <Box borderWidth="1px" borderRadius="lg" p={4} boxShadow="sm">
      <Image src={product.image} alt={product.name} borderRadius="md" />
      <VStack align="start" mt={2}>
        <Text fontWeight="bold">{product.name}</Text>
        <Text fontSize="sm" color="gray.600">{product.description}</Text>
        <Text color="teal.600" fontWeight="bold">R$ {parseFloat(product.price).toFixed(2)}</Text>
      </VStack>
    </Box>
  );
}
