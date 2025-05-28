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
                            Editando Endereço
                        </Dialog.Title>
                        <CloseButton 
                            size="sm" 
                            onClick={() => setIsOpen(false)} 
                            position="absolute" 
                            top="1rem" 
                            right="1rem" 
                            color="#eb722b"
                        />
                    </Dialog.Header>

                    <Dialog.Body display="flex" flexDirection="column" gap={3}>
                        {["state", "city", "district", "street", "numberForget", "zipCode"].map((field) => (
                            <div key={field}>
                                <Text color="#eb722b" fontWeight="medium">{field.toUpperCase()}</Text>
                                <Input
                                    name={field}
                                    value={formData[field] || ''}
                                    onChange={handleChange}
                                    focusBorderColor="#eb722b"
                                    borderColor="#eb722b"
                                    color="#eb722b"
                                    placeholder={`Digite ${field}`}
                                    _placeholder={{ color: "#eb722b" }}
                                />
                            </div>
                        ))}
                    </Dialog.Body>

                    <Dialog.Footer display="flex" gap={2}>
                        <Button
                            bg="#eb722b"
                            color="white"
                            _hover={{ bg: "#d15e1d" }}
                            onClick={handleSalvar}
                        >
                            Salvar
                        </Button>
                    </Dialog.Footer>
                </Dialog.Content>
            </Dialog.Positioner>
        </Dialog.Root>
    );
}
