import { Flex, Text, IconButton } from "@chakra-ui/react";
import { FaUser } from "react-icons/fa";

export default function Header() {
  return (
    <Flex justify="space-between" align="center" p={4} bg="#3e7671" color="white">
      <Text fontSize="xl" fontWeight="bold">Meu Restaurante</Text>
      <IconButton
        icon={<FaUser />}
        variant="ghost"
        color="white"
        _hover={{ bg: "rgba(255, 255, 255, 0.1)" }}
        onClick={() => window.location.href = "/login"}
        aria-label="Perfil"
      />
    </Flex>
  );
}
