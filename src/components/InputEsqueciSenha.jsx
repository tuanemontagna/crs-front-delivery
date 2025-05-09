import { Container, Box, Input, Button, Stack, Text } from "@chakra-ui/react";

export default function InputEsqueciSenha({ email, setEmail, recuperarSenha }) {
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
            <Text fontWeight="semibold" fontSize="lg" color="black">
              Digite seu e-mail:
            </Text>
            <Input
              placeholder="exemplo@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              color="black"
            />
            <Button
              background="black"
              color="white"
              width="100%"
              onClick={recuperarSenha}
            >
              Enviar
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
