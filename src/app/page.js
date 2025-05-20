'use client'
import { useState, useEffect } from "react";
import { Container, Heading, Spinner } from "@chakra-ui/react";
import CategoryList from "@/components/homePage/CategoryList";
import ProductGrid from "@/components/homePage/ProductGrid";
import axios from "axios";

export default function HomePage() {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("/api/categories");
        setCategories(res.data);
        if (res.data.length > 0) {
          setSelectedCategoryId(res.data[0].id);
        }
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (!selectedCategoryId) return;
    setLoading(true);
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`/api/products?category=${selectedCategoryId}`);
        setProducts(res.data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [selectedCategoryId]);

  return (
    <Container maxW="container.xl" py={6}>
      <Heading mb={4} fontSize="2xl" color="#3e7671">
        Bem-vindo ao Restaurante
      </Heading>

      {/* Mostra spinner enquanto carrega produtos OU categorias */}
      {loading && <Spinner mt={6} color="#3e7671" />}

      {/* Só mostra categorias se houver */}
      {!loading && categories.length > 0 && (
        <CategoryList
          categories={categories}
          selectedCategoryId={selectedCategoryId}
          onSelect={setSelectedCategoryId}
        />
      )}

      {/* Só mostra produtos se houver */}
      {!loading && products.length > 0 && (
        <ProductGrid products={products} />
      )}

      {/* Mensagens só aparecem se não estiver carregando */}
      {!loading && categories.length === 0 && (
        <Heading size="md" color="gray.500" mt={8}>
          Nenhuma categoria cadastrada.
        </Heading>
      )}
      {!loading && categories.length > 0 && products.length === 0 && (
        <Heading size="md" color="gray.500" mt={8}>
          Nenhum produto encontrado.
        </Heading>
      )}
    </Container>
  );
}
