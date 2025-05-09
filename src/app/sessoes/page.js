'use client';
import InputPesquisa from "@/components/InputPesquisa";
import DialogSessao from "@/components/DialogSessao";
import TabelaSessao from "@/components/TabelaSessao";
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

export default function Sessao() {
  const [tasks, setTasks] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [editingIndex, setEditingIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);
  const [informacoes, setInformacoes] = useState({
    idSala: '',
    idFilme: '',
    dataInicio: '',
    dataFim: '',
    preco: '', 
    lugares: []
  });
  
  useEffect(() => {
    buscarSessao();
  }, []);
    
  const filteredTasks = tasks.filter(task =>
    String(task.idFilme).includes(searchTerm.toLowerCase())
  );
    
  const buscarSessao = async () => {
    try {
      const response = await api.get('/sessao');
      setTasks(response.data.data);
    } catch (error) {
      toaster.create({
        title: 'Erro ao buscar sessões',
        type: 'error'
      });
    }
  };
    
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);
    
  const indexUltimoItem = currentPage * itemsPerPage;
  const indexPrimeiroItem = indexUltimoItem - itemsPerPage;
  const tasksAtuais = filteredTasks.slice(indexPrimeiroItem, indexUltimoItem);
  
  const criarTask = async () => {
    try {
      if (!idSala || !idFilme || !dataInicio || !dataFim || !preco) {
        toaster.create({
          title: 'Preencha todos os campos obrigatórios',
          type: 'warning'
        });
        return;
      }
      setLoadingSave(true);

      await api.post('/sessao', {
        idSala,
        idFilme,
        dataInicio,
        dataFim,
        preco
      });

      toaster.create({
        title: 'Sessão criada com sucesso',
        type: 'success'
      });

      await buscarSessao();
      setInformacoes({
        idSala: '',
        idFilme: '',
        dataInicio: '',
        dataFim: '',
        preco: '',
        lugares: [],
      });
      setIsOpen(false);
    } catch (error) {
      toaster.create({
        title: 'Erro ao criar sessão',
        type: 'error'
      });
    } 
  };

  const salvarEdicao = async () => {
    try {
      if (!informacoes.trim() || editingIndex === null) return;
      setLoadingSave(true);

      const taskEditar = tasks[editingIndex];
      await api.patch(`/sessao/${taskEditar.id}`, {
        idSala: informacoes.idSala,
        idFilme: informacoes.idFilme,
        dataInicio: informacoes.dataInicio,
        dataFim: informacoes.dataFim,
        preco: informacoes.preco
      });

      toaster.create({
        title: 'Sessão editada com sucesso',
        type: 'success'
      });

      await buscarSessao();
      setEditingIndex(null);
      setInformacoes({
        idSala: '',
        idFilme: '',
        dataInicio: '',
        dataFim: '',
        preco: ''
      });
      setIsOpen(false);
    } catch (error) {
      toaster.create({
        title: 'Erro ao editar sessão',
        type: 'error'
      });
    } 
  };

  const editarTask = async (index) => {
    const taskEditar = tasksAtuais[index];
    setInformacoes({
        idSala: taskEditar.idSala,
        idFilme: taskEditar.idFilme,
        dataInicio: taskEditar.dataInicio,
        dataFim: taskEditar.dataFim,
        preco: taskEditar.preco
    });
    setEditingIndex(tasks.indexOf(taskEditar));
    setIsOpen(true);
  };

  const excluirTask = async (index, id) => {
    try {
      if (confirm('Você tem certeza que deseja excluir esta sessão?')) {
        const taskDeletar = tasksAtuais[index];
        if (tasksAtuais.length === 1 && currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }

        await api.delete(`/sessao/${id}`);

        toaster.create({
          title: 'Sessão excluída com sucesso',
          type: 'success'
        });

        setLoadingSave(true);
        await buscarSessao();
      }
    } catch (error) {
      toaster.create({
        title: 'Erro ao excluir sessão',
        type: 'error'
      });
      setLoadingSave(false);
    }
  };

  return (
    <Box p={8}>
      <Heading mb={4}>Sessões</Heading>
      <Flex mb={4} gap={4} align="center">
        <InputPesquisa
          searchTerm={searchTerm}
          SetSeachTerm={setSearchTerm}
        />
        <DialogSessao
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
        <TabelaSessao
          items={tasksAtuais.map(sessao => {
            const formatarData = (data) => {
              const d = new Date(data);
              const hora = d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
              const dataFormatada = d.toLocaleDateString('pt-BR');
              return `hora: ${hora} data: ${dataFormatada}`;
            };
        
            return {
              ...sessao,
              lugares: Array.isArray(sessao.lugares)
                ? sessao.lugares.map(l => `${l.lugar} (${l.ocupado ? 'ocupado' : 'livre'})`).join(', ')
                : '',
              dataInicio: formatarData(sessao.dataInicio),
              dataFim: formatarData(sessao.dataFim)
            };
          })}
          onEdit={editarTask}
          onDelete={excluirTask}
          acoes={true}
          headers={[
            { name: 'ID', value: 'id' },
            { name: 'ID Filme', value: 'idFilme' },
            { name: 'ID Sala', value: 'idSala' },
            { name: 'Preço', value: 'preco' },
            { name: 'Lugares', value: 'lugares' },
            { name: 'Início Sessão', value: 'dataInicio' },
            { name: 'Fim Sessão', value: 'dataFim' }
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
  );
}
