import { CloseButton, Dialog, Portal, Input, Button, Stack, Box, Text } from "@chakra-ui/react"
import { MdAdd } from 'react-icons/md'

export default function DialogSala({ idPadraoLugar, setIdPadraoLugar, observacao, setObservacao, submit, editingIndex, isOpen, setIsOpen, loadingSave }) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
        <Button onClick={() => setIsOpen(true)} color="white" background="green" variant="outline" size="sm">
          <MdAdd />
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>
                {editingIndex !== null ? "Editando " : "Cadastrando "}
              </Dialog.Title>
              <CloseButton 
                size="sm" 
                onClick={() => setIsOpen(false)} 
                position="absolute" 
                top="1rem" 
                right="1rem" 
              />
            </Dialog.Header>
            <Dialog.Body>
              <Stack spacing={4}>
                <Box>
                    <Text fontWeight="medium" mb={1}>ID Padrão de Lugares</Text>
                    <Input
                    placeholder="id padrão lugares"
                    value={idPadraoLugar}
                    onChange={(e) => setIdPadraoLugar(e.target.value)}
                    />
                </Box>
                <Box>
                    <Text fontWeight="medium" mb={1}>Observação</Text>
                    <Input
                    placeholder="tipo da sala"
                    value={observacao}
                    onChange={(e) => setObservacao(e.target.value)}
                    />
                </Box>
              </Stack>
            </Dialog.Body>
            <Dialog.Footer>
              <Button
                isLoading={loadingSave}
                color="white"
                background="green"
                variant="outline"
                size="sm"
                onClick={() => {
                  editingIndex !== null ? submit.salvarEdicao() : submit.criarTask();
                }}
              >
                {editingIndex !== null ? "Salvar edição" : "Criar "}
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}