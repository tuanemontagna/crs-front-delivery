import { CloseButton, Dialog, Portal, Input, Button, Stack, Box, Text, Select } from "@chakra-ui/react";
import { MdAdd } from 'react-icons/md';

export default function DialogPadraoLugares({ informacoes, setInformacoes, submit, editingIndex, isOpen, setIsOpen, loadingSave }) {

  const adicionarLugar = () => {
    const novoLugar = {
      lugar: informacoes.lugar,
      ocupado: informacoes.ocupado === 'Sim',  
      linha: informacoes.linha,
      coluna: informacoes.coluna
    };

    setInformacoes(prev => ({
      ...prev,
      lugares: [...prev.lugares, novoLugar]  
    }));

    setInformacoes({
      ...informacoes,
      lugar: '',
      ocupado: 'Sim',  
      linha: '',
      coluna: ''
    });
  };

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
                  <Text fontWeight="medium" mb={1}>Número do Lugar</Text>
                  <Input
                    placeholder="Lugar"
                    value={informacoes.lugar}
                    onChange={(e) => setInformacoes({ ...informacoes, lugar: e.target.value })}
                  />
                </Box>
                <Box>
                  <Text fontWeight="medium" mb={1}>Linha</Text>
                  <Input
                    placeholder="Linha"
                    value={informacoes.linha}
                    onChange={(e) => setInformacoes({ ...informacoes, linha: e.target.value })}
                  />
                </Box>
                <Box>
                  <Text fontWeight="medium" mb={1}>Coluna</Text>
                  <Input
                    placeholder="Coluna"
                    value={informacoes.coluna}
                    onChange={(e) => setInformacoes({ ...informacoes, coluna: e.target.value })}
                  />
                </Box>
                <Box>
                  <Text fontWeight="medium" mb={1}>Ocupado?</Text>
                  <Select.Root value={informacoes.ocupado || 'Sim'} onValueChange={(value) => setInformacoes({ ...informacoes, ocupado: value })}>
                    <Select.HiddenSelect />
                    <Select.Label>Escolha o status de ocupação</Select.Label>
                    <Select.Control>
                      <Select.Trigger>
                        <Select.ValueText />
                      </Select.Trigger>
                      <Select.IndicatorGroup>
                        <Select.Indicator />
                        <Select.ClearTrigger />
                      </Select.IndicatorGroup>
                    </Select.Control>
                    <Select.Positioner>
                      <Select.Content>
                        <Select.Item value="Sim">Sim</Select.Item>
                        <Select.Item value="Não">Não</Select.Item>
                      </Select.Content>
                    </Select.Positioner>
                  </Select.Root>
                </Box>
                <Button
                  color="white"
                  background="blue.500"
                  variant="solid"
                  onClick={adicionarLugar}
                >
                  Adicionar Lugar
                </Button>

                <Box mt={4}>
                  <Text fontWeight="medium">Lugares adicionados:</Text>
                  <ul>
                    {informacoes.lugares.map((lugar, index) => (
                      <li key={index}>
                        {`Lugar: ${lugar.lugar}, Linha: ${lugar.linha}, Coluna: ${lugar.coluna}, Ocupado: ${lugar.ocupado ? 'Sim' : 'Não'}`}
                      </li>
                    ))}
                  </ul>
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
  )
}
