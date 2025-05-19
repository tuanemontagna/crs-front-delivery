'use client'
import { Box, Button, Flex, Heading, Image, Text, VStack } from '@chakra-ui/react'
import React from 'react'

export default function Home() {
  return (
    <Box minH="100vh" bgGradient="linear(to-br, #e0f7f6, #ffffff)" px={6} py={8}>
      <Flex
        align="center"
        justify="center"
        direction="column"
        textAlign="center"
        mt={{ base: 20, md: 32 }}
      >
        <Image
          src="/images/logoDelivery.png"
          alt="Logo"
          w={{ base: '120px', md: '150px' }}
          h={{ base: '120px', md: '150px' }}
          borderRadius="full"
          shadow="md"
          mb={6}
        />

        <Heading
          size={{ base: 'lg', md: '2xl' }}
          color="#3e7671"
          fontWeight="bold"
          mb={4}
        >
          Bem-vindo ao CRS Delivery
        </Heading>

        <Text maxW="600px" fontSize="lg" color="gray.600" mb={8}>
          Faça seus pedidos com facilidade, acompanhe suas entregas e aproveite o melhor da nossa cozinha.
        </Text>

        <VStack spacing={4}>
          <Button
            size="lg"
            colorScheme="teal"
            variant="solid"
            w="200px"
            onClick={() => window.location.href = '/cardapio'}
          >
            Ver Cardápio
          </Button>
          <Button
            size="lg"
            colorScheme="gray"
            variant="outline"
            w="200px"
            onClick={() => window.location.href = '/login'}
          >
            Fazer Login
          </Button>
        </VStack>
      </Flex>
    </Box>
  )
}
