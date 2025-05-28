'use client'

import { useState, useEffect } from "react";
import { toaster } from "@/components/ui/toaster";
import api from "@/utils/axios.js";
import { useRouter } from "next/navigation";
import InfoToken from "@/components/InfoToken.js";

import AdressCard from "@/components/adress/AdressCard.jsx";
import CreateAdressDialog from "@/components/adress/CreateAdressDialog.jsx";

import { Box, Button, Container, Heading, Stack, Text } from "@chakra-ui/react";
import { IoMdArrowRoundBack } from "react-icons/io";

export default function Adress() {
    const router = useRouter();
    const [enderecos, setEnderecos] = useState([]);

    const buscarAdress = async () => {
        try {
            //const idUser = await InfoToken();
            const idUser = 2;
            const response = await api.get(`/adress`);
            const enderecosUsuario = response.data.data.filter(end => end.idUser === idUser);
            setEnderecos(enderecosUsuario);
        } catch (error) {
            console.log(error);
            toaster.create({
                title: 'Erro ao buscar endereços',
                type: 'error'
            });
        }
    };

    useEffect(() => {
        buscarAdress();
    }, []);

    const createAdress = async (data) => {
        try {
            const idUser = await InfoToken();
            await api.post('/adress', { ...data, idUser });
            toaster.create({
                title: 'Endereço criado com sucesso',
                type: 'success'
            });
            await buscarAdress();
        } catch (error) {
            console.log(error);
            toaster.create({
                title: 'Erro ao cadastrar endereço',
                type: 'error'
            });
        }
    };

    const updateAdress = async (id, data) => {
        try {
            await api.put(`/adress/${id}`, data);
            toaster.create({
                title: 'Endereço atualizado com sucesso',
                type: 'success'
            });
            await buscarAdress();
        } catch (error) {
            console.log(error);
            toaster.create({
                title: 'Erro ao atualizar endereço',
                type: 'error'
            });
        }
    };

    const deleteAdress = async (idAdress) => {
        try {
            await api.delete(`/adress/${idAdress}`);
            toaster.create({
                title: 'Endereço excluído com sucesso!',
                type: 'success'
            });
            buscarAdress();
        } catch (error) {
            console.error(error);
            toaster.create({
                title: 'Erro ao excluir endereço',
                type: 'error'
            });
        }
    };

    return (
        <Box bg="gray.100" minH="100vh" p={4}>
            <Box display="flex" alignItems="center" gap={4} mb={6}>
                <Button
                    variant="ghost"
                    color="#eb722b"
                    _hover={{ bg: 'white' }}
                    onClick={() => router.push('/user/cardapio')}
                >
                    <IoMdArrowRoundBack />
                </Button>
            </Box>

            <Container
                maxW="sm"
                minH="500px"
                p={6}
                bg="white"
                borderRadius="lg"
                border="2px solid"
                borderColor="#eb722b"
                boxShadow="md"
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
            >
                <Box>
                    <Heading fontSize="2xl" mb={4} color="#eb722b" textAlign="center">
                        Endereços Cadastrados
                    </Heading>

                    {enderecos.length > 0 ? (
                        enderecos.map((endereco) => (
                            <AdressCard
                                key={endereco.id}
                                endereco={endereco}
                                onDelete={() => deleteAdress(endereco.id)}
                                onUpdate={updateAdress}
                            />
                        ))
                    ) : (
                        <Text color="gray.500" textAlign="center">
                            Nenhum endereço cadastrado.
                        </Text>
                    )}
                </Box>

                <Stack>
                    <CreateAdressDialog onCreate={createAdress} />
                </Stack>
            </Container>
        </Box>
    );
}
