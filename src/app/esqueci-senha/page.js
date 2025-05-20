'use client'
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { toaster } from "@/components/ui/toaster";
import EsqueciSenhaInput from "@/components/EsqueciSenhaInput";
import api from "@/utils/axios";

export default function EsqueciSenha() {
  const [email, setEmail] = useState('');
  const router = useRouter();

  const recuperarSenha = async () => {
      
    try {
        if (!email?.trim()) {
          toaster.create({
            title: 'Preencha o e-mail',
            type: 'error'
          });
          return;
        }
        console.log(email);
        await api.post('/user/esqueci-minha-senha', {
            email: email,
        });

        toaster.create({
            title: 'Email enviado com sucesso!',
            description: 'Verifique sua caixa de entrada.',
            type: 'success'
        });

        setEmail('');
        router.push('/redefinir-senha');

    } catch (error) {
        console.log(error);
        toaster.create({
            title: 'Erro ao enviar e-mail',
            type: 'error'
        });
    }
  }

  return (
    <EsqueciSenhaInput
        email={email}
        setEmail={setEmail}
        recuperarSenha={recuperarSenha}
    />
  );
}