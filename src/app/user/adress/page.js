'use client'
import { useState, useEffect } from "react";
import { toaster } from "@/components/ui/toaster";
import api from "@/utils/axios.js";
import { useRouter } from "next/navigation";

export default function Adress() {
    const router = useRouter();
    const [informacoes, setInformacoes] = useState({
      zipCode: '',
      state: '',
      city: '',
      street: '',
      district: '',
      numberForget: '',
      idUser: ''
    });

    const buscarAdress = async () => {
        try {
            const response = await api.get(`/user/1`);
            setInformacoes(response.data.data);
        } catch (error) {
            console.log(error);
            toaster.create({
                title: 'Erro ao buscar endereços',
                type: 'error'
            });
        }
    };

    useEffect(() => {
        buscarAdress();
    }, []);

    return (

    )
}