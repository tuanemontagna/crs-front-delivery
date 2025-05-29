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
  VStack,
  // Divider, // Removido
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
          aria-label="Abrir carrinho"
        >
          <IoCartOutline size={24} color="#eb722b" />
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop bg="blackAlpha.600" />
        <Dialog.Positioner>
          <Dialog.Content
            bg="white"
            borderRadius="lg"
            boxShadow="xl"
            borderWidth="1px"
            borderColor="gray.200"
            maxWidth="400px"
            width="90vw"
          >
            <Dialog.Header px={6} py={4} borderBottomWidth="1px" borderColor="gray.100">
              <HStack justifyContent="space-between" alignItems="center">
                <Text fontWeight="bold" fontSize="xl" color="gray.700">
                  Seu Carrinho
                </Text>
                <Dialog.CloseTrigger asChild>
                  <CloseButton size="md" color="gray.500" _hover={{ color: "gray.700", bg: "gray.100" }} />
                </Dialog.CloseTrigger>
              </HStack>
            </Dialog.Header>

            <Dialog.Body px={6} py={4}>
              {cart && cart.length > 0 ? (
                <VStack spacing={0} align="stretch"> {/* Alterado spacing para 0, o espaçamento será dado pelo padding e borda */}
                  <List.Root>
                    {cart.map((item, index) => (
                      <ListItem 
                        key={item.idProduct} 
                        py={3} // Aumentado padding vertical
                        borderBottomWidth={index < cart.length - 1 ? "1px" : "0px"} // Borda inferior para todos menos o último
                        borderColor="gray.100"
                      >
                        <HStack justifyContent="space-between">
                          <Box>
                            <Text color="gray.700" fontWeight="medium">
                              {item.name || `Produto #${item.idProduct}`}
                            </Text>
                            <Text color="gray.500" fontSize="sm">
                              Quantidade: {item.quantity}
                            </Text>
                          </Box>
                          <Text color="#eb722b" fontWeight="semibold">
                            {(item.priceProducts * item.quantity).toLocaleString("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            })}
                          </Text>
                        </HStack>
                      </ListItem>
                    ))}
                  </List.Root>
                  <HStack 
                    justifyContent="space-between" 
                    mt={4} // Margem superior para separar da lista
                    pt={4} // Padding superior
                    borderTopWidth="1px" // Borda superior para separar do total
                    borderColor="gray.200"
                  >
                    <Text fontWeight="bold" fontSize="lg" color="gray.700">
                      Total:
                    </Text>
                    <Text fontWeight="bold" fontSize="xl" color="#eb722b">
                      {total.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </Text>
                  </HStack>
                </VStack>
              ) : (
                <Text color="gray.500" textAlign="center" py={8}>
                  Seu carrinho está vazio.
                </Text>
              )}
            </Dialog.Body>

            {cart && cart.length > 0 && (
              <Dialog.Footer
                px={6}
                py={4}
                borderTopWidth="1px"
                borderColor="gray.100"
                display="flex"
                justifyContent="space-between"
              >
                <Button
                  variant="outline"
                  borderColor="gray.300"
                  color="gray.600"
                  _hover={{ bg: "gray.100", borderColor: "gray.400" }}
                  onClick={onClearCart}
                  isDisabled={!cart || cart.length === 0}
                >
                  Limpar
                </Button>
                <Button
                  bg="#eb722b"
                  color="white"
                  _hover={{ bg: "#cf5f1f" }}
                  onClick={onFinishOrder}
                  isDisabled={!cart || cart.length === 0}
                  px={6}
                >
                  Finalizar Pedido
                </Button>
              </Dialog.Footer>
            )}
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}