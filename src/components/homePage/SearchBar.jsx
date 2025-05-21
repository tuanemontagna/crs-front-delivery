import { Box, Input } from "@chakra-ui/react";
import { IoIosSearch } from "react-icons/io";

export default function SearchBar({ search, setSearch }) {
  return (
    <Box position="relative" maxW="lg" mx="auto" mb={6}>
      <Input
        type="text"
        placeholder="Buscar por produto"
        color="gray"
        bg="white"
        value={search}
        onChange={e => setSearch(e.target.value)}
        borderRadius="full"
        boxShadow="sm"
        pl="44px"
        h="45px"
        _focus={{ borderColor: "#eb722b", boxShadow: "0 0 0 1px #eb722b" }}
      />
      <Box
        position="absolute"
        top="50%"
        left="16px"
        transform="translateY(-50%)"
        pointerEvents="none"
      >
        <IoIosSearch size={20} color="gray" />
      </Box>
    </Box>
  );
}