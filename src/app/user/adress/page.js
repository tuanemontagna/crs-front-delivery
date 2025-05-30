'use client'
import { useState, useEffect } from "react";
import { toaster } from "@/components/ui/toaster";
import api from "@/utils/axios.js";
import { useRouter } from "next/navigation";
import InfoToken from "@/components/InfoToken.js";
import AdressCard from "@/components/adress/AdressCard.jsx";
import CreateAdressDialog from "@/components/adress/CreateAdressDialog.jsx";
import { Box, Button, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import { IoMdArrowRoundBack } from "react-icons/io";

export default function Adress() {
    const router = useRouter();
    const [enderecos, setEnderecos] = useState([]);

    const buscarAdress = async () => {
        try {
            const idUser = await InfoToken();
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

    useEffect(() => {
        const initializePage = async () => {
            const isValidToken = await InfoToken();
            if (!isValidToken) {
                toaster.create({ description: 'Session expired. Please login again.', type: 'error' });
                router.push('/login');
                setIsLoadingPage(false);
                return;
            } else {
                console.error("Error getting user ID:", error);
                setPageError("Error identifying user.");
                toaster.create({ description: 'Error identifying user.', type: 'error' });
                setIsLoadingPage(false);
            }
        };
        initializePage();
    }, [router]);

    return (
            <Box bg="gray.50" minH="100vh" py={8} px={{ base: 4, md: 8 }}>
            <Stack spacing={8} maxW="container.xl" mx="auto">
                <Flex alignItems="center" justifyContent="space-between" mb={4} px={0}>
                    <Button
                        variant="ghost"
                        color="gray.300"
                        _hover={{ bg: 'orange.50' }}
                        onClick={() => router.push('/user/cardapio')}
                        leftIcon={<IoMdArrowRoundBack size="1.5em" />}
                        size="md"
                    >
                        Voltar
                    </Button>
                    <Heading fontSize={{ base: "xl", md: "2xl" }} color="gray.700" textAlign="center" flexGrow={1} mx={2}>
                        Meus Endereços
                    </Heading>
                    <CreateAdressDialog onCreate={createAdress} />
                </Flex>

                {enderecos.length > 0 ? (
                    <Box display="grid" gridTemplateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
                        {enderecos.map((endereco) => (
                            <AdressCard
                                key={endereco.id}
                                endereco={endereco}
                                onDelete={() => deleteAdress(endereco.id)}
                                onUpdate={updateAdress}
                            />
                        ))}
                    </Box>
                ) : (
                    <Text color="gray.600" textAlign="center" py={16} fontSize="lg">
                        Nenhum endereço cadastrado ainda.
                    </Text>
                )}
            </Stack>
        </Box>
    );
}
