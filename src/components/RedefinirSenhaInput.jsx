import { Text, Button, Stack, Box, Container, Input } from "@chakra-ui/react";
import { InputGroup } from "@/components/ui/input-group";
import { FaEnvelope } from "react-icons/fa";
import { TbLockPassword } from "react-icons/tb";
import { PiPassword } from "react-icons/pi";
import { Toaster } from "@/components/ui/toaster";
import {
  PasswordInput,
} from "@/components/ui/password-input"

export default function RedefinirSenha({ informacoes, setInformacoes, redefinirSenha }) {
  return (
    <Box
      minH="100vh"
      bg="gray.200"
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={4}
    >
      <Container maxW="sm" bg="gray.150" p={8} borderRadius="xl" boxShadow="2xl">
        <Stack spacing={6}>
          <Text fontSize="2xl" fontWeight="bold" textAlign="center" color="#eb722b">
            Redefinir Senha
          </Text>

          <InputGroup startElement={<FaEnvelope color="#eb722b" />}>
            <Input
              type="email"
              placeholder="Digite seu e-mail"
              value={informacoes.email}
              onChange={(e) => setInformacoes({ ...informacoes, email: e.target.value })}
              color="black"
              focusBorderColor="#eb722b"
            />
          </InputGroup>

          <InputGroup startElement={<PiPassword color="#eb722b" />}>
            <Input
              type="text"
              placeholder="Digite o código"
              value={informacoes.codigo}
              onChange={(e) => setInformacoes({ ...informacoes, codigo: e.target.value })}
              color="black"
              focusBorderColor="#eb722b"
            />
          </InputGroup>

          <InputGroup startElement={<TbLockPassword color="#eb722b" />}>
            <PasswordInput
              type="password"
              placeholder="Digite a nova senha"
              value={informacoes.novaSenha}
              onChange={(e) => setInformacoes({ ...informacoes, novaSenha: e.target.value })}
              color="black"
              focusBorderColor="#eb722b"
            />
          </InputGroup>

          <Button
            bg="#eb722b"
            color="white"
            _hover={{ bg: "#c45c1e" }}
            onClick={redefinirSenha}
          >
            Enviar
          </Button>

          <Text
            textAlign="center"
            fontSize="sm"
            color="#eb722b"
            mt={2}
            cursor="pointer"
            _hover={{ textDecoration: "underline", color: "#c45c1e" }}
            onClick={() => window.location.href = '/login'}
          >
            Voltar para o login
          </Text>
        </Stack>
      </Container>
      <Toaster />
    </Box>
  );
}