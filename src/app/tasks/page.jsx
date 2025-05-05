'use client';
import InputPesquisa from "@/components/InputPesquisa";
import InputCreate from "@/components/InputCreate";
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

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [editingIndex, setEditingIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const filteredTasks = tasks.filter(task =>
    task.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const indexUltimoItem = currentPage * itemsPerPage;
  const indexPrimeiroItem = indexUltimoItem - itemsPerPage;
  const tasksAtuais = filteredTasks.slice(indexPrimeiroItem, indexUltimoItem)

  const criarTask = () => {
    if (!input.trim()) return;
    if (editingIndex !== null) {
      const tasksAtualizadas = [...tasks]
      tasksAtualizadas[editingIndex] = input
      setTasks(tasksAtualizadas)
      setEditingIndex(null)
    } else {
      setTasks([...tasks, input]);
    }
    setInput('');
  }

  const editarTask = (index) => {
    setInput(tasksAtuais[index]);
    setEditingIndex(tasks.indexOf(tasksAtuais[index]));
    setIsOpen(true);
  };

  const excluirTask = (index) => {
    const taskDeletar = tasksAtuais[index];
    const taskExcluido = tasks.filter(task => task !== taskDeletar);
    if (tasksAtuais.length === 1 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
    setTasks(taskExcluido);
  }

  return (
    <Box p={8}>
      <Heading mb={4}> Lista de Tarefas </Heading>
      <Flex mb={4} gap={4} align="center">
        <InputPesquisa
            searchTerm={searchTerm}
            SetSeachTerm={setSearchTerm}
        />
        <InputCreate
            input={input}
            setInput={setInput}
            submit={criarTask}
            editingIndex={editingIndex}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
        />
      </Flex>
      <Stack style={{display: 'flex', alignItems: 'center'}}>
        <TabelaCrud
          items={tasksAtuais}
          onEdit={editarTask}
          onDelete={excluirTask}
          acoes={true}
          headers={[
            'Tarefa',
            'Ações'
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