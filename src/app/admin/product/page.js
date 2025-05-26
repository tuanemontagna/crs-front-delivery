'use client';
import { useState, useEffect } from "react";
import { Box, Heading, Stack, Flex } from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";
import api from "@/utils/axios";
import InputPesquisa from "@/components/admin/InputPesquisa";
import ProductDialog from "@/components/admin/ProductDialog";
import TabelaCrud from "@/components/admin/TabelaCrud";
import PaginationTabela from "@/components/admin/PaginationTabela";
import SelecionarQuantidade from "@/components/admin/SelecionarQuantidade";

export default function Product() {
  const [product, setProduct] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [editingIndex, setEditingIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);
  const [categories, setCategories] = useState([]);
  const [informacoes, setInformacoes] = useState({
    name: '',
    description: '',
    price: '',
    idCategories: '',
    image: '',
    imageProduct: null
  });

  const buscarProduct = async () => {
    try {
      const response = await api.get('/product');
      setProduct(response.data.data);
    } catch (error) {
      toaster.create({
        title: 'Erro ao buscar produtos',
        type: 'error'
      });
    }
  };

    const buscarCategorias = async () => {
    try {
        const response = await api.get('/categories');
        setCategories(response.data.data);
    } catch (error) {
        toaster.create({
        title: 'Erro ao buscar categorias',
        type: 'error'
        });
    }
    };

  const createProduct = async () => {
    try {
      const { name, description, price, idCategories, imageProduct } = informacoes;
  
      if (!name?.trim() || !description?.trim() || !price?.trim() || !idCategories?.trim()) return;
  
      setLoadingSave(true);
  
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("idCategories", idCategories);
  
      if (imageProduct) {
        formData.append("imageProduct", imageProduct); 
      }
  
      await api.post("/product", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
  
      toaster.create({
        title: "Produto cadastrado com sucesso",
        type: "success",
      });
  
      await buscarProduct();
      resetForm();
    } catch (error) {
        console.log();
      toaster.create({
        title: "Erro ao cadastrar produto",
        type: "error",
      });
    } 
  };
  
  const salvarEdicao = async () => {
    try {
      if (!informacoes.name?.trim() || editingIndex === null) return;
      setLoadingSave(true);
  
      const productEditar = product[editingIndex];
  
      const formData = new FormData();
      formData.append('name', informacoes.name);
      formData.append('description', informacoes.description);
      formData.append('price', informacoes.price);
      formData.append('idCategories', informacoes.idCategories);
      if (informacoes.imageProduct) {
        formData.append("imageProduct", informacoes.imageProduct);
      }
  
      await api.patch(`/product/${productEditar.id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
  
      toaster.create({
        title: 'Produto editado com sucesso',
        type: 'success',
      });
  
      await buscarProduct();
      resetForm();
    } catch (error) {
      console.error(error);
      toaster.create({
        title: 'Erro ao editar produto',
        type: 'error',
      });
    } 
  };
  

  const excluirProduct = async (index, id) => {
    try {
      if (confirm('Você tem certeza que deseja excluir este produto?')) {
        const productDeletar = product[index];
        if (product.length === 1 && currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }

        await api.delete(`/product/${id}`);
        toaster.create({
          title: 'Produto excluído com sucesso',
          type: 'sucess'
        });

        await buscarProduct();
        setLoadingSave(false);
      }
    } catch (error) {
      toaster.create({
        title: 'Erro ao excluir produto',
        type: 'error'
      });
      setLoadingSave(false);
    }
  };

  const editarProduct = async (index) => {
    const productEditar = product[index];
    setInformacoes({
      name: productEditar.name,
      description: productEditar.description,
      price: productEditar.price,
      idCategories: productEditar.idCategories,
      image: productEditar.image,
    });
    setEditingIndex(index);
    setIsOpen(true);
  };

  const resetForm = () => {
    setInformacoes({
      name: '',
      description: '',
      price: '',
      idCategories: '',
      image: '',
      imageProduct: null
    });
    setEditingIndex(null);
    setIsOpen(false);
  };

const produtosComCategoria = product.map(prod => {
  const categoria = categories.find(cat => cat.id === prod.idCategories);
  return {
    ...prod,
    nomeCategoria: categoria ? categoria.name : ''
  };
});

    const filteredProduct = produtosComCategoria.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexUltimoItem = currentPage * itemsPerPage;
    const indexPrimeiroItem = indexUltimoItem - itemsPerPage;
    const productAtuais = filteredProduct.slice(indexPrimeiroItem, indexUltimoItem);
  
useEffect(() => {
    buscarCategorias();
    buscarProduct();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  return (
    <Box p={8}>
      <Heading mb={4}> Produtos </Heading>
      <Flex mb={4} gap={4} align="center">
        <InputPesquisa searchTerm={searchTerm} SetSeachTerm={setSearchTerm} />
        <ProductDialog
            informacoes={informacoes}
            setInformacoes={setInformacoes}
            submit={{ createProduct, salvarEdicao }}
            editingIndex={editingIndex}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            loadingSave={loadingSave}
        />
      </Flex>
      <Stack style={{ display: 'flex', alignItems: 'center' }}>
        <TabelaCrud
          items={productAtuais}
          onEdit={editarProduct}
          onDelete={excluirProduct}
          acoes={true}
          headers={[
            { name: 'ID', value: 'id' },
            { name: 'Nome', value: 'name' },
            { name: 'Descrição', value: 'description' },
            { name: 'Preço', value: 'price' },
            { name: 'Categoria', value: 'nomeCategoria' }
          ]}
        />
        <Flex>
          <PaginationTabela
            items={filteredProduct.length}
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