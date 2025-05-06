'use client';
import { useState, useEffect } from "react";
import { Box, Heading, Stack, Flex } from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";
import api from "@/utils/axios";
import axios from "axios";
import InputPesquisa from "@/components/InputPesquisa";
import DialogFilme from "@/components/DialogFilme";
import TabelaCrud from "@/components/TabelaCrud";
import PaginationTabela from "@/components/PaginationTabela";
import SelecionarQuantidade from "@/components/SelecionarQuantidade";

export default function FilmePage() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [editingIndex, setEditingIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);
  const [informacoes, setInformacoes] = useState({
    nome: '',
    descricao: '',
    autor: '',
    duracao: '',
    cartaz: ''
  });

  const buscarFilme = async () => {
    try {
      const response = await api.get('/filme');
      setTasks(response.data.data);
    } catch (error) {
      toaster.create({
        title: 'Erro ao buscar filmes',
        type: 'error'
      });
    }
  };

  const uploadFile = async (files) => {

    const uploadedData = [];
  
    const uploadPromises = files.map(async (fileData) => {
      const { file } = fileData;
  
      if (!file) {
        return;
      }
  
      const formData = new FormData();
      const fileBuffer = await file.arrayBuffer();
      const cleanFile = new File([fileBuffer], file.name.replace(/\s/g, '_'), {
        type: file.type,
        lastModified: file.lastModified,
      });
  
      formData.append('file', cleanFile, cleanFile.name);
  
      try {
        const response = await axios.post("/upload/cartaz", formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
          transformRequest: (data) => data,
        });
  
        uploadedData.push({
          fileName: cleanFile.name,
          fileType: cleanFile.type,
          fileSize: cleanFile.size,
          url: response.data.path, 
        });
  
      } catch (error) {
        console.error("Upload failed:", error);
        toaster.create({
          title: `Failed to upload ${file.name}`,
          type: "error",
        });
      }
    });
  
    await Promise.all(uploadPromises);
  
    return uploadedData;
  };
  
  const criarTask = async () => {
    try {
      const { nome, descricao, autor, duracao, cartaz } = informacoes;
  
      if (!nome?.trim() || !descricao?.trim() || !autor?.trim() || !duracao?.trim()) return;
      setLoadingSave(true);
      
      let cartazUrl = '';
      if (cartaz && cartaz.length > 0) {
        const uploadedFiles = await uploadFile(cartaz);
        cartazUrl = uploadedFiles[0]?.url; 
      }
  
      const response = await api.post('/filme', {
        nome,         
        descricao,
        autor,
        duracao: parseInt(duracao, 10),
        cartaz: cartazUrl, 
      });
  
      toaster.create({
        title: 'Filme cadastrado com sucesso',
        type: 'success',
      });
      await buscarFilme();
      resetForm();
    } catch (error) {
      toaster.create({
        title: 'Erro ao cadastrar filme',
        type: 'error',
      });
    }
  };
  
  const salvarEdicao = async () => {
    try {
      if (!informacoes.nome?.trim() || editingIndex === null) return;
      setLoadingSave(true);
      const taskEditar = tasks[editingIndex];
  
      let cartazUrl = taskEditar.cartaz;
      if (cartaz && cartaz.length > 0) {
        const uploadedFiles = await uploadFile(cartaz);
        cartazUrl = uploadedFiles[0]?.url; 
      }
  
      await api.patch(`/filme/${taskEditar.id}`, {
        nome: informacoes.nome,
        descricao: informacoes.descricao,
        autor: informacoes.autor,
        duracao: parseInt(informacoes.duracao, 10),
        cartaz: cartazUrl, 
      });
  
      toaster.create({
        title: 'Filme editado com sucesso',
        type: 'success',
      });
      await buscarFilme();
      resetForm();
    } catch (error) {
      toaster.create({
        title: 'Erro ao editar filme',
        type: 'error',
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

        await buscarFilme();
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
      nome: taskEditar.nome,
      descricao: taskEditar.descricao,
      autor: taskEditar.autor,
      duracao: taskEditar.duracao
    });
    setEditingIndex(index);
    setIsOpen(true);
  };

  const resetForm = () => {
    setInformacoes({
      nome: '',
      descricao: '',
      autor: '',
      duracao: '',
      cartaz: ''
    });
    setEditingIndex(null);
    setIsOpen(false);
  };

  const indexUltimoItem = currentPage * itemsPerPage;
  const indexPrimeiroItem = indexUltimoItem - itemsPerPage;
  const tasksAtuais = tasks.slice(indexPrimeiroItem, indexUltimoItem);
  const filteredTasks = tasks.filter(task => task.nome.toLowerCase().includes(searchTerm.toLowerCase()));

  useEffect(() => {
    buscarFilme();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  return (
    <Box p={8}>
      <Heading mb={4}> Filmes </Heading>
      <Flex mb={4} gap={4} align="center">
        <InputPesquisa searchTerm={searchTerm} SetSeachTerm={setSearchTerm} />
        <DialogFilme
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
            { name: 'ID', value: 'id' },
            { name: 'Nome', value: 'nome' },
            { name: 'Descrição', value: 'descricao' },
            { name: 'Autor', value: 'autor' },
            { name: 'Duração', value: 'duracao' }
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
