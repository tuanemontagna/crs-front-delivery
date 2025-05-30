'use client';
import { useState } from 'react';
import { Button, CloseButton, Dialog, Input, Text } from '@chakra-ui/react';
import { toaster } from '@/components/ui/toaster';
import InfoToken from '@/components/InfoToken';

export default function CreateAdressDialog({ onCreate }) {
    const [formData, setFormData] = useState({
        state: '',
        district: '',
        street: '',
        city: '',
        numberForget: '',
        zipCode: '',
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
            const idUser = await InfoToken();
            await onCreate({
                ...formData,
                idUser,
            });

            toaster.create({
                title: 'Endereço criado com sucesso!',
                type: 'success'
            });

            setFormData({
                state: '',
                district: '',
                street: '',
                city: '',
                numberForget: '',
                zipCode: '',
            });
        } catch (error) {
            console.error(error);
            toaster.create({
                title: 'Erro ao criar endereço.',
                type: 'error'
            });
        }
    };

    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <Button
                    bg="#eb722b"
                    color="white"
                    size="md"
                    _hover={{ bg: '#d15e1d' }}
                >
                    Adicionar Endereço
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
                        <Dialog.Title color="#eb722b" fontWeight="semibold" fontSize="xl"> {/* Adjusted title style */}
                            Criar Novo Endereço
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

                    <Dialog.Body display="flex" flexDirection="column" gap={4} p={6}> {/* Consistent padding and gap */}
                        {[
                            { name: 'zipCode', label: 'CEP', placeholder: 'Digite o CEP' },
                            { name: 'street', label: 'Rua', placeholder: 'Digite a rua' },
                            { name: 'numberForget', label: 'Número', placeholder: 'Digite o número' },
                            { name: 'district', label: 'Bairro', placeholder: 'Digite o bairro' },
                            { name: 'city', label: 'Cidade', placeholder: 'Digite a cidade' },
                            { name: 'state', label: 'Estado', placeholder: 'Digite o estado' },
                        ].map((field) => (
                            <div key={field.name}>
                                <Text color="gray.700" fontWeight="medium" mb={1.5}> {/* Label styling */}
                                    {field.label}
                                </Text>
                                <Input
                                    name={field.name}
                                    value={formData[field.name]}
                                    onChange={handleChange}
                                    focusBorderColor="#eb722b"
                                    borderColor="gray.300"
                                    color="gray.800"
                                    placeholder={field.placeholder}
                                    size="md"
                                    borderRadius="md" // Consistent border radius for inputs
                                />
                            </div>
                        ))}
                    </Dialog.Body>

                    <Dialog.Footer 
                        display="flex" 
                        gap={3} 
                        p={4} 
                        borderTop="1px solid" 
                        borderColor="gray.100" // Softer border top
                    >
                        <Button // Changed from Dialog.ActionTrigger for direct styling control
                            variant="outline"
                            borderColor="gray.300"
                            color="gray.700"
                            _hover={{ bg: 'gray.100' }}
                            size="md"
                            onClick={() => {
                                const closeButton = document.querySelector('[id^="dialog-"][id$="-close-trigger"]');
                                if (closeButton) closeButton.click();
                            }}
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
                            Salvar Endereço
                        </Button>
                    </Dialog.Footer>
                </Dialog.Content>
            </Dialog.Positioner>
        </Dialog.Root>
    );
}
