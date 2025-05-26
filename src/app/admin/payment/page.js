'use client';
import InputPesquisa from "@/components/admin/InputPesquisa";
import PaymentDialog from "@/components/admin/PaymentDialog.jsx";
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

export default function Payment() {
  const [payment, setPayment] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [editingIndex, setEditingIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);
  const [informacoes, setInformacoes] = useState({
    name: '',
  });

  useEffect(() => {
    buscarPayment();
  }, [])

  const buscarPayment = async () => {
    try {
      const response = await api.get('/payment')
      setPayment(response.data.data);
    } catch (error) {
      toaster.create({
        title: 'Erro ao buscar Pagamento',
        type: 'error'
      });
    }
  }

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const filteredPayment = payment.filter(payment =>
    payment.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexUltimoItem = currentPage * itemsPerPage;
  const indexPrimeiroItem = indexUltimoItem - itemsPerPage;
  const paymentAtuais = filteredPayment.slice(indexPrimeiroItem, indexUltimoItem);

  const createPayment = async () => {
    try {
      if (!informacoes.name.trim()) return;
      setLoadingSave(true);

      await api.post('/payment', {
        name: informacoes.name,
      });

      toaster.create({
        title: 'Pagamento criado com sucesso',
        type: 'success'
      });

      await buscarPayment();
      setInformacoes({
        name: ''
      });

      setIsOpen(false);

    } catch (error) {
      toaster.create({
        title: 'Erro ao criar pagamento',
        type: 'error'
      });
    }
    setLoadingSave(false);
  }

  const salvarEdicao = async () => {
    try {
      if (!informacoes.name.trim() || editingIndex === null) return;
      setLoadingSave(true);

      const paymentEditar = payment[editingIndex];
      await api.patch(`/payment/${paymentEditar.id}`, {
        name: informacoes.name,
      });

      toaster.create({
        title: 'Pagamento editado com sucesso',
        type: 'success'
      });

      await buscarPayment();
      setEditingIndex(null);
      setInformacoes({
        name: ''
      });
      setIsOpen(false);
    } catch (error) {
      toaster.create({
        title: 'Erro ao editar pagamento',
        type: 'error'
      });
    }
    setLoadingSave(false);
  }

  const editarPayment = (index) => {
    const paymentEditar = paymentAtuais[index];
    setInformacoes({name: paymentEditar.name || ''});
    setEditingIndex(payment.indexOf(paymentEditar));
    setIsOpen(true);
  };

  const deletarPayment = async (index, id) => {
    try {
      if (confirm('Você tem certeza que deseja excluir este pagamento?')) {
        const paymentDeletar = paymentAtuais[index];
        if (paymentAtuais.length === 1 && currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }

        await api.delete(`/payment/${id}`);

        toaster.create({
          title: 'Pagamento excluído com sucesso',
          type: 'success'
        });

        setLoadingSave(true);
        await buscarPayment();
      }
    } catch (error) {
      toaster.create({
        title: 'Erro ao excluir Pagamento',
        type: 'error'
      });
      setLoadingSave(false);
    }
  }

  return (
    <Box p={8}>
      <Heading mb={4}>Pagamentos</Heading>
      <Flex mb={4} gap={4} align="center">
        <InputPesquisa
          searchTerm={searchTerm}
          SetSeachTerm={setSearchTerm}
        />
        <PaymentDialog
          informacoes={informacoes}
          setInformacoes={setInformacoes}
          submit={{ createPayment, salvarEdicao }}
          editingIndex={editingIndex}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          loadingSave={loadingSave}
        />
      </Flex>
      <Stack style={{ display: 'flex', alignItems: 'center' }}>
        <TabelaCrud
          items={paymentAtuais}
          onEdit={editarPayment}
          onDelete={deletarPayment}
          acoes={true}
          headers={[
            { name: 'ID', value: 'id' },
            { name: 'Nome', value: 'name' },
          ]}
        />
        <Flex>
          <PaginationTabela
            items={filteredPayment.length}
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