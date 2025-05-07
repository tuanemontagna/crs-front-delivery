import { CloseButton, Dialog, Portal, Input, Button, Stack, Box, Text, Checkbox } from "@chakra-ui/react";
import { MdAdd } from 'react-icons/md';

export default function DialogUsuario({
  informacoes, setInformacoes, submit, editingIndex, isOpen, setIsOpen, loadingSave
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
                  <Text fontWeight="medium" mb={1}>ID do Cargo</Text>
                  <Input
                    placeholder="ID do Cargo"
                    value={informacoes.idCargo}
                    onChange={(e) => setInformacoes({ ...informacoes, idCargo: e.target.value })}
                  />
                </Box>
                <Box>
                  <Text fontWeight="medium" mb={1}>Nome</Text>
                  <Input
                    placeholder="Nome do usuário"
                    value={informacoes.nome}
                    onChange={(e) => setInformacoes({ ...informacoes, nome: e.target.value })}
                  />
                </Box>
                <Box>
                  <Text fontWeight="medium" mb={1}>CPF</Text>
                  <Input
                    placeholder="CPF"
                    value={informacoes.cpf}
                    onChange={(e) => setInformacoes({ ...informacoes, cpf: e.target.value })}
                  />
                </Box>
                <Box>
                  <Text fontWeight="medium" mb={1}>Email</Text>
                  <Input
                    placeholder="Email"
                    value={informacoes.email}
                    onChange={(e) => setInformacoes({ ...informacoes, email: e.target.value })}
                  />
                </Box>
                <Box>
                <Text fontWeight="medium" mb={1}>É estudante?</Text>
                  <Input
                    placeholder="Estudante"
                    value={informacoes.estudante}
                    onChange={(e) => setInformacoes({ ...informacoes, estudante: e.target.value })}
                />
                </Box>
                <Box>
                  <Text fontWeight="medium" mb={1}>Senha</Text>
                  <Input
                    placeholder="Senha"
                    value={informacoes.password}
                    onChange={(e) => setInformacoes({ ...informacoes, password: e.target.value })}
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
                {editingIndex !== null ? "Salvar edição" : "Criar Usuário"}
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
