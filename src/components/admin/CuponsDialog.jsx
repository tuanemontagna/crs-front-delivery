import { CloseButton, Dialog, Portal, Input, Button, Stack, Box, Text } from "@chakra-ui/react"
import { MdAdd } from 'react-icons/md'

export default function CuponsDialog({ informacoes, setInformacoes, submit, editingIndex, isOpen, setIsOpen, loadingSave }) {
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
                {editingIndex !== null ? "Editando Cupom" : "Cadastrando Cupom"}
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
                    <Text fontWeight="medium" mb={1}>Código</Text>
                    <Input
                        placeholder="Código do cupom"
                        value={informacoes.code}
                        onChange={(e) => setInformacoes((prev) => ({ ...prev, code: e.target.value }))}
                    />
                    <Text fontWeight="medium" mb={1}>Tipo</Text>
                    <Input
                        placeholder="Tipo (ex: porcentagem, valor fixo)"
                        value={informacoes.type}
                        onChange={(e) => setInformacoes((prev) => ({ ...prev, type: e.target.value }))}
                    />
                    <Text fontWeight="medium" mb={1}>Valor</Text>
                    <Input
                        placeholder="Valor do desconto"
                        value={informacoes.value}
                        onChange={(e) => setInformacoes((prev) => ({ ...prev, value: e.target.value }))}
                    />
                    <Text fontWeight="medium" mb={1}>Usos Disponíveis</Text>
                    <Input
                        placeholder="Quantidade de usos"
                        value={informacoes.uses}
                        onChange={(e) => setInformacoes((prev) => ({ ...prev, uses: e.target.value }))}
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
                  editingIndex !== null ? submit.salvarEdicao() : submit.createCupom();
                }}
              >
                {editingIndex !== null ? "Salvar edição" : "Criar"}
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}