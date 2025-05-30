import { useState } from "react";
import { Box, Stack, Text, Button} from "@chakra-ui/react";
import EditarAdressDialog from "./EditarAdressDialog";
import { Tooltip } from "@/components/ui/tooltip"

export default function AdressCard({ endereco, onDelete, onUpdate }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box
      borderWidth="1px"
      borderColor="#eb722b"
      borderRadius="lg"
      p={4}
      mb={4}
      boxShadow="sm"
      bg="gray.50"
    >
      <Stack spacing={1}>
        <Text color="#eb722b"><strong>CEP:</strong> {endereco.zipCode}</Text>
        <Text color="#eb722b"><strong>Estado:</strong> {endereco.state}</Text>
        <Text color="#eb722b"><strong>Cidade:</strong> {endereco.city}</Text>
        <Text color="#eb722b"><strong>Bairro:</strong> {endereco.district}</Text>
        <Text color="#eb722b"><strong>Rua:</strong> {endereco.street}</Text>
        <Text color="#eb722b"><strong>Número:</strong> {endereco.numberForget}</Text>
      </Stack>

      <Stack direction="row" spacing={2} mt={3}>
        <Tooltip label="Editar">
          <EditarAdressDialog
            endereco={endereco}
            onUpdate={onUpdate}
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
          />
        </Tooltip>
        <Tooltip label="Excluir">
          <Button
            variant="outline"
            borderColor="#eb722b"
            color="#eb722b"
            size="sm"
            _hover={{ bg: "#eb722b", color: "white" }}
            onClick={onDelete}
          >
            Excluir
          </Button>
        </Tooltip>
      </Stack>

    </Box>
  );
}
