'use client';
import { useState, useEffect } from "react";
import { Box, Heading, Stack, Flex } from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";
import api from "@/utils/axios";
import InputPesquisa from "@/components/InputPesquisa";
import DialogPadraoLugares from "@/components/DialogPadraoLugares";
import TabelaCrud from "@/components/TabelaCrud";
import PaginationTabela from "@/components/PaginationTabela";
import SelecionarQuantidade from "@/components/SelecionarQuantidade";

export default function FilmePage() {
  const [tasks, setTasks] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [editingIndex, setEditingIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);
  const [informacoes, setInformacoes] = useState({
    lugares: []
  });

  const buscarPadraoLugares = async () => {
    try {
        const response = await api.get('/padrao-lugar');

        console.log("API Response:", response.data.data);

        // Extrai e combina todos os arrays "lugares" de cada objeto
        const allLugares = response.data.data.flatMap(item =>
            item.lugares.map(lugar => ({
              ...lugar,
              ocupado: lugar.ocupado ? "Sim" : "Não",
              idPadraoLugar: item.id,
            }))
          );
        console.log("API Response 2:", allLugares);

        setTasks(allLugares);
    } catch (error) {
        toaster.create({
            description: 'Erro ao buscar padrões de lugares!',
            type: 'error'
        });
    }
  };
  
  const criarTask = async () => {
    try {
      if (!informacoes.lugares.length) return; 
  
      setLoadingSave(true);
  
      await api.post('/padrao-lugar', {
        lugares: informacoes.lugares  
      });
  
      toaster.create({
        title: 'Padrão de lugares criado com sucesso',
        type: 'success'
      });
  
      await buscarPadraoLugares();
      setInformacoes({
        lugares: []  
      });
      setEditingIndex(null);
      setIsOpen(false); 
      
    } catch (error) {
      toaster.create({
        title: 'Erro ao criar padrão de lugares',
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
        lugar: informacoes.lugar,
        ocupado: informacoes.ocupado,
        linha: informacoes.linha,
        coluna: informacoes.coluna
      });

      toaster.create({
        title: 'Sessão editada com sucesso',
        type: 'success'
      });

      await buscarPadraoLugares();
      setEditingIndex(null);
      setInformacoes({
        lugares: []
      });
      setIsOpen(false);
    } catch (error) {
      setEditingIndex(null);
      toaster.create({
        title: 'Erro ao editar sessão',
        type: 'error'
      });
    } 
  };

  const excluirTask = async (index, id) => {
    try {
      if (confirm('Você tem certeza que deseja excluir este filme?')) {
        const taskDeletar = tasks[index];
        if (tasks.length === 1 && currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }

        await api.delete(`/filme/${id}`);
        toaster.create({
          title: 'Filme excluído com sucesso',
          type: 'sucess'
        });

        await buscarPadraoLugares();
      }
    } catch (error) {
      toaster.create({
        title: 'Erro ao excluir filme',
        type: 'error'
      });
      setLoadingSave(false);
    }
  };

  const editarTask = async (index) => {
    const taskEditar = tasks[index];
    setInformacoes({
        lugar: informacoes.lugar,
        ocupado: informacoes.ocupado,
        linha: informacoes.linha,
        coluna: informacoes.coluna
    });
    setEditingIndex(index);
    setIsOpen(true);
  };

  const resetForm = () => {
    setInformacoes({
      lugares: []
    });
    setEditingIndex(null);
    setIsOpen(false);
  };

  const indexUltimoItem = currentPage * itemsPerPage;
  const indexPrimeiroItem = indexUltimoItem - itemsPerPage;
  const tasksAtuais = tasks.slice(indexPrimeiroItem, indexUltimoItem);
  const filteredTasks = tasks.filter(task => task.lugar.toLowerCase().includes(searchTerm.toLowerCase()));

  useEffect(() => {
    buscarPadraoLugares();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  return (
    <Box p={8}>
      <Heading mb={4}> Padrão de Lugares </Heading>
      <Flex mb={4} gap={4} align="center">
        <InputPesquisa searchTerm={searchTerm} SetSeachTerm={setSearchTerm} />
        <DialogPadraoLugares
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
            {name: 'ID', value: 'idPadraoLugar'},
            { name: 'Lugar', value: 'lugar' },
            { name: 'Linha', value: 'linha' },
            { name: 'Coluna', value: 'coluna' },
            { name: 'Ocupado', value: 'ocupado' }
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
