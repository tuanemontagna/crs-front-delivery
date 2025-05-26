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
                {editingIndex !== null ? "Editando Adress" : "Cadastrando Adress"}
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
                    <Text fontWeight="medium" mb={1}>CEP</Text>
                    <Input
                        placeholder="0000-000"
                        value={informacoes.zipCode}
                        onChange={(e) => setInformacoes((prev) => ({ ...prev, zipCode: e.target.value }))}
                    />
                    <Text fontWeight="medium" mb={1}>Estado</Text>
                    <Input
                        placeholder="Tipo (ex: porcentagem, valor fixo)"
                        value={informacoes.state}
                        onChange={(e) => setInformacoes((prev) => ({ ...prev, state: e.target.value }))}
                    />
                    <Text fontWeight="medium" mb={1}>Cidade</Text>
                    <Input
                        placeholder="ex: chapeco"
                        value={informacoes.city}
                        onChange={(e) => setInformacoes((prev) => ({ ...prev, city: e.target.value }))}
                    />
                    <Text fontWeight="medium" mb={1}>Rua</Text>
                    <Input
                        placeholder="ex: av. general osorio"
                        value={informacoes.street}
                        onChange={(e) => setInformacoes((prev) => ({ ...prev, street: e.target.value }))}
                    />
                    <Text fontWeight="medium" mb={1}>Número</Text>
                    <Input
                        placeholder="ex: 112e"
                        value={informacoes.numberForget}
                        onChange={(e) => setInformacoes((prev) => ({ ...prev, numberForget: e.target.value }))}
                    />
                    <Text fontWeight="medium" mb={1}>Bairro</Text>
                    <Input
                        placeholder="ex:centro"
                        value={informacoes.district}
                        onChange={(e) => setInformacoes((prev) => ({ ...prev, district: e.target.value }))}
                    />
                    <Text fontWeight="medium" mb={1}>ID Usuário</Text>
                    <Input
                        placeholder="ex: 1"
                        value={informacoes.idUser}
                        onChange={(e) => setInformacoes((prev) => ({ ...prev, idUser: e.target.value }))}
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
                  editingIndex !== null ? submit.salvarEdicao() : submit.createAdress();
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