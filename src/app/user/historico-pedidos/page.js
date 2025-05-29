'use client'
import { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Spinner,
  Card,
  CardHeader,
  CardBody,
  Badge,
  HStack,
} from '@chakra-ui/react';
import api from '@/utils/axios'; 
import { toaster } from '@/components/ui/toaster'; 

// Function to format date (optional, adjust as needed)
const formatDate = (dateString) => {
// ...existing code...
  if (!dateString) return 'Data não disponível';
  try {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch (error) {
    return dateString; // Return original if formatting fails
  }
};

export default function HistoricoPedidosPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null); 

  useEffect(() => {
// ...existing code...
    const currentUserId = 2; 
    setUserId(currentUserId);

    if (currentUserId) {
      fetchOrders(currentUserId);
    } else {
      setLoading(false);
      toaster.create({
        title: 'Usuário não identificado',
        description: 'Não foi possível buscar o histórico de pedidos.',
        type: 'error',
      });
    }
  }, []);

const fetchOrders = async (idUserCustomer) => {
  setLoading(true);
  try {
    const response = await api.get(`/order/historico-pedidos/${idUserCustomer}`);
    const data = Array.isArray(response.data.data) ? response.data.data : [];

    const groupedOrders = data.reduce((acc, item) => {
      const orderId = item.order_id;
      if (!acc[orderId]) {
        acc[orderId] = {
          id: orderId,
          status: item.status,
          total: item.total,
          createdAt: item.order_created_at,
          orderProducts: [],
        };
      }
      acc[orderId].orderProducts.push({
        id: item.order_product_id,
        product: {
          id: item.product_id,
          name: item.product_name,
          description: item.product_description,
          image: item.product_image,
          price: parseFloat(item.product_price),
        },
        quantity: item.quantity,
        price: parseFloat(item.price_products),
      });
      return acc;
    }, {});

    const ordersArray = Object.values(groupedOrders).sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        setOrders(ordersArray);
    } catch (error) {
        console.error("Erro ao buscar pedidos:", error);
        toaster.create({
        title: 'Erro ao buscar pedidos',
        description: error.response?.data?.message || 'Não foi possível carregar o histórico.',
        type: 'error',
        });
        setOrders([]);
    } finally {
        setLoading(false);
    }
    };



  if (loading) {
    return (
      <Container centerContent py={10}>
        <Spinner size="xl" color="#eb722b" />
        <Text mt={4}>Carregando seus pedidos...</Text>
      </Container>
    );
  }

  return (
    <Box bg="gray.50" minH="100vh" py={8}>
      <Container maxW="container.lg">
        <Heading as="h1" size="xl" mb={8} color="#eb722b" textAlign="center">
          Meus Pedidos
        </Heading>

        {orders.length === 0 ? (
          <Text textAlign="center" fontSize="lg" color="gray.600">
            Você ainda não fez nenhum pedido.
          </Text>
        ) : (
          <VStack spacing={6} align="stretch">
            {orders.map((order, orderIndex) => {
              const orderKey = (typeof order.id === 'string' || typeof order.id === 'number') 
                               ? String(order.id) // Explicitly cast to string
                               : `order-${orderIndex}`;
              return (
                <Card.Root key={orderKey} borderWidth="1px" borderColor="gray.200" borderRadius="md" shadow="sm" bg="gray.100">
                    <Card.Header pb={2} bg="gray.100" borderBottomWidth="1px" borderColor="gray.200">
                        <HStack justifyContent="space-between" alignItems="center">
                        <Heading size="md" color="#eb722b">
                            Pedido #{order.id}
                        </Heading>
                        <Badge
                            colorScheme={
                            order.status === 'Entregue' ? 'green' :
                            order.status === 'Cancelado' ? 'red' :
                            order.status === 'Em preparo' ? 'yellow' :
                            order.status === 'A caminho' ? 'blue' :
                            'gray'
                            }
                            variant="solid"
                            fontSize="sm"
                        >
                            {order.status || 'Status Desconhecido'}
                        </Badge>
                        </HStack>
                        <Text fontSize="sm" color="gray.600" mt={1}>
                        Realizado em: {formatDate(order.createdAt)}
                        </Text>
                    </Card.Header>

                    <Card.Body>
                        <VStack align="stretch" spacing={3}>
                        {order.orderProducts && order.orderProducts.length > 0 && (
                            <Box>
                            <Text color="gray.600" fontWeight="semibold" mb={1}>Itens do Pedido:</Text>
                            <VStack align="stretch" spacing={1} pl={2} borderLeft="2px solid" borderColor="gray.200">
                                {order.orderProducts.map((item, itemIndex) => {
                                const itemKey = (typeof item.id === 'string' || typeof item.id === 'number')
                                    ? String(item.id)
                                    : `item-${orderKey}-${itemIndex}`;
                                return (
                                    <HStack key={itemKey} justifyContent="space-between">
                                    <Text color="gray.600">{item.product?.name || 'Produto desconhecido'} (x{item.quantity})</Text>
                                    <Text color="gray.600">R$ {(parseFloat(item.price) * item.quantity).toFixed(2)}</Text>
                                    </HStack>
                                );
                                })}
                            </VStack>
                            </Box>
                        )}

                        {order.address && (
                            <Box>
                            <Text fontWeight="semibold">Endereço de Entrega:</Text>
                            <Text>{order.address.street}, {order.address.number} - {order.address.neighborhood}, {order.address.city} - {order.address.state}</Text>
                            {order.address.complement && <Text>Complemento: {order.address.complement}</Text>}
                            <Text>CEP: {order.address.zipCode}</Text>
                            </Box>
                        )}

                        {order.payment && (
                            <Box>
                            <Text fontWeight="semibold">Pagamento:</Text>
                            <Text>{order.payment.type}</Text>
                            </Box>
                        )}

                        <Box my={4} />
                        <HStack justifyContent="space-between">
                            <Text fontWeight="bold" fontSize="lg" color="#eb722b">Total do Pedido:</Text>
                            <Text fontWeight="bold" fontSize="lg" color="#eb722b">
                            R$ {parseFloat(order.total).toFixed(2)}
                            </Text>
                        </HStack>
                        {order.cupom && (
                            <Text fontSize="sm" color="green.600">
                            Cupom aplicado: {order.cupom.code} (-R$ {parseFloat(order.cupom.discountValue).toFixed(2)})
                            </Text>
                        )}
                        </VStack>
                    </Card.Body>

                    <Card.Footer />
                    </Card.Root>
              );
            })}
          </VStack>
        )}
      </Container>
    </Box>
  );
}