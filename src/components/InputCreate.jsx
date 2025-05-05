import { CloseButton, Dialog, Portal, Input, Button } from "@chakra-ui/react"
import { MdAdd } from 'react-icons/md'

export default function InputCreate({ input, setInput, submit, editingIndex, isOpen, setIsOpen, loadingSave }) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
        <Button onClick={()=> setIsOpen(true)} color="white" background="green" variant="outline" size="sm">
          <MdAdd />
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>
                {editingIndex !== null ? "Editando tarefa" : "Cadastrando nova tarefa"}
              </Dialog.Title>
                <button style={{ display: 'none' }} positio />
                <CloseButton 
                  size="sm" 
                  onClick={() => setIsOpen(false)}
                  position="absolute" 
                  top="1rem" 
                  right="1rem"
                />
            </Dialog.Header>
            <Dialog.Body>
              <Input
                placeholder="Digite a tarefa"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </Dialog.Body>
            <Dialog.Footer>
            <Button
              loading={loadingSave}
              color="white"
              background="green"
              variant="outline"
              size="sm"
              onClick={() => {
                submit();
                setIsOpen(false); 
              }}
            >
              {editingIndex !== null ? "Salvar edição" : "Criar nova tarefa"}
            </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}