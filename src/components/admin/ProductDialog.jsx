import { CloseButton, Dialog, Portal, Input, Button, Stack, Box, Text, FileUpload, Image } from "@chakra-ui/react";
import { HiUpload } from "react-icons/hi"
import { MdAdd } from 'react-icons/md';

export default function ProductDialog({informacoes, setInformacoes, submit, editingIndex, isOpen, setIsOpen, loadingSave, categories }) {
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
                  <Text fontWeight="medium" mb={1}>Nome</Text>
                  <Input
                    placeholder="ex: sopa"
                    value={informacoes.name}
                    onChange={(e) => setInformacoes({...informacoes, name: e.target.value})}
                  />
                </Box>
                <Box>
                  <Text fontWeight="medium" mb={1}>Descrição</Text>
                  <Input
                    placeholder="ex:sopa cremosa de batata..."
                    value={informacoes.description}
                    onChange={(e) => setInformacoes({...informacoes, description: e.target.value})}
                  />
                </Box>
                <Box>
                    <Text fontWeight="medium" mb={1}>Categoria</Text>
                    <Input
                        placeholder="ID da categoria"
                        value={informacoes.idCategories}
                        onChange={e => setInformacoes({ ...informacoes, idCategories: e.target.value })}
                        type="number"
                    />
                </Box>
                <Box>
                  <Text fontWeight="medium" mb={1}>Preço</Text>
                  <Input
                    placeholder="ex: 46.90"
                    value={informacoes.price}
                    onChange={(e) => setInformacoes({...informacoes, price: e.target.value})}
                  />
                </Box>
                <Box>
                  <Text fontWeight="medium" mb={1}>Imagem Ilustrativa</Text>
                    <FileUpload.Root>
                    <FileUpload.HiddenInput
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setInformacoes({ ...informacoes, imageProduct: file });
                        }
                      }}                      
                    />

                      <FileUpload.Trigger asChild>
                        <Button variant="outline" size="sm">
                          <HiUpload /> Upload 
                        </Button>
                      </FileUpload.Trigger>
                      <FileUpload.List />
                    </FileUpload.Root>
                    {editingIndex !== null && informacoes.image && (
                      <Image
                        src={`http://localhost:3333/${informacoes.image}`}
                        alt="Ilustração produto"
                        mt={2}
                        maxH="150px"
                        borderRadius="md"
                      />
                    )}
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
                  editingIndex !== null ? submit.salvarEdicao() : submit.createProduct();
                  console.log("Arquivos selecionados:", informacoes.imageProduct);
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