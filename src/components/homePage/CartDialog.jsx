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
  const total = (cart || []).reduce(
    (sum, item) => sum + (item.priceProducts * item.quantity || 0),
    0
  );

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
            <Box px={4} pt={4} pb={2}>
            <Text fontWeight="bold" fontSize="xl" color="#eb722b">
              Carrinho
            </Text>
          </Box>
            <Dialog.Body>
              {cart && cart.length > 0 ? (
                <>
                  <List.Root spacing={3}>
                    {cart.map((item, index) => (
                      <Box key={item.idProduct}>
                        <List.Item>
                          <Text color="#eb722b" fontWeight="semibold">
                            Produto: #{item.idProduct}
                          </Text>
                          <Text color="#eb722b">Quantidade: {item.quantity}</Text>
                          <Text color="#eb722b">
                            Valor:{" "}
                            {(item.priceProducts * item.quantity).toLocaleString("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            })}
                          </Text>
                        </List.Item>
                        {index !== cart.length - 1 && (
                          <Box
                            borderBottom="1px solid #eb722b"
                            my={2}
                            w="100%"
                          />
                        )}
                      </Box>
                    ))}
                  </List.Root>
                  <Box mt={4} textAlign="right">
                    <Text fontWeight="bold" fontSize="lg" color="#eb722b">
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