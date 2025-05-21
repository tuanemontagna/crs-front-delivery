'use client'
import { Box, Flex, VStack, Image, Heading, Text, useBreakpointValue } from "@chakra-ui/react";
import React from 'react';
import LoginInput from "@/components/LoginInput";
import { Toaster } from "@/components/ui/toaster";
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

  return (
  <Flex w="100vw" h="100vh">
    {/* Lado esquerdo: imagem ocupa 65% da área */}
    <Box
      flex="0 0 65%"
      position="relative"
      minH="100vh"
      minW={0}
      overflow="hidden"
    >
      <Image
        src="/images/delivery.png"
        alt="Logo"
        position="absolute"
        top={0}
        left={0}
        w="100%"
        h="100%"
        objectFit="cover"
      />
    </Box>

    {/* Lado direito: inputs centralizados, sem card */}
    <Box
      flex="0 0 35%"
      bg="#18181b"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <VStack
        spacing={6}
        w="100%"
        maxW="400px"
        px={8}
        textAlign="center"
      >
        <Heading color="white" fontSize={{ base: "2xl", md: "3xl" }}>
          Acesse sua conta
        </Heading>
        <Text color="gray.400" mb={2}>Faça login para continuar</Text>
        <LoginInput mandarDadosdofilho={receberDadosdoFilho} />
      </VStack>
      <Toaster />
    </Box>
  </Flex>
);
}