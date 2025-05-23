'use client'
import { useState, useEffect } from "react";
import { Box, Heading, Text, Stack, Container, Button } from "@chakra-ui/react";
import TrocarSenhaDialog from "@/components/profile/TrocarSenhaDialog.jsx";
import EditarDadosDialog from "@/components/profile/EditarDadosDialog.jsx";
import { IoMdArrowRoundBack } from "react-icons/io";
import { toaster } from "@/components/ui/toaster";
import api from "@/utils/axios.js";
import { useRouter } from "next/navigation";
import InfoToken from "@/components/InfoToken.js";

export default function Profile() {
  const router = useRouter();
  const [informacoes, setInformacoes] = useState({
    userName: '',
    cpf: '',
    name: '',
    phone: '',
    email: ''
  });

  const buscarUser = async () => {
    try {
      const idUser = await InfoToken();
      const response = await api.get(`/user/${idUser}`);
      setInformacoes(response.data.data);
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
  }, []);

  return (
    <Box bg="gray.100" minH="100vh" p={4}>
      <Box display="flex" alignItems="center" gap={4} mb={6}>
        <Button
            variant="ghost"
            color="#eb722b"
            _hover={{ bg: 'white' }}
            onClick={() => router.push('/user/cardapio')}
            aria-label="Voltar para o cardápio"
            >
            <IoMdArrowRoundBack />
        </Button>
        <Heading fontSize="2xl" color="#eb722b">
          Olá, {informacoes.name}!
        </Heading>
      </Box>

      <Container
        maxW="sm"
        minH="500px"
        p={6}
        bg="white"
        borderRadius="lg"
        border="2px solid"
        borderColor="#eb722b"
        boxShadow="md"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
      >
        <Box>
          <Heading fontSize="2xl" mb={4} color="#eb722b" textAlign="center">
            Dados Pessoais
          </Heading>
          <Stack spacing={3}>
            <Text color="#eb722b"><strong>Nome:</strong> {informacoes.name}</Text>
            <Text color="#eb722b"><strong>Username:</strong> {informacoes.userName}</Text>
            <Text color="#eb722b"><strong>Email:</strong> {informacoes.email}</Text>
            <Text color="#eb722b"><strong>Telefone:</strong> {informacoes.phone}</Text>
            <Text color="#eb722b"><strong>CPF:</strong> {informacoes.cpf}</Text>
          </Stack>
        </Box>

        <Stack direction={{ base: "column", md: "row" }} spacing={4}>
          <EditarDadosDialog
            informacoes={informacoes}
            setInformacoes={setInformacoes}
          />
          <TrocarSenhaDialog
            informacoes={informacoes}
            setInformacoes={setInformacoes}
          />
        </Stack>
      </Container>
    </Box>
  );
}
