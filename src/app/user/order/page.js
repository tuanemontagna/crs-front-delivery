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
            //const idUser = await InfoToken();
            const idUser = 2;
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
          //const idUser = await InfoToken();
          const idUser = 2;
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
  <Box
    maxW="600px"
    mx="auto"
    mt={8}
    p={4}
    bg="white"
    borderRadius="md"
    boxShadow="md"
    border="2px solid #eb722b"
  >
    <Heading size="lg" mb={4} color="#eb722b">
      Finalizar Pedido
    </Heading>

    {/* Itens do pedido */}
    <Text fontWeight="bold" mb={2} color="#eb722b">
      Itens do Pedido:
    </Text>
    <VStack align="stretch" spacing={2} mb={4}>
      {user?.cart?.length > 0 ? user.cart.map(item => (
        <Box
          key={item.idProduct}
          p={2}
          borderWidth="2px"
          borderColor="#eb722b"
          borderRadius="md"
        >
          <Text color="#eb722b">{item.name} x {item.quantity}</Text>
          <Text color="#eb722b" fontSize="sm">
            {(item.priceProducts * item.quantity).toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </Text>
        </Box>
      )) : <Text color="gray.500">Nenhum item no pedido.</Text>}
    </VStack>

    <Box mt={2} mb={2} textAlign="right">
    <Text fontWeight="bold" color="#eb722b">
        Total: {total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
    </Text>
    {totalComDesconto > 0 && (
        <Text fontWeight="bold" color="#eb722b">
        Total com desconto: {totalComDesconto.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
        </Text>
    )}
    </Box>

    <Box borderBottom="2px solid" borderColor="#eb722b" my={4} />

    {/* Cupom */}
    <Text fontWeight="bold" mb={1} color="#eb722b">
      Cupom:
    </Text>
    <HStack mb={4}>
      <Input
        placeholder="Digite o código do cupom"
        value={cupom}
        onChange={e => setCupom(e.target.value)}
        borderColor="#eb722b"
        color="#eb722b"
      />
      <Button
        bg="#eb722b"
        color="white"
        _hover={{ bg: "#cf5f1f" }}
        onClick={aplicarCupom}
        >
        Aplicar
      </Button>
    </HStack>
    
    {/* Endereço */}
    <Text fontWeight="bold" mb={1} color="#eb722b">
      Endereço de Entrega:
    </Text>
    {enderecos.length === 0 ? (
      <Box mb={4}>
        <Text color="#cf5f1f" mb={2}>Nenhum endereço cadastrado.</Text>
        <Button
          color="white"
          bg="#eb722b"
          _hover={{ bg: "#cf5f1f" }}
          onClick={() => {

            window.location.href = '/user/adress';
          }}
        >
          Cadastrar Endereço
        </Button>
      </Box>
    ) : (
      <SelectAdress
        label="Selecione o Endereço"
        placeholder="Escolha o endereço de entrega"
        items={enderecos.map((end) => ({
          label: `${end.street}, ${end.numberForget} - ${end.district}`,
          value: end.id.toString(),
        }))}
        value={enderecoSelecionado}
        onChange={setEnderecoSelecionado}
        borderColor="#eb722b"
        color="#eb722b"
      />
    )}

    {/* Pagamento */}
    <SelectPayment
        label="Selecione o Pagamento"
        placeholder="Escolha o método de pagamento"
        items={pagamentos.map((pag) => ({
            label: pag.name, 
            value: pag.id.toString(),
        }))}
        value={pagamentoSelecionado}
        onChange={setPagamentoSelecionado}
        borderColor="#eb722b"
        color="#eb722b"
    />

    <Button
      color="white"
      bg="#eb722b"
      _hover={{ bg: "#cf5f1f" }}
      size="lg"
      w="100%"
      mt={6}
      onClick={confirmarPedido}
    >
      Confirmar Pedido
    </Button>
  </Box>
);
}