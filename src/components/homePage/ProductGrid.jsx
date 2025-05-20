import { SimpleGrid } from "@chakra-ui/react";
import ProductCard from "./ProductCard";

export default function ProductGrid({ products }) {
  return (
    <SimpleGrid columns={[1, 2, 3]} spacing={4}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </SimpleGrid>
  );
}
