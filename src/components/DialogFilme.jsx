import { CloseButton, Dialog, Portal, Input, Button, Stack, Box, Text, FileUpload } from "@chakra-ui/react";
import { HiUpload } from "react-icons/hi"
import { MdAdd } from 'react-icons/md';

export default function DialogFilme({informacoes, setInformacoes, submit, editingIndex, isOpen, setIsOpen, loadingSave }) {
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
                  <Text fontWeight="medium" mb={1}>Nome do Filme</Text>
                  <Input
                    placeholder="Nome do filme"
                    value={informacoes.nome}
                    onChange={(e) => setInformacoes({...informacoes, nome: e.target.value})}
                  />
                </Box>
                <Box>
                  <Text fontWeight="medium" mb={1}>Descrição</Text>
                  <Input
                    placeholder="Descrição do filme"
                    value={informacoes.descricao}
                    onChange={(e) => setInformacoes({...informacoes, descricao: e.target.value})}
                  />
                </Box>
                <Box>
                  <Text fontWeight="medium" mb={1}>Autor</Text>
                  <Input
                    placeholder="Autor do filme"
                    value={informacoes.autor}
                    onChange={(e) => setInformacoes({...informacoes, autor: e.target.value})}
                  />
                </Box>
                <Box>
                  <Text fontWeight="medium" mb={1}>Duração (minutos)</Text>
                  <Input
                    placeholder="Duração"
                    value={informacoes.duracao}
                    onChange={(e) => setInformacoes({...informacoes, duracao: e.target.value})}
                  />
                </Box>
                <Box>
                  <Text fontWeight="medium" mb={1}>Cartaz</Text>
                    <FileUpload.Root>
                      <FileUpload.HiddenInput
                        onChange={(e) => setInformacoes({ ...informacoes, cartaz: e.target.files[0] })}
                      />
                      <FileUpload.Trigger asChild>
                        <Button variant="outline" size="sm">
                          <HiUpload /> Upload file
                        </Button>
                      </FileUpload.Trigger>
                      <FileUpload.List />
                    </FileUpload.Root>
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
                {editingIndex !== null ? "Salvar edição" : "Criar"}
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
