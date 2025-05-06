'use client';
import InputPesquisa from "@/components/InputPesquisa";
import DialogCargo from "@/components/DialogCargo";
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
  const [input, setInput] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [editingIndex, setEditingIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);

  useEffect(() => {
    buscarCargo();
  }, [])

  const filteredTasks = tasks.filter(task =>
    task.descricao.includes(searchTerm.toLowerCase())
  );

  const buscarCargo = async () => {
    try {
      const response = await api.get('/cargo')
      setTasks(response.data.data);
    } catch (error) {
      toaster.create({
        title: 'Erro ao buscar cargos',
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
      if (!input.trim()) return;
      setLoadingSave(true);

      await api.post('/cargo', {
        descricao: input,
      });

      toaster.create({
        title: 'Cargo criado com sucesso',
        type: 'sucess'
      });

      await buscarCargo();
      setInput('');
      setIsOpen(false);
    } catch (error) {
      toaster.create({
        title: 'Erro ao criar cargo',
        type: 'error'
      });
    } 
  }

  const salvarEdicao = async () => {
    try {
      if (!input.trim() || editingIndex === null) return;
      setLoadingSave(true);

      const taskEditar = tasks[editingIndex];
      await api.patch(`/cargo/${taskEditar.id}`, {
        descricao: input
      });

      toaster.create({
        title: 'Cargo editado com sucesso',
        type: 'sucess'
      });

      await buscarCargo();
      setEditingIndex(null);
      setInput('');
      setIsOpen(false);
    } catch (error) {
      toaster.create({
        title: 'Erro ao editar cargo',
        type: 'error'
      });
    } 
  }

  const editarTask = async (index) => {
    const taskEditar = tasksAtuais[index];
    setInput(taskEditar.descricao);
    setEditingIndex(tasks.indexOf(taskEditar));
    setIsOpen(true);
  };

  const excluirTask = async (index, id) => {
    try {
      if (confirm('Você tem certeza que deseja excluir este cargo?')) {
        const taskDeletar = tasksAtuais[index];
        if (tasksAtuais.length === 1 && currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }

        await api.delete(`/cargo/${id}`);

        toaster.create({
          title: 'Cargo excluído com sucesso',
          type: 'sucess'
        });

        setLoadingSave(true);
        await buscarCargo();
      }
    } catch (error) {
      toaster.create({
        title: 'Erro ao excluir cargo',
        type: 'error'
      });
      setLoadingSave(false);
    }
  }

  return (
    <Box p={8}>
      <Heading mb={4}> Cargos </Heading>
      <Flex mb={4} gap={4} align="center">
        <InputPesquisa
          searchTerm={searchTerm}
          SetSeachTerm={setSearchTerm}
        />
        <DialogCargo
          input={input}
          setInput={setInput}
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
            {name: 'Descrição', value: 'descricao'},
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
