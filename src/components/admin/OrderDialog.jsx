import { CloseButton, Dialog, Portal, Input, Button, Stack, Box, Text } from "@chakra-ui/react"
import { MdAdd } from 'react-icons/md'

export default function OrderDialog({
  informacoes,
  setInformacoes,
  submit,
  editingIndex,
  isOpen,
  setIsOpen,
  loadingSave,
}) {
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
                {editingIndex !== null ? "Editando Pedido" : "Cadastrando Pedido"}
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
                  <Text fontWeight="medium" mb={1}>ID Cliente</Text>
                  <Input
                    placeholder="ID do cliente"
                    type="number"
                    value={informacoes.idUserCustomer || ""}
                    onChange={e => setInformacoes(prev => ({ ...prev, idUserCustomer: Number(e.target.value) }))}
                  />
                </Box>
                <Box>
                  <Text fontWeight="medium" mb={1}>Status</Text>
                  <Input
                    placeholder="ex: em preparo"
                    value={informacoes.status}
                    onChange={e => setInformacoes(prev => ({ ...prev, status: e.target.value }))}
                  />
                </Box>
                <Box>
                  <Text fontWeight="medium" mb={1}>ID Endereço</Text>
                  <Input
                    placeholder="ID do endereço"
                    type="number"
                    value={informacoes.idAdress || ""}
                    onChange={e => setInformacoes(prev => ({ ...prev, idAdress: Number(e.target.value) }))}
                  />
                </Box>
                <Box>
                  <Text fontWeight="medium" mb={1}>ID Cupom</Text>
                  <Input
                    placeholder="ID do cupom"
                    type="number"
                    value={informacoes.idCupom || ""}
                    onChange={e => setInformacoes(prev => ({ ...prev, idCupom: Number(e.target.value) }))}
                  />
                </Box>
                <Box>
                  <Text fontWeight="medium" mb={1}>ID Pagamento</Text>
                  <Input
                    placeholder="ID do pagamento"
                    type="number"
                    value={informacoes.idPayment || ""}
                    onChange={e => setInformacoes(prev => ({ ...prev, idPayment: Number(e.target.value) }))}
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
                  editingIndex !== null ? submit.salvarEdicao() : submit.createOrder();
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