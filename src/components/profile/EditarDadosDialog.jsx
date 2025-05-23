'use client'
import { useState } from "react";
import { Button, CloseButton, Dialog, Input, Text } from "@chakra-ui/react"
import api from "@/utils/axios";
import { toaster } from "@/components/ui/toaster";

export default function EditarDadosDialog({ informacoes, setInformacoes }) {
    const [formData, setFormData] = useState({
        name: informacoes.name || '',
        phone: informacoes.phone || '',
        email: informacoes.email || ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSalvar = async () => {
        try {
            const response = await api.patch(`/user/${informacoes.id}`, {
                name: formData.name,
                phone: formData.phone,
                email: formData.email
            });

            setInformacoes(response.data.data);

            toaster.create({
                title: "Dados atualizados com sucesso!",
                type: "success"
            });
        } catch (error) {
            console.error(error);
            toaster.create({
                title: "Erro ao atualizar dados.",
                type: "error"
            });
        }
    };

    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    borderColor="#eb722b"
                    color="#eb722b"
                    _hover={{ bg: "#eb722b", color: "white" }}
                >
                    Editar
                </Button>
            </Dialog.Trigger>

            <Dialog.Backdrop />
            <Dialog.Positioner>
                <Dialog.Content bg="white" border="2px solid #eb722b">
                    <Dialog.Header>
                        <Dialog.Title color="#eb722b" fontWeight="bold">
                            Editando Dados Pessoais
                        </Dialog.Title>
                    </Dialog.Header>

                    <Dialog.Body display="flex" flexDirection="column" gap={3}>
                        <Text color="#eb722b" fontWeight="medium">Nome</Text>
                        <Input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            focusBorderColor="#eb722b"
                            placeholder="Digite seu nome"
                        />
                        <Text color="#eb722b" fontWeight="medium">Telefone</Text>
                        <Input
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            focusBorderColor="#eb722b"
                            placeholder="Digite seu telefone"
                        />
                        <Text color="#eb722b" fontWeight="medium">Email</Text>
                        <Input
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            focusBorderColor="#eb722b"
                            placeholder="Digite seu email"
                        />
                    </Dialog.Body>

                    <Dialog.Footer display="flex" gap={2}>
                        <Dialog.ActionTrigger asChild>
                            <Button
                                variant="outline"
                                borderColor="#eb722b"
                                color="#eb722b"
                                _hover={{ bg: "#eb722b", color: "white" }}
                            >
                                Cancelar
                            </Button>
                        </Dialog.ActionTrigger>
                        <Button
                            bg="#eb722b"
                            color="white"
                            _hover={{ bg: "#d15e1d" }}
                            onClick={handleSalvar}
                        >
                            Salvar
                        </Button>
                    </Dialog.Footer>

                    <Dialog.CloseTrigger asChild>
                        <CloseButton size="sm" />
                    </Dialog.CloseTrigger>
                </Dialog.Content>
            </Dialog.Positioner>
        </Dialog.Root>
    );
}
