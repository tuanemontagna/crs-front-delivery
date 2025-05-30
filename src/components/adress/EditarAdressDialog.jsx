'use client'
import { useState } from "react";
import { Button, CloseButton, Dialog, Input, Text } from "@chakra-ui/react"
import { toaster } from "@/components/ui/toaster";

export default function EditarAdressDialog({ endereco, onUpdate }) {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({ ...endereco });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSalvar = async () => {
        try {
            await onUpdate(endereco.id, formData);
            toaster.create({
                title: "Endereço atualizado com sucesso!",
                type: "success"
            });
            setIsOpen(false);
        } catch (error) {
            console.error(error);
            toaster.create({
                title: "Erro ao atualizar endereço.",
                type: "error"
            });
        }
    };

    return (
        <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
            <Dialog.Trigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    borderColor="#eb722b"
                    color="#eb722b"
                    _hover={{ bg: "orange.50", color: "#d15e1d", borderColor: "#d15e1d" }}
                >
                    Editar
                </Button>
            </Dialog.Trigger>

            <Dialog.Backdrop />
            <Dialog.Positioner>
                <Dialog.Content
                    bg="white"
                    border="1px solid"
                    borderColor="gray.200"
                    borderRadius="xl"
                    boxShadow="lg"
                    maxW="md"
                    width="90%"
                >
                    <Dialog.Header>
                        <Dialog.Title color="#eb722b" fontWeight="semibold" fontSize="xl">
                            Editar Endereço
                        </Dialog.Title>
                        <Dialog.CloseTrigger asChild>
                            <CloseButton
                                size="md"
                                position="absolute"
                                right="12px"
                                top="12px"
                                borderRadius="md"
                                _hover={{ bg: "gray.100" }}
                            />
                        </Dialog.CloseTrigger>
                    </Dialog.Header>

                    <Dialog.Body display="flex" flexDirection="column" gap={4} p={6}>
                        {[
                            { name: 'zipCode', label: 'CEP' },
                            { name: 'street', label: 'Rua' },
                            { name: 'numberForget', label: 'Número' },
                            { name: 'district', label: 'Bairro' },
                            { name: 'city', label: 'Cidade' },
                            { name: 'state', label: 'Estado' },
                        ].map((field) => (
                            <div key={field.name}>
                                <Text color="gray.700" fontWeight="medium" mb={1.5}>
                                    {field.label}
                                </Text>
                                <Input
                                    name={field.name}
                                    value={formData[field.name] || ''}
                                    onChange={handleChange}
                                    focusBorderColor="#eb722b"
                                    borderColor="gray.300"
                                    color="gray.800"
                                    placeholder={`Digite ${field.label.toLowerCase()}`}
                                    size="md"
                                    borderRadius="md"
                                />
                            </div>
                        ))}
                    </Dialog.Body>

                    <Dialog.Footer
                        display="flex"
                        gap={3}
                        p={4}
                        borderTop="1px solid"
                        borderColor="gray.100"
                    >
                        <Button
                            variant="outline"
                            borderColor="gray.300"
                            color="gray.700"
                            _hover={{ bg: 'gray.100' }}
                            size="md"
                            onClick={() => setIsOpen(false)}
                        >
                            Cancelar
                        </Button>
                        <Button
                            bg="#eb722b"
                            color="white"
                            _hover={{ bg: '#d15e1d' }}
                            onClick={handleSalvar}
                            size="md"
                        >
                            Salvar Alterações
                        </Button>
                    </Dialog.Footer>
                </Dialog.Content>
            </Dialog.Positioner>
        </Dialog.Root>
    );
}
