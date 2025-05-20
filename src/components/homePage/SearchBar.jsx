import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

export default function SearchBar({ value, onChange }) {
  return (
    <InputGroup px={4} py={2}>
      <InputLeftElement pointerEvents="none">
        <SearchIcon color="gray.500" />
      </InputLeftElement>
      <Input
        placeholder="Buscar por item..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        bg="white"
        borderRadius="md"
      />
    </InputGroup>
  );
}
