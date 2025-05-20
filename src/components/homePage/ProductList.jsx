import { Box, Heading, SimpleGrid, Text } from "@chakra-ui/react";

export default function ProductList({ produtos, categoria }) {
  const produtosFiltrados = produtos.filter(p => p.categoria === categoria);

  return (
    <Box px={4} py={4}>
      <Heading size="md" mb={2}>{categoria}</Heading>
      <SimpleGrid columns={[1, 2]} spacing={4}>
        {produtosFiltrados.map(prod => (
          <Box key={prod.id} p={4} bg="white" borderRadius="md" boxShadow="md">
            <Text fontWeight="bold">{prod.nome}</Text>
            <Text fontSize="sm" color="gray.600">{prod.descricao}</Text>
            <Text fontWeight="semibold" mt={2}>R$ {prod.preco.toFixed(2)}</Text>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
}
