'use client';
import InputPesquisa from "@/components/admin/InputPesquisa";
import OrderDialog from "@/components/admin/OrderDialog.jsx";
import TabelaCrud from "@/components/admin/TabelaCrud";
import PaginationTabela from "@/components/admin/PaginationTabela";
import SelecionarQuantidade from "@/components/admin/SelecionarQuantidade";
import { 
  Box,
  Heading,
  Stack,
  Flex
} from "@chakra-ui/react"
import { useState, useEffect } from "react";
import { toaster } from "@/components/ui/toaster"
import api from "@/utils/axios";

export default function Order() {
  const [orders, setOrders] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [editingIndex, setEditingIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);
  const [users, setUsers] = useState([]);
  const [adresses, setAdresses] = useState([]);
  const [cupons, setCupons] = useState([]);
  const [payments, setPayments] = useState([]);
  const [informacoes, setInformacoes] = useState({
    idUserCustomer: '',
    status: '',
    idAdress: '',
    idCupom: '',
    idPayment: '',
  });

  const buscarOrders = async () => {
    try {
      const response = await api.get('/order');
      setOrders(response.data.data);
    } catch (error) {
      toaster.create({
        title: 'Erro ao buscar pedidos',
        type: 'error'
      });
    }
  };

  const buscarUsuarios = async () => {
    try {
      const response = await api.get('/user');
      setUsers(response.data.data);
    } catch (error) {
      toaster.create({
        title: 'Erro ao buscar usuários',
        type: 'error'
      });
    }
  };

  const buscarAdresses = async () => {
    try {
      const response = await api.get('/adress');
      setAdresses(response.data.data);
    } catch (error) {
      toaster.create({
        title: 'Erro ao buscar endereços',
        type: 'error'
      });
    }
  };

  const buscarCupons = async () => {
    try {
      const response = await api.get('/cupom');
      setCupons(response.data.data);
    } catch (error) {
      toaster.create({
        title: 'Erro ao buscar cupons',
        type: 'error'
      });
    }
  };

  const buscarPayments = async () => {
    try {
      const response = await api.get('/payment');
      setPayments(response.data.data);
    } catch (error) {
      toaster.create({
        title: 'Erro ao buscar pagamentos',
        type: 'error'
      });
    }
  };

  useEffect(() => {
    buscarOrders();
    buscarUsuarios();
    buscarAdresses();
    buscarCupons();
    buscarPayments();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const ordersComNomes = orders.map(order => {
    const userCustomer = users.find(u => u.id === order.idUserCustomer);
    const adress = adresses.find(a => a.id === order.idAdress);
    const cupom = cupons.find(c => c.id === order.idCupom);
    const payment = payments.find(p => p.id === order.idPayment);

    return {
      ...order,
      nomeUserCustomer: userCustomer ? userCustomer.name : '',
      nomeAdress: adress ? `${adress.street}, ${adress.numberForget} - ${adress.district}` : '',
      nomeCupom: cupom ? cupom.code : '',
      nomePayment: payment ? payment.name : ''
    };
  });

  const filteredOrders = ordersComNomes.filter(order =>
    order.status?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexUltimoItem = currentPage * itemsPerPage;
  const indexPrimeiroItem = indexUltimoItem - itemsPerPage;
  const ordersAtuais = filteredOrders.slice(indexPrimeiroItem, indexUltimoItem);

  const createOrder = async () => {
    try {
      if (
        !informacoes.status.trim() ||
        !informacoes.idUserCustomer ||
        !informacoes.idAdress ||
        !informacoes.idPayment
      ) return;
      setLoadingSave(true);

      await api.post('/order', {
        idUserCustomer: informacoes.idUserCustomer,
        status: informacoes.status,
        idAdress: informacoes.idAdress,
        idCupom: informacoes.idCupom,
        idPayment: informacoes.idPayment,
      });

      toaster.create({
        title: 'Pedido criado com sucesso',
        type: 'success'
      });

      await buscarOrders();
      setInformacoes({
        idUserCustomer: '',
        status: '',
        idAdress: '',
        idCupom: '',
        idPayment: '',
      });

      setIsOpen(false);

    } catch (error) {
      toaster.create({
        title: 'Erro ao criar pedido',
        type: 'error'
      });
    }
    setLoadingSave(false);
  };

  const salvarEdicao = async () => {
    try {
      if (
        !informacoes.status.trim() ||
        !informacoes.idUserCustomer ||
        !informacoes.idAdress ||
        !informacoes.idPayment ||
        editingIndex === null
      ) return;
      setLoadingSave(true);

      const orderEditar = orders[editingIndex];
      await api.patch(`/order/${orderEditar.id}`, {
        idUserCustomer: informacoes.idUserCustomer,
        status: informacoes.status,
        idAdress: informacoes.idAdress,
        idCupom: informacoes.idCupom,
        idPayment: informacoes.idPayment,
      });

      toaster.create({
        title: 'Pedido editado com sucesso',
        type: 'success'
      });

      await buscarOrders();
      setEditingIndex(null);
      setInformacoes({
        idUserCustomer: '',
        status: '',
        idAdress: '',
        idCupom: '',
        idPayment: '',
      });
      setIsOpen(false);
    } catch (error) {
      toaster.create({
        title: 'Erro ao editar pedido',
        type: 'error'
      });
    }
    setLoadingSave(false);
  };

  const editarOrder = (index) => {
    const orderEditar = ordersAtuais[index];
    setInformacoes({
      idUserCustomer: orderEditar.idUserCustomer || '',
      status: orderEditar.status || '',
      idAdress: orderEditar.idAdress || '',
      idCupom: orderEditar.idCupom || '',
      idPayment: orderEditar.idPayment || '',
    });
    setEditingIndex(orders.indexOf(orderEditar));
    setIsOpen(true);
  };

  const deleteOrder = async (index, id) => {
    try {
      if (confirm('Você tem certeza que deseja excluir este pedido?')) {
        const orderDeletar = ordersAtuais[index];
        if (ordersAtuais.length === 1 && currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }

        await api.delete(`/order/${id}`);

        toaster.create({
          title: 'Pedido excluído com sucesso',
          type: 'success'
        });

        setLoadingSave(true);
        await buscarOrders();
      }
    } catch (error) {
      toaster.create({
        title: 'Erro ao excluir pedido',
        type: 'error'
      });
      setLoadingSave(false);
    }
  };

  return (
    <Box p={8}>
      <Heading mb={4}>Pedidos</Heading>
      <Flex mb={4} gap={4} align="center">
        <InputPesquisa
          searchTerm={searchTerm}
          SetSeachTerm={setSearchTerm}
        />
        <OrderDialog
          informacoes={informacoes}
          setInformacoes={setInformacoes}
          submit={{ createOrder, salvarEdicao }}
          editingIndex={editingIndex}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          loadingSave={loadingSave}
          users={users}
          adresses={adresses}
          cupons={cupons}
          payments={payments}
        />
      </Flex>
      <Stack style={{ display: 'flex', alignItems: 'center' }}>
        <TabelaCrud
          items={ordersAtuais}
          onEdit={editarOrder}
          onDelete={deleteOrder}
          acoes={true}
          headers={[
            { name: 'ID', value: 'id' },
            { name: 'Status', value: 'status' },
            { name: 'Total', value: 'total' },
            { name: 'Cliente', value: 'nomeUserCustomer' },
            { name: 'Endereço', value: 'nomeAdress' },
            { name: 'Cupom', value: 'nomeCupom' },
            { name: 'Pagamento', value: 'nomePayment' },
          ]}
        />
        <Flex>
          <PaginationTabela
            items={filteredOrders.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
          <SelecionarQuantidade
            itemsPerPage={itemsPerPage}
            setItemsPerPage={(quantidade) => {
              setItemsPerPage(quantidade);
              setCurrentPage(1);
            }}
          />
        </Flex>
      </Stack>
    </Box>
  )
}