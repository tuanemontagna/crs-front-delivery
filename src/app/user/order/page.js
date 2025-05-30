'use client'
import { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  Button,
  Input,
  VStack,
  HStack,
} from "@chakra-ui/react";
import api from "@/utils/axios.js";
import { toaster } from "@/components/ui/toaster"
import SelectPayment from "@/components/order/SelectPayment.jsx";
import SelectAdress from "@/components/order/SelectAdress.jsx";
import { useRouter } from 'next/navigation';

export default function Order() {
  const [user, setUser] = useState(null);
  const [cupons, setCupons] = useState([]);
  const [cupom, setCupom] = useState(""); 
  const [enderecos, setEnderecos] = useState([]);
  const [enderecoSelecionado, setEnderecoSelecionado] = useState("");
  const [pagamentos, setPagamentos] = useState([]);
  const [pagamentoSelecionado, setPagamentoSelecionado] = useState("");
  const [total, setTotal] = useState(0);
  const [totalComDesconto, setTotalComDesconto] = useState(0);  

  const router = useRouter();

    const buscarUser = async () => {
        try {
            const idUser = await InfoToken();
            console.log("ID do usuário retornado por InfoToken:", idUser);
            const response = await api.get(`/user/${idUser}`);
            setUser(response.data.data);
            
        } catch (error) {
            console.log(error);
            toaster.create({
            title: 'Erro ao buscar usuário',
            type: 'error'
            });
        }
    };

    const buscarAdress = async () => {
      try {
          const idUser = await InfoToken();
          console.log("ID do usuário retornado por InfoToken:", idUser);
          const response = await api.get(`/adress`);
          const enderecosUsuario = response.data.data.filter(end => end.idUser === idUser);
          setEnderecos(enderecosUsuario);
      } catch (error) {
          console.log(error);
          toaster.create({
              title: 'Erro ao buscar endereços',
              type: 'error'
          });
      }
    };

    const buscarPayments = async () => {
        try {
            const response = await api.get(`/payment`);
            setPagamentos(response.data.data);
            
        } catch (error) {
            console.log(error);
            toaster.create({
            title: 'Erro ao buscar pagamentos',
            type: 'error'
            });
        }
    };

    const buscarCupons = async () => {
        try {
          const response = await api.get(`/cupom`);
          setCupons(response.data.data);
        } catch (error) {
            console.log(error);
            toaster.create({
            title: 'Erro ao buscar cupons',
            type: 'error'
            });
        }
    };

  useEffect(() => {
    buscarUser();
    buscarAdress();
    buscarPayments();
    buscarCupons();
  }, []);

  useEffect(() => {
    const initializePage = async () => {
        const isValidToken = await InfoToken();
        if (!isValidToken) {
            toaster.create({ description: 'Session expired. Please login again.', type: 'error' });
            router.push('/login');
            setIsLoadingPage(false);
            return;
        } else {
            console.error("Error getting user ID:", error);
            setPageError("Error identifying user.");
            toaster.create({ description: 'Error identifying user.', type: 'error' });
            setIsLoadingPage(false);
        }
    };
    initializePage();
  }, [router]);

  useEffect(() => {
    if (user?.cart) {
        const totalAtual = user.cart.reduce((sum, item) => sum + item.priceProducts * item.quantity, 0);
        setTotal(totalAtual);
        setTotalComDesconto(0);
    }
  }, [user]);

  const aplicarCupom = async () => {
    try {
      const cupomObj = cupons.find(c => c.code === cupom);
      const idCupom = cupomObj ? cupomObj.id : null;

      const response = await api.post('/order/calcular-total', {
        idUserCustomer: user.id,
        idCupom: idCupom, 
      });
      setTotal(response.data.total);
      setTotalComDesconto(response.data.totalDiscount);
      toaster.create({
        title: 'Cupom aplicado com sucesso!',
        type: 'success'
      });
    } catch (error) {
      toaster.create({
        title: error.response?.data?.message || 'Erro ao aplicar cupom',
        type: 'error'
      });
      setTotal(user.cart.reduce((sum, item) => sum + item.priceProducts * item.quantity, 0));
      setTotalComDesconto(0);
    }
  };

  const confirmarPedido = async () => {
    if (!enderecoSelecionado || !pagamentoSelecionado) {
      toaster.create({
        title: "Selecione endereço e forma de pagamento.",
        type: "error"
      });
      return;
    }

    const parsedAddressId = parseInt(enderecoSelecionado, 10);
    const parsedPaymentId = parseInt(pagamentoSelecionado, 10);

    if (isNaN(parsedAddressId) || isNaN(parsedPaymentId)) {
      toaster.create({
        title: "ID de endereço ou pagamento inválido.",
        type: "error"
      });
      return;
    }

    const cupomObj = cupons.find(c => c.code === cupom);
    const idCupomToSend = cupomObj ? cupomObj.id : null;

    try {
      await api.post('/order', {
        idUserCustomer: user.id,
        idAdress: parsedAddressId,
        idPayment: parsedPaymentId,
        idCupom: idCupomToSend, 
        cart: user.cart.map(item => ({ 
            idProduct: item.idProduct,
            quantity: item.quantity
        }))
      });
      toaster.create({
        title: "Pedido realizado com sucesso!",
        type: "success"
      });
      setUser(prev => ({ ...prev, cart: [] }));
      await api.delete(`/user/${user.id}/limpar-carrinho`);
      router.push('/user/cardapio');
      
    } catch (error) {
      toaster.create({
        title: error.response?.data?.message || "Erro ao confirmar pedido.",
        type: "error"
      });
    }
  };

  return (
    <VStack
      spacing={6}
      align="stretch"
      py={8}
      px={{ base: 4, md: 8 }}
      w="100%" 
      bg="gray.100" 
    >
      <VStack 
        spacing={6}
        align="stretch"
        w="100%"
        maxW={{ base: "100%", md: "70%", lg: "60%" }} 
        mx="auto"
      >
        <Heading
          as="h1"
          size="xl"
          mb={6}
          color="#eb722b"
          textAlign="center"
          fontWeight="bold"
        >
          Finalizar Seu Pedido
        </Heading>

        {/* Seção: Itens do Pedido */}
        <VStack
          spacing={4}
          align="stretch"
          p={6}
          bg="white"
          borderRadius="md"
          boxShadow="sm"
        >
          <Heading as="h2" size="lg" color="#eb722b" borderBottomWidth="2px" borderColor="gray.100" pb={2} mb={2}>
            Itens no Carrinho
          </Heading>
          {user?.cart?.length > 0 ? (
            user.cart.map((item) => (
              <HStack
                key={item.idProduct}
                p={3}
                borderWidth="1px"
                borderColor="gray.100"
                borderRadius="md"
                justifyContent="space-between"
                _hover={{ bg: "gray.50" }}
              >
                <Box>
                  <Text color="gray.700" fontWeight="medium">
                    {item.name} <Text as="span" color="gray.500" fontSize="sm">x {item.quantity}</Text>
                  </Text>
                </Box>
                <Text color="#eb722b" fontWeight="semibold" fontSize="md">
                  {(item.priceProducts * item.quantity).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </Text>
              </HStack>
            ))
          ) : (
            <Text color="gray.500" textAlign="center" py={4}>
              Seu carrinho está vazio.
            </Text>
          )}
        </VStack>

        {/* Seção: Resumo Financeiro */}
        <VStack
          spacing={4}
          align="stretch"
          p={6}
          bg="white"
          borderRadius="md"
          boxShadow="sm"
        >
          <Heading as="h2" size="lg" color="#eb722b" borderBottomWidth="2px" borderColor="gray.100" pb={2} mb={2}>
            Cupom
          </Heading>
          <HStack>
            <Input
              placeholder="Código do cupom"
              value={cupom}
              onChange={(e) => setCupom(e.target.value)}
              borderColor="gray.300"
              color="gray.700"
              _hover={{ borderColor: "gray.400" }}
              focusBorderColor="#eb722b"
              size="md"
            />
            <Button
              bg="#eb722b"
              color="white"
              _hover={{ bg: "#cf5f1f" }}
              onClick={aplicarCupom}
              px={8}
              size="md"
            >
              Aplicar
            </Button>
          </HStack>
          <VStack
            align="stretch"
            spacing={2}
            p={4}
            borderWidth="1px"
            borderColor="gray.100"
            borderRadius="md"
            bg="gray.50"
          >
            <HStack justifyContent="space-between">
              <Text fontWeight="medium" color="gray.600">Subtotal:</Text>
              <Text fontWeight="semibold" color="gray.700" fontSize="md">
                {total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
              </Text>
            </HStack>
            {totalComDesconto > 0 && totalComDesconto < total && (
              <HStack justifyContent="space-between">
                <Text fontWeight="medium" color="green.600">Desconto (Cupom):</Text>
                <Text fontWeight="semibold" color="green.600" fontSize="md">
                  - {(total - totalComDesconto).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                </Text>
              </HStack>
            )}
            <HStack justifyContent="space-between" pt={2} borderTopWidth="1px" borderColor="gray.200" mt={2}>
              <Text fontWeight="bold" fontSize="lg" color="#eb722b">Total a Pagar:</Text>
              <Text fontWeight="bold" fontSize="xl" color="#eb722b">
                {(totalComDesconto > 0 && totalComDesconto < total ? totalComDesconto : total).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
              </Text>
            </HStack>
          </VStack>
        </VStack>

        {/* Seção: Entrega e Pagamento */}
        <VStack
          spacing={5}
          align="stretch"
          p={6}
          bg="white"
          borderRadius="md"
          boxShadow="sm"
        >
          <Heading as="h2" size="lg" color="#eb722b" borderBottomWidth="2px" borderColor="gray.100" pb={2} mb={2}>
            Detalhes da Entrega e Pagamento
          </Heading>
          {/* Endereço */}
          {enderecos.length === 0 ? (
            <VStack align="flex-start" p={4} borderWidth="1px" borderColor="orange.200" borderRadius="md" bg="orange.50">
              <Text color="#cf5f1f" fontWeight="medium" mb={1}>Nenhum endereço cadastrado.</Text>
              <Text color="gray.600" fontSize="sm" mb={2}>Por favor, cadastre um endereço para continuar.</Text>
              <Button
                colorScheme="orange"
                variant="outline"
                borderColor="#eb722b"
                color="#eb722b"
                _hover={{ bg: "orange.50" }}
                onClick={() => router.push('/user/adress')}
                size="sm"
              >
                Cadastrar Endereço
              </Button>
            </VStack>
          ) : (
            <SelectAdress
              label="Endereço de Entrega"
              placeholder="Selecione o endereço"
              items={enderecos.map((end) => ({
                label: `${end.street}, ${end.numberForget} - ${end.district}, ${end.city} - ${end.state}`,
                value: end.id.toString(),
              }))}
              value={enderecoSelecionado}
              onChange={setEnderecoSelecionado}
            />
          )}

          {/* Pagamento */}
          <SelectPayment
            label="Forma de Pagamento"
            placeholder="Selecione a forma de pagamento"
            items={pagamentos.map((pag) => ({
              label: pag.name,
              value: pag.id.toString(),
            }))}
            value={pagamentoSelecionado}
            onChange={setPagamentoSelecionado}
          />
        </VStack>

        <Button
          color="white"
          bg="#eb722b"
          _hover={{ bg: "#cf5f1f" }}
          size="lg"
          w="full"
          mt={4}
          py={6}
          fontSize="lg"
          onClick={confirmarPedido}
          boxShadow="md"
          isDisabled={!enderecoSelecionado || !pagamentoSelecionado || user?.cart?.length === 0}
        >
          Confirmar Pedido
        </Button>
      </VStack>
    </VStack>
  );
}