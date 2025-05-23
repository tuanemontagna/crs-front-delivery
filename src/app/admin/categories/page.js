'use client';
import InputPesquisa from "@/components/admin/InputPesquisa";
import CategoriesDialog from "@/components/admin/CategoriesDialog.jsx";
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

export default function Categories() {
  const [categories, setCategories] = useState([]);
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
      buscarCategories();
    }, [])
    
    const filteredcategories = categories.filter(category =>
        category.name.includes(searchTerm.toLowerCase())
    );
    
    const buscarCategories = async () => {
        try {
            const response = await api.get('/categories')
            setCategories(response.data.data);
        } catch (error) {
            toaster.create({
                title: 'Erro ao buscar categorias',
                type: 'error'
            });
        }
    }
    
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);
    
  const indexUltimoItem = currentPage * itemsPerPage;
  const indexPrimeiroItem = indexUltimoItem - itemsPerPage;
  const categoriesAtuais = filteredcategories.slice(indexPrimeiroItem, indexUltimoItem)
  
  const createCategories = async () => {
    try {
        if (!informacoes.name.trim()) return;
        setLoadingSave(true);

        await api.post('/categories', {
        name: informacoes.name,
        });

        toaster.create({
        title: 'Categoria criada com sucesso',
        type: 'success'
        });

        await buscarCategories();
        setInformacoes({
        name: '',
        });
        setIsOpen(false);
    } catch (error) {
        toaster.create({
        title: 'Erro ao criar categoria',
        type: 'error'
        });
    } 
    setLoadingSave(false);
    }

  const salvarEdicao = async () => {
    try {
        if (!informacoes.name.trim() || editingIndex === null) return;
        setLoadingSave(true);

        const categoriesEditar = categories[editingIndex];
        await api.patch(`/categories/${categoriesEditar.id}`, {
        name: informacoes.name,
        });

        toaster.create({
        title: 'Categoria editada com sucesso',
        type: 'success'
        });

        await buscarCategories();
        setEditingIndex(null);
        setInformacoes({
        name: '',
        });
        setIsOpen(false);
    } catch (error) {
        toaster.create({
        title: 'Erro ao editar categoria',
        type: 'error'
        });
    } 
    setLoadingSave(false);
    }

  const editarCategories = async (index) => {
    const categoriesEditar = categoriesAtuais[index];
    setInformacoes({
        name: categoriesEditar.name,
    })
    setEditingIndex(categories.indexOf(categoriesEditar));
    setIsOpen(true);
  };

  const deleteCategories = async (index, id) => {
    try {
      if (confirm('Você tem certeza que deseja excluir esta categoria?')) {
        const taskDeletar = categoriesAtuais[index];
        if (categoriesAtuais.length === 1 && currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }

        await api.delete(`/categories/${id}`);

        toaster.create({
          title: 'Categoria excluído com sucesso',
          type: 'sucess'
        });

        setLoadingSave(true);
        await buscarCategories();
      }
    } catch (error) {
      toaster.create({
        title: 'Erro ao excluir categoria',
        type: 'error'
      });
      setLoadingSave(false);
    }
  }
    return (
        <Box p={8}>
            <Heading mb={4}> Categorias </Heading>
            <Flex mb={4} gap={4} align="center">
                <InputPesquisa
                searchTerm={searchTerm}
                SetSeachTerm={setSearchTerm}
                />
                <CategoriesDialog
                informacoes={informacoes}
                setInformacoes={setInformacoes}
                submit={{ createCategories, salvarEdicao }}
                editingIndex={editingIndex}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                loadingSave={loadingSave}
                />
            </Flex>
            <Stack style={{ display: 'flex', alignItems: 'center' }}>
                <TabelaCrud
                items={categoriesAtuais}
                onEdit={editarCategories}
                onDelete={deleteCategories}
                acoes={true}
                headers={[
                    {name: 'ID', value: 'id'},
                    {name: 'Nome', value: 'name'},
                ]}
                />
                <Flex>
                <PaginationTabela
                    items={filteredcategories.length}
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