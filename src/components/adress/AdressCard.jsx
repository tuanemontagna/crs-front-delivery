import { Box, Stack, Text, Button, Tooltip } from "@chakra-ui/react";
import { MdMode, MdDelete } from "react-icons/md";

export default function AdressCard({ endereco, onEdit, onDelete }) {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      p={4}
      mb={4}
      boxShadow="sm"
      bg="gray.50"
    >
      <Stack spacing={1}>
        <Text><strong>CEP:</strong> {endereco.zipCode}</Text>
        <Text><strong>Estado:</strong> {endereco.state}</Text>
        <Text><strong>Cidade:</strong> {endereco.city}</Text>
        <Text><strong>Bairro:</strong> {endereco.district}</Text>
        <Text><strong>Rua:</strong> {endereco.street}</Text>
        <Text><strong>Número:</strong> {endereco.numberForget}</Text>
      </Stack>
      <Stack direction="row" spacing={2} mt={3}>
        <Tooltip label="Editar">
          <Button
            colorScheme="blue"
            size="sm"
            onClick={onEdit}
            leftIcon={<MdMode />}
          >
            Editar
          </Button>
        </Tooltip>
        <Tooltip label="Excluir">
          <Button
            colorScheme="red"
            size="sm"
            onClick={onDelete}
            leftIcon={<MdDelete />}
          >
            Excluir
          </Button>
        </Tooltip>
      </Stack>
    </Box>
  );
}