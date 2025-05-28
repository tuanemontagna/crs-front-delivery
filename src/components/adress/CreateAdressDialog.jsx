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
                    variant="outline"
                    size="sm"
                    borderColor="#eb722b"
                    color="#eb722b"
                    _hover={{ bg: '#eb722b', color: 'white' }}
                >
                    Adicionar Endereço
                </Button>
            </Dialog.Trigger>

            <Dialog.Backdrop />
            <Dialog.Positioner>
                <Dialog.Content bg="white" border="2px solid #eb722b">
                    <Dialog.Header>
                        <Dialog.Title color="#eb722b" fontWeight="bold">
                            Criar Endereço
                        </Dialog.Title>
                    </Dialog.Header>

                    <Dialog.Body display="flex" flexDirection="column" gap={3}>
                        {['state', 'city', 'district', 'street', 'numberForget', 'zipCode'].map((field) => (
                            <div key={field}>
                                <Text color="#eb722b" fontWeight="medium">
                                    {field === 'state' && 'Estado'}
                                    {field === 'city' && 'Cidade'}
                                    {field === 'district' && 'Bairro'}
                                    {field === 'street' && 'Rua'}
                                    {field === 'numberForget' && 'Número'}
                                    {field === 'zipCode' && 'CEP'}
                                </Text>
                                <Input
                                    name={field}
                                    value={formData[field]}
                                    onChange={handleChange}
                                    focusBorderColor="#eb722b"
                                    color="#eb722b"
                                    placeholder={`Digite ${field === 'numberForget' ? 'o número' : field}`}
                                />
                            </div>
                        ))}
                    </Dialog.Body>

                    <Dialog.Footer display="flex" gap={2}>
                        <Dialog.ActionTrigger asChild>
                            <Button
                                variant="outline"
                                borderColor="#eb722b"
                                color="#eb722b"
                                _hover={{ bg: '#eb722b', color: 'white' }}
                            >
                                Cancelar
                            </Button>
                        </Dialog.ActionTrigger>
                        <Button
                            bg="#eb722b"
                            color="white"
                            _hover={{ bg: '#d15e1d' }}
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
