import { Text, Button, Stack, Box, Container } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { InputGroup } from "@/components/ui/input-group"
import { FaEnvelope } from "react-icons/fa";
import { TbLockPassword } from "react-icons/tb";
import { Toaster } from "@/components/ui/toaster"

export default function EsqueciSenha({email, setEmail, recuperarSenha}) {
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
          <Text fontSize="2xl" fontWeight="bold" textAlign="center" color="#3e7671">
            Recuperar Senha
          </Text>
          <InputGroup startElement={<FaEnvelope color="#3e7671" />}>
        <Input
            type="email"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            color="black"
            />
          </InputGroup>
          <Button
            bg="#3e7671"
            color="white"
            _hover={{ bg: "#2c5c57" }}
            onClick={recuperarSenha}
          >
            Enviar
          </Button>
          <Text
            textAlign="center"
            fontSize="sm"
            color="gray.600"
            mt={2}
            cursor="pointer"
            _hover={{ textDecoration: "underline" }}
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