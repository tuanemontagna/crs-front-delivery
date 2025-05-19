'use client'
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { toaster } from "@/components/ui/toaster";
import InputRegister from "@/components/InputRegister";
import api from "@/utils/axios";

export default function Register() {
    const [informacoes, setInformacoes] = useState({
        nome: '',
        cpf: '',
        estudante: false,
        email: '',
        password: '',
        idCargo: ''
    });

    const router = useRouter();

    const cadastrarUsuario = async () => {
        try {
            if (!informacoes.nome?.trim() || !informacoes.cpf?.trim() || !informacoes.email?.trim() || !informacoes.password?.trim()) {
                toaster.create({
                    title: 'Preencha todos os campos',
                    type: 'error'
                });
                return;
            }

            await api.post('/usuario', { 
                nome: informacoes.nome,
                cpf: informacoes.cpf,
                estudante: informacoes.estudante,
                email: informacoes.email,
                password: informacoes.password,
                idCargo: informacoes.idCargo
             });

            toaster.create({
                title: 'Cadastro realizado com sucesso!',
                type: 'success'
            });

            setInformacoes({
                nome: '',
                cpf: '',
                estudante: false,
                email: '',
                password: '',
                idCargo: ''
            });

            router.push('/');

        } catch (error) {
            console.log(error);
            toaster.create({
                title: 'Erro ao cadastrar usuário',
                type: 'error'
            });
        }
    }

    return (
        <InputRegister 
            informacoes={informacoes}
            setInformacoes={setInformacoes}
            cadastrarUsuario={cadastrarUsuario}
        />
    )
}