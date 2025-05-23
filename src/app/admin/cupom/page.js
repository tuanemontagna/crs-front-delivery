'use client';
import InputPesquisa from "@/components/admin/InputPesquisa";
import CuponsDialog from "@/components/admin/CuponsDialog.jsx";
import TabelaCrud from "@/components/admin/TabelaCrud";
import PaginationTabela from "@/components/admin/PaginationTabela";
import SelecionarQuantidade from "@/components/admin/SelecionarQuantidade";
import { 
Box,
Heading,
Stack,
Flex
} from "@chakra-ui/react"
import { useState, useEffect } from "react";
import { toaster } from "@/components/ui/toaster"
import api from "@/utils/axios";

export default function Cupom() {
  const [cupons, setCupons] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [editingIndex, setEditingIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);
  const [informacoes, setInformacoes] = useState({
    code: '',
    type: '',
    value: '',
    uses: '',
  });
  
  useEffect(() => {
      buscarCupons();
    }, [])
    
    const filteredCupons = cupons.filter(cupom =>
        cupom.code.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    const buscarCupons = async () => {
        try {
            const response = await api.get('/cupom')
            setCupons(response.data.data);
        } catch (error) {
            toaster.create({
                title: 'Erro ao buscar cupons',
                type: 'error'
            });
        }
    }
    
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);
    
  const indexUltimoItem = currentPage * itemsPerPage;
  const indexPrimeiroItem = indexUltimoItem - itemsPerPage;
  const cuponsAtuais = filteredCupons.slice(indexPrimeiroItem, indexUltimoItem)
  
  const createCupom = async () => {
    try {
        if (!informacoes.code.trim() || !informacoes.type.trim() || !informacoes.value.trim()) return;
        setLoadingSave(true);

        await api.post('/cupom', {
            code: informacoes.code,
            type: informacoes.type,
            value: informacoes.value,
            uses: informacoes.uses,
        });

        toaster.create({
            title: 'Cupom criado com sucesso',
            type: 'success'
        });

        await buscarCupons();
        setInformacoes({
            code: '',
            type: '',
            value: '',
            uses: '',
        });

        setIsOpen(false);

    } catch (error) {
        toaster.create({
            title: 'Erro ao criar cupom',
            type: 'error'
        });
    } 
    setLoadingSave(false);
    }

  const salvarEdicao = async () => {
    try {
        if (!informacoes.code.trim() || editingIndex === null) return;
        setLoadingSave(true);

        const cuponsEditar = cupons[editingIndex];
        await api.patch(`/cupom/${cuponsEditar.id}`, {
            code: informacoes.code,
            type: informacoes.type,
            value: informacoes.value,
            uses: informacoes.uses,
        });

        toaster.create({
        title: 'Cupom editado com sucesso',
        type: 'success'
        });

        await buscarCupons();
        setEditingIndex(null);
        setInformacoes({
            code: '',
            type: '',
            value: '',
            uses: '',
        });
        setIsOpen(false);
    } catch (error) {
        toaster.create({
            title: 'Erro ao editar categoria',
            type: 'error'
        });
    } 
    setLoadingSave(false);
    }

  const editarCupom = async (index) => {
    const cuponsEditar = cuponsAtuais[index];
    setInformacoes({
        code: cuponsEditar.code,
        type: cuponsEditar.type,
        value: cuponsEditar.value,
        uses: cuponsEditar.uses,
    });
    setEditingIndex(cupons.indexOf(cuponsEditar));
    setIsOpen(true);
    };

  const deleteCupom = async (index, id) => {
    try {
        if (confirm('Você tem certeza que deseja excluir este cupom?')) {
        const cupomDeletar = cuponsAtuais[index];
        if (cuponsAtuais.length === 1 && currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }

        await api.delete(`/cupom/${id}`);

        toaster.create({
            title: 'Cupom excluído com sucesso',
            type: 'success' // corrigido typo
        });

        setLoadingSave(true);
        await buscarCupons();
        }
    } catch (error) {
        toaster.create({
        title: 'Erro ao excluir cupom',
        type: 'error'
        });
        setLoadingSave(false);
    }
    }

    return (
        <Box p={8}>
            <Heading mb={4}> Cupons </Heading>
            <Flex mb={4} gap={4} align="center">
                <InputPesquisa
                searchTerm={searchTerm}
                SetSeachTerm={setSearchTerm}
                />
                <CuponsDialog
                informacoes={informacoes}
                setInformacoes={setInformacoes}
                submit={{ createCupom, salvarEdicao }}
                editingIndex={editingIndex}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                loadingSave={loadingSave}
                />
            </Flex>
            <Stack style={{ display: 'flex', alignItems: 'center' }}>
                <TabelaCrud
                items={cuponsAtuais}
                onEdit={editarCupom}
                onDelete={deleteCupom}
                acoes={true}
                headers={[
                    {name: 'ID', value: 'id'},
                    {name: 'Código', value: 'code'},
                    {name: 'Tipo', value: 'type'},
                    {name: 'Valor', value: 'value'},
                    {name: 'Usos Disponíveis', value: 'uses'},
                ]}
                />
                <Flex>
                <PaginationTabela
                    items={filteredCupons.length}
                    itemsPerPage={itemsPerPage}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                /> 
                <SelecionarQuantidade
                    itemsPerPage={itemsPerPage}
                    setItemsPerPage={(quantidade) => {
                    setItemsPerPage(quantidade);
                    setCurrentPage(1);
                    }}
                />
                </Flex>
            </Stack>
        </Box>
    )
}