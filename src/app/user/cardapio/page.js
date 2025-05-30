'use client'
import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Heading,
  HStack,
} from "@chakra-ui/react";
import CategoryCarrossel from "@/components/homePage/CategoryCarrossel.jsx"
import ProductGradeLogado from "@/components/homePage/ProductGradeLogado.jsx"
import SearchBar from "@/components/homePage/SearchBar.jsx"
import EmptyState from "@/components/homePage/EmptyState.jsx"
import CartDialog from "@/components/homePage/CartDialog.jsx";
import { toaster } from "@/components/ui/toaster";
import ProfileMenu from "@/components/homePage/ProfileMenu.jsx";
import { useRouter } from "next/navigation";
import InfoToken from "@/components/InfoToken.js";
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
    const idUser = await InfoToken();
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

const atualizarCarrinho = async (novoCarrinho) => {
  try {
    const response = await api.patch(`/user/2`, { cart: novoCarrinho });
    setUser(response.data.data);
  } catch (error) {
    console.log(error);
    toaster.create({
      title: 'Erro ao atualizar carrinho',
      type: 'error'
    });
  }
};

const handleAddToCart = (product) => {
  const cartAtual = user?.cart || [];
  const index = cartAtual.findIndex(item => item.idProduct === product.id);

  let novoCarrinho;
  if (index !== -1) {
    novoCarrinho = cartAtual.map((item, i) =>
      i === index
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  } else {
    novoCarrinho = [
      ...cartAtual,
      {
        idProduct: product.id,
        name: product.name, 
        priceProducts: product.price,
        quantity: 1
      }
    ];
  }
  atualizarCarrinho(novoCarrinho);
  toaster.create({
    title: 'Produto adicionado ao carrinho!',
    type: 'success'
  });
};

const handleClearCart = () => {
    atualizarCarrinho([]);
    toaster.create({
    title: 'Carrinho limpo com sucesso!',
    type: 'success'
  });
};

const handleFinishOrder = () => {
  router.push('/user/order');
};

useEffect(() => {
  buscarUser();
  buscarCategories();
}, []);

useEffect(() => {
  buscarProducts();
}, [selectedCategoryId, search]);

useEffect(() => {
  const initializePage = async () => {
      const isValidToken = await InfoToken();
      if (!isValidToken) {
          toaster.create({ description: 'Session expired. Please login again.', type: 'error' });
          router.push('/login');
          setIsLoadingPage(false);
          return;
      } else {
          console.error("Error getting user ID:", error);
          setPageError("Error identifying user.");
          toaster.create({ description: 'Error identifying user.', type: 'error' });
          setIsLoadingPage(false);
      }
  };
  initializePage();
}, [router]);

 return (
      <Box bg="gray.50" minH="100vh" py={0}>
      <Box w="100%" h={{ base: "80px", md: "100px" }} bg="#eb722b" position="relative" mb={4}>
        <Box position="absolute" top="16px" right="24px">
          <HStack spacing={3}>
            <CartDialog
              cart={user?.cart}
              onClearCart={handleClearCart}
              onFinishOrder={handleFinishOrder}
            />
            <ProfileMenu />
          </HStack>
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
        <ProductGradeLogado products={products} loading={loading} onAddToCart={handleAddToCart} />
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
