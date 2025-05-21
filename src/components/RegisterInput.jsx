import { Container, Box, Input, Button, Stack, Heading } from "@chakra-ui/react";
import { PasswordInput } from "@/components/ui/password-input";

export default function InputRegister({ informacoes, setInformacoes, cadastrarUser }) {
  return (
    <Box
      minH="100vh"
      width="100vw"
      bg="gray.200"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Container maxW="md">
        <Box
          p={10}
          borderRadius="2xl"
          boxShadow="2xl"
          bg="white"
        >
          <Stack spacing={5}>
            <Heading
              size="lg"
              textAlign="center"
              mb={4}
              color="#eb722b"
              fontWeight="bold"
            >
              Criar Conta
            </Heading>

            <Input
            placeholder="Nome completo"
            value={informacoes.name}
            onChange={(e) => setInformacoes({ ...informacoes, name: e.target.value })}
            size="lg"
            color="black"
            borderColor="#eb722b"
            focusBorderColor="#eb722b"
          />

          <Input
            placeholder="Nome de usuário"
            value={informacoes.userName}
            onChange={(e) => setInformacoes({ ...informacoes, userName: e.target.value })}
            size="lg"
            color="black"
            borderColor="#eb722b"
            focusBorderColor="#eb722b"
          />

          <Input
            placeholder="CPF"
            value={informacoes.cpf}
            onChange={(e) => setInformacoes({ ...informacoes, cpf: e.target.value })}
            size="lg"
            color="black"
            borderColor="#eb722b"
            focusBorderColor="#eb722b"
          />

          <Input
            placeholder="E-mail"
            type="email"
            value={informacoes.email}
            onChange={(e) => setInformacoes({ ...informacoes, email: e.target.value })}
            size="lg"
            color="black"
            borderColor="#eb722b"
            focusBorderColor="#eb722b"
          />

          <Input
            placeholder="Telefone"
            value={informacoes.phone}
            onChange={(e) => setInformacoes({ ...informacoes, phone: e.target.value })}
            size="lg"
            color="black"
            borderColor="#eb722b"
            focusBorderColor="#eb722b"
          />

          <PasswordInput
            placeholder="Senha"
            value={informacoes.password}
            onChange={(e) => setInformacoes({ ...informacoes, password: e.target.value })}
            color="black"
            borderColor="#eb722b"
            focusBorderColor="#eb722b"
            size="lg"
          />

            <Button
              bg="#eb722b"
              color="white"
              size="lg"
              mt={4}
              _hover={{ bg: "#c45c1e", transform: "scale(1.02)" }}
              onClick={cadastrarUser}
            >
              Criar conta
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}