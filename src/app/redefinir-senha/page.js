'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toaster } from "@/components/ui/toaster";
import api from "@/utils/axios";
import InputRedefinirSenha from "@/components/InputRedefinirSenha";

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
      await api.post('/usuario/redefinir-senha', {
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
      router.push('/');

    } catch (error) {
      toaster.create({
        title: 'Erro ao redefinir senha',
        type: 'error'
      });
    }
  };

  return (
    <InputRedefinirSenha
      informacoes={informacoes}
      setInformacoes={setInformacoes}
      redefinirSenha={redefinirSenha}
    />
  );
}
