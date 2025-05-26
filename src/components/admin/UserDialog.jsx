import { CloseButton, Dialog, Portal, Input, Button, Stack, Box, Text } from "@chakra-ui/react"
import { MdAdd } from 'react-icons/md'

export default function UserDialog({
  informacoes,
  setInformacoes,
  submit,
  editingIndex,
  isOpen,
  setIsOpen,
  loadingSave
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
                {editingIndex !== null ? "Editando Usuário" : "Cadastrando Usuário"}
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
                  <Text fontWeight="medium" mb={1}>Usuário</Text>
                  <Input
                    placeholder="Nome de usuário"
                    value={informacoes.userName}
                    onChange={e => setInformacoes(prev => ({ ...prev, userName: e.target.value }))}
                  />
                </Box>
                <Box>
                  <Text fontWeight="medium" mb={1}>Nome</Text>
                  <Input
                    placeholder="Nome completo"
                    value={informacoes.name}
                    onChange={e => setInformacoes(prev => ({ ...prev, name: e.target.value }))}
                  />
                </Box>
                <Box>
                  <Text fontWeight="medium" mb={1}>CPF</Text>
                  <Input
                    placeholder="CPF"
                    value={informacoes.cpf}
                    onChange={e => setInformacoes(prev => ({ ...prev, cpf: e.target.value }))}
                  />
                </Box>
                <Box>
                  <Text fontWeight="medium" mb={1}>Telefone</Text>
                  <Input
                    placeholder="Telefone"
                    value={informacoes.phone}
                    onChange={e => setInformacoes(prev => ({ ...prev, phone: e.target.value }))}
                  />
                </Box>
                <Box>
                  <Text fontWeight="medium" mb={1}>E-mail</Text>
                  <Input
                    placeholder="E-mail"
                    value={informacoes.email}
                    onChange={e => setInformacoes(prev => ({ ...prev, email: e.target.value }))}
                  />
                </Box>
                <Box>
                  <Text fontWeight="medium" mb={1}>Senha</Text>
                  <Input
                    placeholder="Senha"
                    type="password"
                    value={informacoes.password}
                    onChange={e => setInformacoes(prev => ({ ...prev, password: e.target.value }))}
                  />
                </Box>
                <Box>
                  <Text fontWeight="medium" mb={1}>Perfil</Text>
                  <Input
                    placeholder="Perfil (ex: admin, user)"
                    value={informacoes.role}
                    onChange={e => setInformacoes(prev => ({ ...prev, role: e.target.value }))}
                  />
                </Box>
                <Box>
                  <Text fontWeight="medium" mb={1}>Carrinho (JSON)</Text>
                  <Input
                    placeholder='Ex: [{"name":"Produto","quantity":2}]'
                    value={informacoes.cart}
                    onChange={e => setInformacoes(prev => ({ ...prev, cart: e.target.value }))}
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
                  editingIndex !== null ? submit.salvarEdicao() : submit.createUser();
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