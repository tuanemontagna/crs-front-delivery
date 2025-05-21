import { Heading } from "@chakra-ui/react";

export default function EmptyState({ categories, products, loading, selectedCategoryId }) {
  if (loading) return null;
  if (categories.length === 0) {
    return (
      <Heading size="md" color="gray.500" mt={8} textAlign="center">
        Nenhuma categoria cadastrada.
      </Heading>
    );
  }
  if (categories.length > 0 && products.length === 0) {
    return (
      <Heading size="md" color="gray.500" mt={8} textAlign="center">
        {selectedCategoryId
          ? "Nenhum produto encontrado para esta categoria."
          : "Nenhum produto encontrado."}
      </Heading>
    );
  }
  return null;
}