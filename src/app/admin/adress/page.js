'use client';
import InputPesquisa from "@/components/admin/InputPesquisa";
import AdressDialog from "@/components/admin/AdressDialog.jsx";
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

export default function Adress() {
  const [adress, setAdress] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [editingIndex, setEditingIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);
  const [users, setUsers] = useState([]);
  const [informacoes, setInformacoes] = useState({
    zipCode: '',
    state: '',
    city: '',
    street: '',
    district: '',
    numberForget: '',
    idUser: ''
  });

  useEffect(() => {
    buscarUsuarios();
    buscaradress();
  }, [])

  const buscaradress = async () => {
    try {
      const response = await api.get('/adress')
      setAdress(response.data.data);
    } catch (error) {
      toaster.create({
        title: 'Erro ao buscar endereço',
        type: 'error'
      });
    }
  }

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

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const adressComUsuario = adress.map(addr => {
  const usuario = users.find(u => u.id === addr.idUser);
  return {
    ...addr,
    nomeUsuario: usuario ? usuario.name : ''
  };
});

const filteredadress = adressComUsuario.filter(adress =>
  adress.zipCode?.toLowerCase().includes(searchTerm.toLowerCase())
);

const indexUltimoItem = currentPage * itemsPerPage;
const indexPrimeiroItem = indexUltimoItem - itemsPerPage;
const adressAtuais = filteredadress.slice(indexPrimeiroItem, indexUltimoItem);

  const createAdress = async () => {
    try {
      if (
        !informacoes.zipCode.trim() ||
        !informacoes.state.trim() ||
        !informacoes.city.trim() ||
        !informacoes.street.trim() ||
        !informacoes.district.trim() ||
        !informacoes.numberForget.trim() ||
        !informacoes.idUser.toString().trim()
      ) return;
      setLoadingSave(true);

      await api.post('/adress', {
        zipCode: informacoes.zipCode,
        state: informacoes.state,
        city: informacoes.city,
        street: informacoes.street,
        district: informacoes.district,
        numberForget: informacoes.numberForget,
        idUser: informacoes.idUser,
      });

      toaster.create({
        title: 'Endereço criado com sucesso',
        type: 'success'
      });

      await buscaradress();
      setInformacoes({
        zipCode: '',
        state: '',
        city: '',
        street: '',
        district: '',
        numberForget: '',
        idUser: ''
      });

      setIsOpen(false);

    } catch (error) {
      toaster.create({
        title: 'Erro ao criar endereço',
        type: 'error'
      });
    }
    setLoadingSave(false);
  }

  const salvarEdicao = async () => {
    try {
      if (
        !informacoes.zipCode.trim() ||
        !informacoes.state.trim() ||
        !informacoes.city.trim() ||
        !informacoes.street.trim() ||
        !informacoes.district.trim() ||
        !informacoes.numberForget.trim() ||
        !informacoes.idUser.toString().trim() ||
        editingIndex === null
      ) return;
      setLoadingSave(true);

      const adressEditar = adress[editingIndex];
      await api.patch(`/adress/${adressEditar.id}`, {
        zipCode: informacoes.zipCode,
        state: informacoes.state,
        city: informacoes.city,
        street: informacoes.street,
        district: informacoes.district,
        numberForget: informacoes.numberForget,
        idUser: informacoes.idUser,
      });

      toaster.create({
        title: 'Endereço editado com sucesso',
        type: 'success'
      });

      await buscaradress();
      setEditingIndex(null);
      setInformacoes({
        zipCode: '',
        state: '',
        city: '',
        street: '',
        district: '',
        numberForget: '',
        idUser: ''
      });
      setIsOpen(false);
    } catch (error) {
      toaster.create({
        title: 'Erro ao editar endereço',
        type: 'error'
      });
    }
    setLoadingSave(false);
  }

  const editaradress = (index) => {
    const adressEditar = adressAtuais[index];
    setInformacoes({
      zipCode: adressEditar.zipCode || '',
      state: adressEditar.state || '',
      city: adressEditar.city || '',
      street: adressEditar.street || '',
      district: adressEditar.district || '',
      numberForget: adressEditar.numberForget || '',
      idUser: adressEditar.idUser || ''
    });
    setEditingIndex(adress.indexOf(adressEditar));
    setIsOpen(true);
  };

  const deleteadress = async (index, id) => {
    try {
      if (confirm('Você tem certeza que deseja excluir este endereço?')) {
        const adressDeletar = adressAtuais[index];
        if (adressAtuais.length === 1 && currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }

        await api.delete(`/adress/${id}`);

        toaster.create({
          title: 'Endereço excluído com sucesso',
          type: 'success'
        });

        setLoadingSave(true);
        await buscaradress();
      }
    } catch (error) {
      toaster.create({
        title: 'Erro ao excluir endereço',
        type: 'error'
      });
      setLoadingSave(false);
    }
  }

  return (
    <Box p={8}>
      <Heading mb={4}>Endereços</Heading>
      <Flex mb={4} gap={4} align="center">
        <InputPesquisa
          searchTerm={searchTerm}
          SetSeachTerm={setSearchTerm}
        />
        <AdressDialog
          informacoes={informacoes}
          setInformacoes={setInformacoes}
          submit={{ createAdress, salvarEdicao }}
          editingIndex={editingIndex}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          loadingSave={loadingSave}
        />
      </Flex>
      <Stack style={{ display: 'flex', alignItems: 'center' }}>
        <TabelaCrud
          items={adressAtuais}
          onEdit={editaradress}
          onDelete={deleteadress}
          acoes={true}
          headers={[
            { name: 'ID', value: 'id' },
            { name: 'CEP', value: 'zipCode' },
            { name: 'Estado', value: 'state' },
            { name: 'Cidade', value: 'city' },
            { name: 'Rua', value: 'street' },
            { name: 'Bairro', value: 'district' },
            { name: 'Número', value: 'numberForget' },
            { name: 'Usuário', value: 'nomeUsuario' },
          ]}
        />
        <Flex>
          <PaginationTabela
            items={filteredadress.length}
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