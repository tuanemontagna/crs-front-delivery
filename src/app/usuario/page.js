'use client';
import InputPesquisa from "@/components/InputPesquisa";
import DialogUsuario from "@/components/DialogUsuario";
import TabelaCrud from "@/components/TabelaCrud";
import PaginationTabela from "@/components/PaginationTabela";
import SelecionarQuantidade from "@/components/SelecionarQuantidade";
import { 
  Box,
  Heading,
  Stack,
  Flex
} from "@chakra-ui/react"
import { useState, useEffect } from "react";
import { toaster } from "@/components/ui/toaster"
import api from "@/utils/axios";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [editingIndex, setEditingIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);
  const [informacoes, setInformacoes] = useState({
    idCargo: '',
    nome: '',
    cpf: '',
    email: '',
    password: '',
    estudante: false,
  });
  
  useEffect(() => {
      buscarUsuario();
    }, [])
    
    const filteredTasks = tasks.filter(task =>
        task.nome.includes(searchTerm.toLowerCase())
    );
    
    const buscarUsuario = async () => {
        try {
            const response = await api.get('/usuario')
            setTasks(response.data.data);
        } catch (error) {
            toaster.create({
                title: 'Erro ao buscar usuarios',
                type: 'error'
            });
        }
    }
    
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);
    
  const indexUltimoItem = currentPage * itemsPerPage;
  const indexPrimeiroItem = indexUltimoItem - itemsPerPage;
  const tasksAtuais = filteredTasks.slice(indexPrimeiroItem, indexUltimoItem)
  const usuarioExibicao = tasksAtuais.map((usuario) => ({
    ...usuario,
    estudante: usuario.estudante ? 'Sim' : 'Não'
  }));
  
  const criarTask = async () => {
    try {
      if (!informacoes.nome.trim()) return;
      setLoadingSave(true);

      await api.post('/usuario', {
        idCargo: informacoes.idCargo,
        nome: informacoes.nome,
        cpf: informacoes.cpf,
        email: informacoes.email,
        password: informacoes.password,
        estudante: informacoes.estudante,
      });

      toaster.create({
        title: 'Usuário criado com sucesso',
        type: 'sucess'
      });

      await buscarUsuario();
      setInformacoes({
        idCargo: '',
        nome: '',
        cpf: '',
        email: '',
        password: '',
        estudante: false,
      });
      setIsOpen(false);
    } catch (error) {
      toaster.create({
        title: 'Erro ao criar usuario',
        type: 'error'
      });
    } 
  }

  const salvarEdicao = async () => {
    try {
      if (!informacoes.nome.trim() || editingIndex === null) return;
      setLoadingSave(true);

      const taskEditar = tasks[editingIndex];
      await api.patch(`/usuario/${taskEditar.id}`, {
        idCargo: informacoes.idCargo,
        nome: informacoes.nome,
        cpf: informacoes.cpf,
        email: informacoes.email,
        password: informacoes.password,
        estudante: informacoes.estudante,
      });

      toaster.create({
        title: 'Usuário editado com sucesso',
        type: 'sucess'
      });

      await buscarUsuario();
      setEditingIndex(null);
      setInformacoes({
        idCargo: '',
        nome: '',
        cpf: '',
        email: '',
        password: '',
        estudante: false,
      });
      setIsOpen(false);
    } catch (error) {
      toaster.create({
        title: 'Erro ao editar usuario',
        type: 'error'
      });
    } 
  }

  const editarTask = async (index) => {
    const taskEditar = tasksAtuais[index];
    setInformacoes({
        idCargo: taskEditar.cargo,
        nome: taskEditar.nome,
        cpf: taskEditar.cpf,
        email: taskEditar.email,
        password: taskEditar.password,
        estudante: taskEditar.estudante,
    })
    setEditingIndex(tasks.indexOf(taskEditar));
    setIsOpen(true);
  };

  const excluirTask = async (index, id) => {
    try {
      if (confirm('Você tem certeza que deseja excluir este usuario?')) {
        const taskDeletar = tasksAtuais[index];
        if (tasksAtuais.length === 1 && currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }

        await api.delete(`/usuario/${id}`);

        toaster.create({
          title: 'Usuário excluído com sucesso',
          type: 'sucess'
        });

        setLoadingSave(true);
        await buscarUsuario();
      }
    } catch (error) {
      toaster.create({
        title: 'Erro ao excluir usuario',
        type: 'error'
      });
      setLoadingSave(false);
    }
  }

  return (
    <Box p={8}>
      <Heading mb={4}> Usuários </Heading>
      <Flex mb={4} gap={4} align="center">
        <InputPesquisa
          searchTerm={searchTerm}
          SetSeachTerm={setSearchTerm}
        />
        <DialogUsuario
          informacoes={informacoes}
          setInformacoes={setInformacoes}
          submit={{ criarTask, salvarEdicao }}
          editingIndex={editingIndex}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          loadingSave={loadingSave}
        />
      </Flex>
      <Stack style={{ display: 'flex', alignItems: 'center' }}>
        <TabelaCrud
          items={usuarioExibicao}
          onEdit={editarTask}
          onDelete={excluirTask}
          acoes={true}
          headers={[
            {name: 'ID', value: 'id'},
            {name: 'ID Cargo', value: 'idCargo'},
            {name: 'Nome', value: 'nome'},
            {name: 'CPF', value: 'cpf'},
            {name: 'Email', value: 'email'},
            {name: 'Estudante', value: 'estudante'},
          ]}
        />
        <Flex>
          <PaginationTabela
            items={filteredTasks.length}
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
