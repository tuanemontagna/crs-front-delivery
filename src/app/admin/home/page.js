'use client'
import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Heading,
  HStack,
} from "@chakra-ui/react";
import CategoryCarrossel from "@/components/homePage/CategoryCarrossel.jsx";
import ProductGradeAdmin from "@/components/admin/ProductGradeAdmin.jsx";
import SearchBar from "@/components/homePage/SearchBar.jsx";
import EmptyState from "@/components/homePage/EmptyState.jsx";
import { toaster } from "@/components/ui/toaster";
import AdminMenu from "@/components/admin/AdminMenu.jsx";
import { useRouter } from "next/navigation";
import api from "@/utils/axios.js";

export default function HomePage() {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [user, setUser] = useState(null);
  const router = useRouter();

  const buscarCategories = async () => {
    try {
      const response = await api.get('/categories');
      setCategories(response.data.data);

    } catch (error) {
      console.log(error);
      toaster.create({
        title: 'Erro ao buscar catgeorias',
        type: 'error'
      });
    }
  }

  const buscarProducts = async () => {
  setLoading(true);
  try {
    let response;
    if (selectedCategoryId) {
      response = await api.get(`/product/category/${selectedCategoryId}`, {
        params: search ? { search } : {},
      });
    } else {
      response = await api.get('/product', {
        params: search ? { search } : {},
      });
    }
    setProducts(response.data.data || []);
  } catch (error) {
    console.log(error);
    if (error.response?.status === 404) {
      setProducts([]); 
    } else {
      toaster.create({
        title: 'Erro ao buscar produtos',
        type: 'error'
      });
    }
  } finally {
    setLoading(false);
  }
};

const buscarUser = async () => {
  try {
    //const idUser = await InfoToken();
    const idUser = 2;
    console.log("ID do usuário retornado por InfoToken:", idUser);
    const response = await api.get(`/user/${idUser}`);
    setUser(response.data.data);
    
  } catch (error) {
    console.log(error);
    toaster.create({
      title: 'Erro ao buscar usuário',
      type: 'error'
    });
  }
};

useEffect(() => {
  buscarUser();
  buscarCategories();
}, []);

useEffect(() => {
  buscarProducts();
}, [selectedCategoryId, search]);

 return (
      <Box bg="gray.50" minH="100vh" py={0}>
      <Box w="100%" h={{ base: "80px", md: "100px" }} bg="#eb722b" position="relative" mb={4}>
        <Box position="absolute" top="16px" right="24px">
          <HStack spacing={3}>
            <AdminMenu />
          </HStack>
        </Box>
        <Box display="flex" alignItems="center" justifyContent="center" h="100%">
          <Heading color="white" fontSize={{ base: "2xl", md: "3xl" }}>Painel Administrativo</Heading>
        </Box>
      </Box>

      <Container maxW="container.xl">
        <SearchBar search={search} setSearch={setSearch} />
        {categories.length > 0 && (
          <Box mb={8}>
            <CategoryCarrossel
              categories={categories}
              selectedCategoryId={selectedCategoryId}
              setSelectedCategoryId={setSelectedCategoryId}
            />
          </Box>
        )}
        <ProductGradeAdmin products={products} loading={loading} />
        <EmptyState
          categories={categories}
          products={products}
          loading={loading}
          selectedCategoryId={selectedCategoryId}
        />
      </Container>
    </Box>
)
}
