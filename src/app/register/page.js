'use client'
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { toaster } from "@/components/ui/toaster";
import RegisterInput from "@/components/RegisterInput";
import api from "@/utils/axios";

export default function Register() {
    const [informacoes, setInformacoes] = useState({
        userName: '',
        name: '',
        cpf: '',
        role: 'customer',
        email: '',
        password: '',
        phone: '',
    });

    const router = useRouter();

    const cadastrarUser = async () => {
        try {
            if (!informacoes.name?.trim() || !informacoes.cpf?.trim() || !informacoes.email?.trim() || !informacoes.password?.trim()) {
                toaster.create({
                    title: 'Preencha todos os campos',
                    type: 'error'
                });
                return;
            }

            await api.post('/user', { 
                name: informacoes.name,
                cpf: informacoes.cpf,
                userName: informacoes.userName,
                email: informacoes.email,
                password: informacoes.password,
                role: informacoes.role,
                phone: informacoes.phone
             });

            toaster.create({
                title: 'Cadastro realizado com sucesso!',
                type: 'success'
            });

            setInformacoes({
                userName: '',
                name: '',
                cpf: '',
                role: 'customer',
                email: '',
                password: '',
                phone: '',
            });

            router.push('/login');

        } catch (error) {
            console.log(error);
            toaster.create({
                title: 'Erro ao cadastrar usuário',
                type: 'error'
            });
        }
    }

    return (
        <RegisterInput 
            informacoes={informacoes}
            setInformacoes={setInformacoes}
            cadastrarUser={cadastrarUser}
        />
    )
}