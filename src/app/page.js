'use client'
import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Heading,
  HStack,
} from "@chakra-ui/react";
import CategoryCarrossel from "../components/homePage/CategoryCarrossel.jsx"
import ProductGrade from "../components/homePage/ProductGrade.jsx"
import SearchBar from "../components/homePage/SearchBar.jsx"
import EmptyState from "../components/homePage/EmptyState.jsx"
import { IoCartOutline } from "react-icons/io5";
import { toaster } from "@/components/ui/toaster"
import api from "../utils/axios.js";

export default function HomePage() {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);

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

const handleAddToCart = (product) => {
    setCart(prev => [...prev, product]);
  };


  useEffect(() => {
    buscarCategories();
  }, []);

  useEffect(() => {
  buscarProducts();
}, [selectedCategoryId, search]);

 return (
  <Box bg="gray.50" minH="100vh" py={0}>
    {/* Banner topo */}
    <Box w="100%" h={{ base: "120px", md: "180px" }} bg="#eb722b" position="relative" mb={4}>
      <Box position="absolute" top="16px" right="120px">
        <HStack spacing={3}>
          <Box as="button" bg="white" color="#eb722b" fontWeight="bold" px={4} py={1} borderRadius="full"
            _hover={{ bg: "gray.100" }} onClick={() => window.location.href = '/login'}>
            Entrar
          </Box>
          <Box as="button" bg="#eb722b" color="white" fontWeight="bold" px={4} py={1} borderRadius="full"
            _hover={{ bg: "#c55e21" }} onClick={() => window.location.href = '/register'}>
            Criar Conta
          </Box>
        </HStack>
      </Box>
      <Box position="absolute" top="16px" right="24px">
        <Box position="relative">
          <Box
            as="button"
            bg="white"
            borderRadius="full"
            p={2}
            _hover={{ bg: "gray.100" }}
            cursor="pointer"
          >
            <IoCartOutline size={24} color="#eb722b" />
            {cart.length > 0 && (
              <Box
                position="absolute"
                top="-6px"
                right="-6px"
                bg="#eb722b"
                color="white"
                borderRadius="full"
                fontSize="xs"
                px={2}
                py={0.5}
                minW="20px"
                textAlign="center"
                fontWeight="bold"
              >
                {cart.length}
              </Box>
            )}
          </Box>
        </Box>
      </Box>
      <Box display="flex" alignItems="center" justifyContent="center" h="100%">
        <Heading color="white" fontSize={{ base: "2xl", md: "3xl" }}>CRS Delivery</Heading>
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
      <ProductGrade products={products} loading={loading} onAddToCart={handleAddToCart} />
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
