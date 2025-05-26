'use client';
import InputPesquisa from "@/components/admin/InputPesquisa";
import UserDialog from "@/components/admin/UserDialog.jsx";
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

export default function User() {
  const [users, setUsers] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [editingIndex, setEditingIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);
  const [informacoes, setInformacoes] = useState({
    userName: '',
    cpf: '',
    name: '',
    phone: '',
    password: '',
    role: '',
    cart: '',
    email: '',
  });

  useEffect(() => {
    buscarUsuarios();
  }, [])

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

  const usersComCartFormatado = users.map(user => ({
  ...user,
  cart: user.cart ? JSON.stringify(user.cart) : '',
}));

const filteredUsers = usersComCartFormatado.filter(user =>
  user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
  user.email?.toLowerCase().includes(searchTerm.toLowerCase())
);

const indexUltimoItem = currentPage * itemsPerPage;
const indexPrimeiroItem = indexUltimoItem - itemsPerPage;
const usersAtuais = filteredUsers.slice(indexPrimeiroItem, indexUltimoItem);

  const createUser = async () => {
    try {
      if (
        !informacoes.userName.trim() ||
        !informacoes.cpf.trim() ||
        !informacoes.name.trim() ||
        !informacoes.phone.trim() ||
        !informacoes.password.trim() ||
        !informacoes.role.trim() ||
        !informacoes.email.trim()
      ) return;
      setLoadingSave(true);

      await api.post('/user', {
        userName: informacoes.userName,
        cpf: informacoes.cpf,
        name: informacoes.name,
        phone: informacoes.phone,
        password: informacoes.password,
        role: informacoes.role,
        cart: informacoes.cart,
        email: informacoes.email,
      });

      toaster.create({
        title: 'Usuário criado com sucesso',
        type: 'success'
      });

      await buscarUsuarios();
      setInformacoes({
        userName: '',
        cpf: '',
        name: '',
        phone: '',
        password: '',
        role: '',
        cart: '',
        email: '',
      });

      setIsOpen(false);

    } catch (error) {
      toaster.create({
        title: 'Erro ao criar usuário',
        type: 'error'
      });
    }
    setLoadingSave(false);
  }

  const salvarEdicao = async () => {
    try {
      if (
        !informacoes.userName.trim() ||
        !informacoes.cpf.trim() ||
        !informacoes.name.trim() ||
        !informacoes.phone.trim() ||
        !informacoes.password.trim() ||
        !informacoes.role.trim() ||
        !informacoes.email.trim() ||
        editingIndex === null
      ) return;
      setLoadingSave(true);

      const userEditar = users[editingIndex];
      await api.patch(`/user/${userEditar.id}`, {
        userName: informacoes.userName,
        cpf: informacoes.cpf,
        name: informacoes.name,
        phone: informacoes.phone,
        password: informacoes.password,
        role: informacoes.role,
        cart: informacoes.cart,
        email: informacoes.email,
      });

      toaster.create({
        title: 'Usuário editado com sucesso',
        type: 'success'
      });

      await buscarUsuarios();
      setEditingIndex(null);
      setInformacoes({
        userName: '',
        cpf: '',
        name: '',
        phone: '',
        password: '',
        role: '',
        cart: '',
        email: '',
      });
      setIsOpen(false);
    } catch (error) {
      toaster.create({
        title: 'Erro ao editar usuário',
        type: 'error'
      });
    }
    setLoadingSave(false);
  }

  const editarUser = (index) => {
    const userEditar = usersAtuais[index];
    setInformacoes({
      userName: userEditar.userName || '',
      cpf: userEditar.cpf || '',
      name: userEditar.name || '',
      phone: userEditar.phone || '',
      password: '', // nunca traga senha do backend
      role: userEditar.role || '',
      cart: userEditar.cart || '',
      email: userEditar.email || '',
    });
    setEditingIndex(users.indexOf(userEditar));
    setIsOpen(true);
  };

  const deleteUser = async (index, id) => {
    try {
      if (confirm('Você tem certeza que deseja excluir este usuário?')) {
        const userDeletar = usersAtuais[index];
        if (usersAtuais.length === 1 && currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }

        await api.delete(`/user/${id}`);

        toaster.create({
          title: 'Usuário excluído com sucesso',
          type: 'success'
        });

        setLoadingSave(true);
        await buscarUsuarios();
      }
    } catch (error) {
      toaster.create({
        title: 'Erro ao excluir usuário',
        type: 'error'
      });
      setLoadingSave(false);
    }
  }

  return (
    <Box p={8}>
      <Heading mb={4}>Usuários</Heading>
      <Flex mb={4} gap={4} align="center">
        <InputPesquisa
          searchTerm={searchTerm}
          SetSeachTerm={setSearchTerm}
        />
        <UserDialog
          informacoes={informacoes}
          setInformacoes={setInformacoes}
          submit={{ createUser, salvarEdicao }}
          editingIndex={editingIndex}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          loadingSave={loadingSave}
        />
      </Flex>
      <Stack style={{ display: 'flex', alignItems: 'center' }}>
        <TabelaCrud
          items={usersAtuais}
          onEdit={editarUser}
          onDelete={deleteUser}
          acoes={true}
          headers={[
            { name: 'ID', value: 'id' },
            { name: 'Usuário', value: 'userName' },
            { name: 'Nome', value: 'name' },
            { name: 'CPF', value: 'cpf' },
            { name: 'Telefone', value: 'phone' },
            { name: 'E-mail', value: 'email' },
            { name: 'Perfil', value: 'role' },
            { name: 'Carrinho', value: 'cart' },
          ]}
        />
        <Flex>
          <PaginationTabela
            items={filteredUsers.length}
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