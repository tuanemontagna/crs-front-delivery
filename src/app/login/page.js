'use client'
import { Box, VStack, Image, Heading, Text, useBreakpointValue } from "@chakra-ui/react";
import React from 'react';
import LoginInput from "@/components/LoginInput";
import { Toaster, toaster } from "@/components/ui/toaster";
import axios from "@/utils/axios";
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();

  const loginUsuario = async (content) => {
    try {
      const response = await axios.post(`/user/login`, { ...content });
      if (response.status === 200) {
        toaster.create({
          description: "Login realizado com sucesso! Redirecionando...",
          type: "success",
        });
        localStorage.setItem('token', response.data.response);
        router.push('/cargo');
      } else {
        toaster.create({
          description: "Erro ao fazer login!",
          type: "error",
        });
      }
    } catch (error) {
      toaster.create({
        description: "Erro ao conectar com o servidor!",
        type: "error",
      });
    }
  };

  const receberDadosdoFilho = async (content) => {
    await loginUsuario(content);
  };

  const logoSize = useBreakpointValue({ base: "150px", md: "180px" });

  return (
    <Box
      w="100vw"
      h="100vh"
      bg="gray.900"
      display="flex"
      justifyContent="center"
      alignItems="center"
      px={4}
    >
      <VStack spacing={6} w="100%" maxW="400px" textAlign="center">
        <Image
          src="/images/logoDelivery.png"
          w={logoSize}
          h={logoSize}
          borderRadius="full"
          objectFit="cover"
          boxShadow="lg"
        />
        <Heading color="white" fontSize={{ base: "2xl", md: "3xl" }}>
          Bem-Vindo!
        </Heading>
        <Text color="gray.300">Acesse sua conta para continuar</Text>
        <LoginInput mandarDadosdofilho={receberDadosdoFilho} />
      </VStack>
      <Toaster />
    </Box>
  );
}
