import { Container, Box, Input, Button, Stack, Text} from "@chakra-ui/react";
import { PasswordInput } from "@/components/ui/password-input"

export default function InputRegister({ informacoes, setInformacoes, cadastrarUsuario }) {
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
          <Text fontWeight="medium" color="black">Nome</Text>
            <Input
              placeholder="nome"
              value={informacoes.nome}
              onChange={(e) => setInformacoes({...informacoes, nome: e.target.value})}
              color="black"
            />
            <Text fontWeight="medium" color="black">CPF</Text>
            <Input
              placeholder="cpf"
              value={informacoes.cpf}
              onChange={(e) => setInformacoes({...informacoes, cpf: e.target.value})}
              color="black"
            />
            <Text fontWeight="medium" color="black">Digite seu e-mail</Text>
            <Input
              placeholder="exemplo@informacoes.com"
              value={informacoes.email}
              onChange={(e) => setInformacoes({...informacoes, email: e.target.value})}
              color="black"
            />
            <Text fontWeight="medium" color="black">Estudante?</Text>
            <Input
              placeholder="true/false"
              value={informacoes.estudante}
              onChange={(e) => setInformacoes({...informacoes, estudante: e.target.value})}
              color="black"
            />
            <Text fontWeight="medium" color="black">ID do Cargo</Text>
            <Input
              placeholder="id cargo"
              value={informacoes.idCargo}
              onChange={(e) => setInformacoes({...informacoes, idCargo: e.target.value})}
              color="black"
            />
            <Text fontWeight="medium" color="black">Senha</Text>
            <PasswordInput
              placeholder="senha"
              value={informacoes.password}
              onChange={(e) => setInformacoes({...informacoes, password: e.target.value})}
              color="black"
            />
            <Button
              background="black"
              color="white"
              width="100%"
              onClick={cadastrarUsuario}
            >
              Cadastrar 
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
