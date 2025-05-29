'use client'
import { useState } from 'react';
import {
  Box,
  Container,
  Heading,
  Input,
  SimpleGrid,
  Button,
  Icon,
} from "@chakra-ui/react";
import { IoIosSearch } from "react-icons/io";
import { useRouter } from 'next/navigation';
import { FiUser, FiShield, FiBell, FiCreditCard, FiBox, FiTool, FiFileText, FiHelpCircle } from 'react-icons/fi';

export default function ConfiguracoesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const settingsOptions = [
    { label: "Usuários", icon: FiUser, path: "/admin/user" },
    { label: "Pedidos", icon: FiShield, path: "/admin/order" }, //falta
    { label: "Histórico de Pedidos", icon: FiBell, path: "/admin/order-product" }, //falta
    { label: "Pagamentos", icon: FiCreditCard, path: "/admin/payment" },
    { label: "Produtos", icon: FiBox, path: "/admin/product" },
    { label: "Categorias", icon: FiTool, path: "/admin/categories" },
    { label: "Cupons", icon: FiFileText, path: "/admin/cupom" },
    { label: "Endereços", icon: FiHelpCircle, path: "/admin/adress" },
  ];

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleNavigation = (path) => {
    router.push(path);
  };

  const filteredOptions = settingsOptions.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box bg="gray.50" minH="100vh" py={8}>
      <Container maxW="container.xl">
        <Heading as="h1" size="xl" mb={6} color="#eb722b">
          Configurações
        </Heading>

        <Box mb={8} position="relative"> 
          <Box
            position="absolute"
            left="0.75rem" 
            top="50%"
            transform="translateY(-50%)"
            zIndex={2} 
            pointerEvents="none" 
            color="#eb722b"
          >
            <IoIosSearch color="#eb722b" size="1.25em" /> 
          </Box>
          <Input
            type="text"
            placeholder="Pesquisar configurações..."
            value={searchTerm}
            onChange={handleSearchChange}
            borderColor="#eb722b"
            focusBorderColor="#eb722b"
            _hover={{ borderColor: "#cf5f1f" }}
            size="lg"
            borderRadius="md"
            pl="2.5rem"
          />
        </Box>

        <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={6}>
          {settingsOptions.map((option) => (
            <Button
              key={option.label}
              leftIcon={<Icon as={option.icon} w={6} h={6} />}
              size="lg"
              height="100px" 
              variant="outline"
              borderColor="#eb722b"
              color="#eb722b"
              _hover={{ bg: "#eb722b", color: "white" }}
              onClick={() => handleNavigation(option.path)}
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              textAlign="center"
              whiteSpace="normal" 
              p={4}
            >
              <Box as="span" mt={2}>{option.label}</Box>
            </Button>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}