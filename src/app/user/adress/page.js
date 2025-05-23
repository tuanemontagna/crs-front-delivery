// 'use client'
// import { useState, useEffect } from "react";
// import { toaster } from "@/components/ui/toaster";
// import api from "@/utils/axios.js";
// import { useRouter } from "next/navigation";
// import InfoToken from "@/components/InfoToken.js";
// import AdressCard from "@/components/adress/AdressCard.jsx";
// import EditarAdressDialog from "@/components/adress/EditarAdressDialog.jsx";
// import CreateAdressDialog from "@/components/adress/CreateAdressDialog.jsx";

// import { Box, Button, Container, Heading, Stack, Text } from "@chakra-ui/react";
// import { IoMdArrowRoundBack } from "react-icons/io";

// export default function Adress() {
//     const router = useRouter();
//     const [enderecoSelecionado, setEnderecoSelecionado] = useState(null);
//     const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
//     const [informacoes, setInformacoes] = useState({ adresses: [] });

//     useEffect(() => {
//         buscarAdress();
//     }, []);

//     const buscarAdress = async () => {
//         try {
//             const idUser = await InfoToken();
//             const response = await api.get(`/user/${idUser}`);
//             setInformacoes(response.data.data);
//         } catch (error) {
//             console.log(error);
//             toaster.create({
//                 title: 'Erro ao buscar endereços',
//                 type: 'error'
//             });
//         }
//     };

//     const createAdress = async (data) => {
//         try {
//             const idUser = await InfoToken();
//             await api.post('/adress', { ...data, idUser });
//             toaster.create({
//                 title: 'Endereço criado com sucesso',
//                 type: 'success'
//             });
//             await buscarAdress();
//         } catch (error) {
//             console.log(error);
//             toaster.create({
//                 title: 'Erro ao cadastrar endereço',
//                 type: 'error'
//             });
//         }
//     };

//     const updateAdress = async (id, data) => {
//         try {
//             await api.put(`/adress/${id}`, data);
//             toaster.create({
//                 title: 'Endereço atualizado com sucesso',
//                 type: 'success'
//             });
//             await buscarAdress();
//         } catch (error) {
//             console.log(error);
//             toaster.create({
//                 title: 'Erro ao atualizar endereço',
//                 type: 'error'
//             });
//         }
//     };

//     const deleteAdress = async (idAdress) => {
//         try {
//             await api.delete(`/user/adress/${idAdress}`);
//             toaster.create({
//                 title: 'Endereço excluído com sucesso!',
//                 type: 'success'
//             });
//             buscarAdress();
//         } catch (error) {
//             console.error(error);
//             toaster.create({
//                 title: 'Erro ao excluir endereço',
//                 type: 'error'
//             });
//         }
//     };

//     const abrirDialogParaEdicao = (endereco) => setEnderecoSelecionado(endereco);
//     const abrirDialogParaCriacao = () => setEnderecoSelecionado(null);
//     const fecharDialog = () => setEnderecoSelecionado(null);

//     return (
//         <Box bg="gray.100" minH="100vh" p={4}>
//             <Box display="flex" alignItems="center" gap={4} mb={6}>
//                 <Button
//                     variant="ghost"
//                     color="#eb722b"
//                     _hover={{ bg: 'white' }}
//                     onClick={() => router.push('/user/cardapio')}
//                     aria-label="Voltar para o cardápio"
//                 >
//                     <IoMdArrowRoundBack />
//                 </Button>
//             </Box>

//             <Container
//                 maxW="sm"
//                 minH="500px"
//                 p={6}
//                 bg="white"
//                 borderRadius="lg"
//                 border="2px solid"
//                 borderColor="#eb722b"
//                 boxShadow="md"
//                 display="flex"
//                 flexDirection="column"
//                 justifyContent="space-between"
//             >
//                 <Box>
//                     <Heading fontSize="2xl" mb={4} color="#eb722b" textAlign="center">
//                         Endereços Cadastrados 
//                     </Heading>

//                     {Array.isArray(informacoes.adresses) && informacoes.adresses.length > 0 ? (
//                         informacoes.adresses.map((endereco) => (
//                             <AdressCard
//                                 key={endereco.id}
//                                 endereco={endereco}
//                                 onEdit={() => abrirDialogParaEdicao(endereco)}
//                                 onDelete={() => deleteAdress(endereco.id)}
//                             />
//                         ))
//                     ) : (
//                         <Text color="gray.500" textAlign="center">Nenhum endereço cadastrado.</Text>
//                     )}
//                 </Box>

//                 <Stack direction={{ base: "column", md: "row" }} spacing={4} mt={8}>
//                     <Button
//                         colorScheme="orange"
//                         onClick={() => setIsCreateDialogOpen(true)}
//                     >
//                         Adicionar Novo Endereço
//                     </Button>
//                 </Stack>
//             </Container>

//             <CreateAdressDialog
//                 isOpen={isCreateDialogOpen}
//                 onClose={() => setIsCreateDialogOpen(false)}
//                 onSave={async (data) => {
//                     await createAdress(data);
//                 }}
//             />

//             {(
//                 <EditarAdressDialog
//                     isOpen={enderecoSelecionado !== null}
//                     onClose={fecharDialog}
//                     endereco={enderecoSelecionado}
//                     onSave={async (data) => {
//                         if (enderecoSelecionado) {
//                             await updateAdress(enderecoSelecionado.id, data);
//                         }
//                         fecharDialog();
//                     }}
//                 />
//             )}
//         </Box>
//     );
// }
