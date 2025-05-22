import {
  Button,
  CloseButton,
  Dialog,
  Portal,
  Box,
  Text,
  List,
  ListItem,
  HStack,
} from "@chakra-ui/react";
import { IoCartOutline } from "react-icons/io5";

export default function CartDialog({ cart, onClearCart, onFinishOrder }) {
  const total = (cart || []).reduce((sum, item) => sum + (item.price || 0), 0);

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button
            bg="white"
            border="2px solid #eb722b"
            _hover={{ bg: "gray.100" }}
            _active={{ bg: "gray.200" }}
            borderRadius="full"
            w="50px"
            h="50px"
            p={0}
            >
            <IoCartOutline size={24} color="#eb722b" />
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content bg="white" borderRadius="lg" border="2px solid #eb722b">
            <Dialog.Body>
              {cart && cart.length > 0 ? (
                <>
                  <List spacing={3}>
                    {cart.map((item, idx) => (
                      <ListItem key={idx}>
                        <HStack justify="space-between">
                          <Text fontWeight="bold">{item.name}</Text>
                          <Text fontSize="sm" color="gray.600">
                            {item.price?.toLocaleString("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            })}
                          </Text>
                        </HStack>
                      </ListItem>
                    ))}
                  </List>
                  <Box mt={4} textAlign="right">
                    <Text fontWeight="bold">
                      Total:{" "}
                      {total.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </Text>
                  </Box>
                </>
              ) : (
                <Text color="gray.500">Seu carrinho está vazio.</Text>
              )}
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button
                  variant="outline"
                  borderColor="#eb722b"
                  color="#eb722b"
                  _hover={{ bg: "#eb722b", color: "white" }}
                  onClick={onClearCart}
                  isDisabled={!cart || cart.length === 0}
                >
                  Limpar Carrinho
                </Button>
              </Dialog.ActionTrigger>
              <Button
                bg="#eb722b"
                color="white"
                _hover={{ bg: "#cf5f1f" }}
                onClick={onFinishOrder}
                isDisabled={!cart || cart.length === 0}
              >
                Finalizar Pedido
              </Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" color="#eb722b" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
