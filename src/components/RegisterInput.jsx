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
          bg="gray.150"
        >
          <Stack spacing={5}>
            <Heading
              size="lg"
              textAlign="center"
              mb={4}
              color="#3e7671"
              fontWeight="bold"
            >
              Criar Conta
            </Heading>

            <Input
              placeholder="Nome completo"
              value={informacoes.name}
              onChange={(e) => setInformacoes({ ...informacoes, name: e.target.value })}
              size="md"
              color="black"
              focusBorderColor="#3e7671"
            />

            <Input
              placeholder="Nome de usuário"
              value={informacoes.userName}
              onChange={(e) => setInformacoes({ ...informacoes, userName: e.target.value })}
              size="md"
              color="black"
              focusBorderColor="#3e7671"
            />

            <Input
              placeholder="CPF"
              value={informacoes.cpf}
              onChange={(e) => setInformacoes({ ...informacoes, cpf: e.target.value })}
              size="md"
              color="black"
              focusBorderColor="#3e7671"
            />

            <Input
              placeholder="E-mail"
              type="email"
              value={informacoes.email}
              onChange={(e) => setInformacoes({ ...informacoes, email: e.target.value })}
              size="md"
              color="black"
              focusBorderColor="#3e7671"
            />

            <Input
              placeholder="Telefone"
              value={informacoes.phone}
              onChange={(e) => setInformacoes({ ...informacoes, phone: e.target.value })}
              size="md"
              color="black"
              focusBorderColor="#3e7671"
            />

            <PasswordInput
              placeholder="Senha"
              value={informacoes.password}
              onChange={(e) => setInformacoes({ ...informacoes, password: e.target.value })}
              color="black"
              focusBorderColor="#3e7671"
            />

            <Button
              bg="#3e7671"
              color="white"
              size="lg"
              mt={4}
              _hover={{ bg: "#2e5c57", transform: "scale(1.02)" }}
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
