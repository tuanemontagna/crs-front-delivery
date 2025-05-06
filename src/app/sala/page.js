'use client';
import InputPesquisa from "@/components/InputPesquisa";
import DialogSala from "@/components/DialogSala";
import TabelaCrud from "@/components/TabelaCrud";
import PaginationTabela from "@/components/PaginationTabela";
import SelecionarQuantidade from "@/components/SelecionarQuantidade";
import { 
Box,
Heading,
Stack,
Flex
} from "@chakra-ui/react"
import { useState, useEffect } from "react";
import { toaster } from "@/components/ui/toaster"
import api from "@/utils/axios";

export default function SalaPage() {
const [tasks, setTasks] = useState([]);
const [input, setInput] = useState('');
const [itemsPerPage, setItemsPerPage] = useState(5);
const [currentPage, setCurrentPage] = useState(1);
const [editingIndex, setEditingIndex] = useState(null);
const [searchTerm, setSearchTerm] = useState('');
const [isOpen, setIsOpen] = useState(false);
const [loadingSave, setLoadingSave] = useState(false);
const [idPadraoLugar, setIdPadraoLugar] = useState('');
const [observacao, setObservacao] = useState('');
const resetarFormulario = () => {
setInput('');
setIdPadraoLugar('');
setObservacao('');
setEditingIndex(null);
};

useEffect(() => {
    buscarSala();
}, [])

const filteredTasks = tasks.filter(task =>
    (task.observacao?.toLowerCase() || '').includes(searchTerm.toLowerCase())
);

const buscarSala = async () => {
    try {
        const response = await api.get('/sala')
        setTasks(response.data.data);
    } catch (error) {
        toaster.create({
            title: 'Erro ao buscar salas',
            type: 'error'
        });
    }
}

useEffect(() => {
    setCurrentPage(1);
}, [searchTerm]);

const indexUltimoItem = currentPage * itemsPerPage;
const indexPrimeiroItem = indexUltimoItem - itemsPerPage;
const tasksAtuais = filteredTasks.slice(indexPrimeiroItem, indexUltimoItem)

const criarTask = async () => {
    try {
        if (!idPadraoLugar.trim() || !observacao.trim()) return;
        setLoadingSave(true);

        await api.post('/sala', {
            idPadraoLugar,
            observacao
        });

        toaster.create({
            title: 'Sala criada com sucesso',
            type: 'sucess'
        });

        await buscarSala();
        resetarFormulario();
        setIsOpen(false);
    } catch (error) {
        toaster.create({
            title: 'Erro ao criar sala',
            type: 'error'
        });
    } 
}

const salvarEdicao = async () => {
    try {
        if (!observacao.trim() || editingIndex === null) return;
        setLoadingSave(true);

        const taskEditar = tasks[editingIndex];
        console.log("ID da Task que será editada:", taskEditar.id);
        await api.patch(`/sala/${taskEditar.id}`, {
        idPadraoLugar,
        observacao
        });

        toaster.create({
        title: 'Sala editado com sucesso',
        type: 'sucess'
        });

        await buscarSala();
        setEditingIndex(null);
        resetarFormulario();
        setIsOpen(false);
    } catch (error) {
        toaster.create({
        title: 'Erro ao editar sala',
        type: 'error'
        });
    } 
}

const editarTask = (index) => {
    const taskEditar = tasksAtuais[index];
    const indexReal = tasks.findIndex(t => t.id === taskEditar.id);
    if (indexReal === -1) return; 
    setIdPadraoLugar(taskEditar.idPadraoLugar);
    setObservacao(taskEditar.observacao);
    setEditingIndex(indexReal); 
    setIsOpen(true);
  };
  

  const excluirTask = async (index, id) => {
    try {
        if (confirm('Você tem certeza que deseja excluir esta sala?')) {
            const taskDeletar = tasksAtuais[index];
            if (tasksAtuais.length === 1 && currentPage > 1) {
                setCurrentPage(currentPage - 1);
            }

            const response = await api.delete(`/sala/${id}`);
            if (response.status === 200) {
                toaster.create({
                    title: 'Sala excluída com sucesso',
                    type: 'sucess'
                });
            }
            setLoadingSave(true);
            await buscarSala();  
        }
    } catch (error) {
        toaster.create({
            title: 'Erro ao excluir sala',
            type: 'error'
        });
        setLoadingSave(false);
    }
};

return (
    <Box p={8}>
        <Heading mb={4}> Salas </Heading>
        <Flex mb={4} gap={4} align="center">
        <InputPesquisa
            searchTerm={searchTerm}
            SetSeachTerm={setSearchTerm}
        />
        <DialogSala
            idPadraoLugar={idPadraoLugar}
            setIdPadraoLugar={setIdPadraoLugar}
            observacao={observacao}
            setObservacao={setObservacao}
            submit={{ criarTask, salvarEdicao }}
            editingIndex={editingIndex}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            loadingSave={loadingSave}
        />
        </Flex>
        <Stack style={{ display: 'flex', alignItems: 'center' }}>
        <TabelaCrud
            items={tasksAtuais}
            onEdit={editarTask}
            onDelete={excluirTask}
            acoes={true}
            headers={[
                {name: 'ID', value: 'id'},
                {name: 'ID Padrão Lugares', value: 'idPadraoLugar'},
                {name: 'Observação', value: 'observacao'},
            ]}
        />
        <Flex>
            <PaginationTabela
            items={filteredTasks.length}
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
