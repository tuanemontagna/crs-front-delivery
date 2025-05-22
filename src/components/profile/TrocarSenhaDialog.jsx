'use client'
import { useState } from "react";
import { Button, CloseButton, Input, Text, Dialog } from "@chakra-ui/react";
import api from "@/utils/axios";
import { toaster } from "@/components/ui/toaster";

export default function TrocarSenhaDialog({ informacoes }) {
    const [senhaAtual, setSenhaAtual] = useState('');
    const [novaSenha, setNovaSenha] = useState('');

    const handleTrocarSenha = async () => {
        try {
            await api.put(`/user/${informacoes.id}/trocar-senha`, {
                senhaAtual,
                novaSenha
            });

            toaster.create({
                title: "Senha alterada com sucesso!",
                type: "success"
            });
        } catch (error) {
            console.error(error);
            toaster.create({
                title: "Erro ao alterar senha.",
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
                    Trocar Senha
                </Button>
            </Dialog.Trigger>

            <Dialog.Backdrop />
            <Dialog.Positioner>
                <Dialog.Content bg="white" border="2px solid #eb722b">
                    <Dialog.Header>
                        <Dialog.Title color="#eb722b" fontWeight="bold">
                            Troca de Senha
                        </Dialog.Title>
                    </Dialog.Header>

                    <Dialog.Body display="flex" flexDirection="column" gap={3}>
                        <Text color="#eb722b" fontWeight="medium">Senha atual</Text>
                        <Input
                            value={senhaAtual}
                            onChange={(e) => setSenhaAtual(e.target.value)}
                            focusBorderColor="#eb722b"
                            placeholder="Digite sua senha atual"
                            type="password"
                            color="black"
                        />

                        <Text color="#eb722b" fontWeight="medium">Nova senha</Text>
                        <Input
                            value={novaSenha}
                            onChange={(e) => setNovaSenha(e.target.value)}
                            focusBorderColor="#eb722b"
                            placeholder="Digite sua nova senha"
                            type="password"
                            color="black"
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
                            onClick={handleTrocarSenha}
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
