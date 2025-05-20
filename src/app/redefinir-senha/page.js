'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toaster } from "@/components/ui/toaster";
import api from "@/utils/axios";
import RedefinirSenhaInput from "@/components/RedefinirSenhaInput";

export default function RedefinirSenha() {
  const [informacoes, setInformacoes] = useState({
    email: '',
    codigo: '',
    novaSenha: '',
  });

  const router = useRouter();

  const redefinirSenha = async () => {
    const { email, codigo, novaSenha } = informacoes;
    if (!email?.trim() || !codigo?.trim() || !novaSenha?.trim()) {
      toaster.create({
        title: 'Preencha todos os campos',
        type: 'error'
      });
      return;
    }

    try {
      await api.post('/user/redefinir-senha', {
        email,
        codigo,
        novaSenha,
      });

      toaster.create({
        title: 'Senha redefinida com sucesso!',
        type: 'success'
      });

      setInformacoes({ 
        email: '', 
        codigo: '', 
        novaSenha: '' 
    });
      router.push('/login');

    } catch (error) {
      toaster.create({
        title: 'Erro ao redefinir senha',
        type: 'error'
      });
    }
  };

  return (
    <RedefinirSenhaInput
      informacoes={informacoes}
      setInformacoes={setInformacoes}
      redefinirSenha={redefinirSenha}
    />
  );
}