import { HStack, Button } from "@chakra-ui/react";

export default function CategoryList({ categories, onSelect }) {
  return (
    <HStack spacing={4} overflowX="auto" py={4}>
      {categories.map((cat) => (
        <Button key={cat.id} onClick={() => onSelect(cat.id)} colorScheme="teal" variant="outline">
          {cat.name}
        </Button>
      ))}
    </HStack>
  );
}
