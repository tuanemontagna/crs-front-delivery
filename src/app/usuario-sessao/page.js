'use client';
import InputPesquisa from "@/components/InputPesquisa";
import DialogUsuarioSessao from "@/components/DialogUsuarioSessao";
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
    idUsuario: '',
    idSessao: '',
    valor: '',
    status: ''
  });
  
  useEffect(() => {
      buscarUsuarioSessao();
    }, [])
    
    const filteredTasks = tasks.filter(task =>
        task.valor.includes(searchTerm.toLowerCase())
    );
    
    const buscarUsuarioSessao = async () => {
        try {
            const response = await api.get('/usuario-sessao')
            setTasks(response.data.data);
        } catch (error) {
            toaster.create({
                title: 'Erro ao buscar usuarios sessoes',
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
  
  const criarTask = async () => {
    try {
      if (!informacoes.valor.trim()) return;
      setLoadingSave(true);

      await api.post('/usuario-sessao', {
        idUsuario: informacoes.idUsuario,
        idSessao: informacoes.idSessao,
        valor: informacoes.valor,
        status: informacoes.status
      });

      toaster.create({
        title: 'Usuário criado com sucesso',
        type: 'sucess'
      });

      await buscarUsuarioSessao();
      setInformacoes({
        idUsuario: '',
        idSessao: '',
        valor: '',
        status: ''
      });
      setIsOpen(false);
    } catch (error) {
      toaster.create({
        title: 'Erro ao criar usuario sessao',
        type: 'error'
      });
    } 
  }

  const salvarEdicao = async () => {
    try {
      if (!informacoes.valor.trim() || editingIndex === null) return;
      setLoadingSave(true);

      const taskEditar = tasks[editingIndex];
      await api.patch(`/usuario/${taskEditar.id}`, {
        idUsuario: informacoes.idUsuario,
        idSessao: informacoes.idSessao,        idSessao: informacoes.idSessao,
        valor: informacoes.valor,
        status: informacoes.status
      });

      toaster.create({
        title: 'Usuário editado com sucesso',
        type: 'sucess'
      });

      await buscarUsuarioSessao();
      setEditingIndex(null);
      setInformacoes({
        idUsuario: '',
        idSessao: '',
        valor: '',
        status: ''
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
        idUsuario: informacoes.idUsuario,
        idSessao: informacoes.idSessao,
        valor: informacoes.valor,
        status: informacoes.status
    });
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

        await api.delete(`/usuario-sessao/${id}`);

        toaster.create({
          title: 'Usuário sessão excluído com sucesso',
          type: 'sucess'
        });

        setLoadingSave(true);
        await buscarUsuarioSessao();
      }
    } catch (error) {
      toaster.create({
        title: 'Erro ao excluir usuario sessao',
        type: 'error'
      });
      setLoadingSave(false);
    }
  }

  return (
    <Box p={8}>
      <Heading mb={4}> Usuário Sessão </Heading>
      <Flex mb={4} gap={4} align="center">
        <InputPesquisa
          searchTerm={searchTerm}
          SetSeachTerm={setSearchTerm}
        />
        <DialogUsuarioSessao
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
          items={tasksAtuais}
          onEdit={editarTask}
          onDelete={excluirTask}
          acoes={true}
          headers={[
            {name: 'ID', value: 'id'},
            {name: 'ID Usuário', value: 'idUsuario'},
            {name: 'ID Sessão', value: 'idSessao'},
            {name: 'Valor', value: 'valor'},
            {name: 'Status', value: 'status'},
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
