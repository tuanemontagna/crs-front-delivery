import { Container, Box, Input, Button, Stack, Text } from "@chakra-ui/react";
import { PasswordInput } from "@/components/ui/password-input"

export default function InputEsqueciSenha({ informacoes, setInformacoes, redefinirSenha }) {
  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="gray.50"
      p={4}
    >
      <Container maxW="lg" p={4}>
        <Box
          p={8}
          borderRadius="lg"
          boxShadow="lg"
          border="1px solid #ddd"
          bg="white"
        >
          <Stack spacing={6}>
            <Text fontWeight="medium" color="black">Digite seu e-mail</Text>
            <Input
              placeholder="exemplo@informacoes.com"
              value={informacoes.email}
              onChange={(e) => setInformacoes({...informacoes, email: e.target.value})}
              color="black"
            />
            <Text fontWeight="medium" color="black">Código</Text>
            <Input
              placeholder="código"
              value={informacoes.codigo}
              onChange={(e) => setInformacoes({...informacoes, codigo: e.target.value})}
              color="black"
            />
            <Text fontWeight="medium" color="black">Informe a nova senha</Text>
            <PasswordInput
              placeholder="senha"
              value={informacoes.novaSenha}
              onChange={(e) => setInformacoes({...informacoes, novaSenha: e.target.value})}
              color="black"
            />
            <Button
              background="black"
              color="white"
              width="100%"
              onClick={redefinirSenha}
            >
              Redefinir Senha
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
