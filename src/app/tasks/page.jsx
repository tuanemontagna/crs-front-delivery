'use client';
import {
    Box,
    Heading,
    Flex,
    Input,
    Button,
    Stack,
    Table,
    Pagination,
    ButtonGroup,
    IconButton,
} from "@chakra-ui/react"
import { useState } from "react"
import { MdAdd, MdDelete, MdModeEdit, MdChevronRight, MdChevronLeft } from "react-icons/md";

export default function Tasks() {
    const [tasks, setTasks] = useState([]);
    const [input, setInput] = useState('');
    const [filtro, setFiltro] = useState('');
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [editar, setEdicao] = useState(null);

    const tarefasFiltradas = tasks.filter(task =>
        task.toLowerCase().includes(filtro.toLowerCase())
    );

    const indexUltimoItem = currentPage * itemsPerPage;
    const indexPrimeiroItem = indexUltimoItem - itemsPerPage;
    const tasksAtuais = tarefasFiltradas.slice(indexPrimeiroItem, indexUltimoItem);

    const criarTask = () => {
        if (!input.trim()) return;
        setTasks([...tasks, input]);
        setInput('');
    }

    const excluirTask = (indexNaPagina) => {
        const tarefaParaExcluir = tasksAtuais[indexNaPagina];
        const novasTasks = tasks.filter(task => task !== tarefaParaExcluir);
        setTasks(novasTasks);

        const totalPaginas = Math.ceil(novasTasks.filter(task =>
            task.toLowerCase().includes(filtro.toLowerCase())
        ).length / itemsPerPage);

        if (currentPage > totalPaginas) {
            setCurrentPage(prev => Math.max(prev - 1, 1));
        }
    }

    const salvarTaskEditada = () => {
        if (!input.trim() || editar === null) return;
        const taskEditada = tasks.map((task, i) => i === editar ? input : task);
        setTasks(taskEditada);
        setEdicao(null);
        setInput('');
    }

    const editarTask = (indexNaPagina) => {
        const tarefaSelecionada = tasksAtuais[indexNaPagina];
        const indexGeral = tasks.indexOf(tarefaSelecionada);
        setInput(tarefaSelecionada);
        setEdicao(indexGeral);
    }

    return (
        <Box p={8}>
            <Heading mb={8} textAlign="center">Lista de Tarefas</Heading>
            <Flex mb={4}>
                <Input
                    placeholder="Pesquise uma tarefa"
                    variant="subtle"
                    value={filtro}
                    onChange={(e) => {
                        setFiltro(e.target.value);
                        setCurrentPage(1);
                    }}
                />
            </Flex>
            <Flex mb={4}>
                <Input
                    placeholder="Digite uma tarefa"
                    variant="subtle"
                    mr={2}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            editar === null ? criarTask() : salvarTaskEditada();
                        }
                    }}/>
                <Button
                    onClick={editar === null ? criarTask : salvarTaskEditada}
                    background="green"
                    color="white">
                        <MdAdd />
                </Button>
                </Flex>


            <Stack style={{ display: 'flex', alignItems: 'center' }}>
                <Table.Root width="50%" size="sm" striped>
                    <Table.Header>
                        <Table.Row>
                            <Table.ColumnHeader textAlign="center">Tarefa</Table.ColumnHeader>
                            <Table.ColumnHeader textAlign="center">Ações</Table.ColumnHeader>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {tasksAtuais.map((task, i) => (
                            <Table.Row key={i}>
                                <Table.Cell textAlign="center">{task}</Table.Cell>
                                <Table.Cell textAlign="center">
                                    <Stack direction="row" justify="center">
                                        <Button
                                            background="blue"
                                            color="white"
                                            variant="subtle"
                                            size="xs"
                                            onClick={() => editarTask(i)}>
                                            <MdModeEdit />
                                        </Button>
                                        <Button
                                            background="red"
                                            color="white"
                                            variant="subtle"
                                            size="xs"
                                            onClick={() => excluirTask(i)}>
                                            <MdDelete />
                                        </Button>
                                    </Stack>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table.Root>

                <Pagination.Root
                    count={tarefasFiltradas.length}
                    pageSize={itemsPerPage}
                    defaultPage={1}
                    page={currentPage}
                    onPageChange={(page) => setCurrentPage(page)}>
                    <ButtonGroup variant="ghost" size="sm">
                        <Pagination.PrevTrigger asChild>
                            <IconButton
                                onClick={() => setCurrentPage(currentPage - 1)}
                                isDisabled={currentPage === 1}>
                                <MdChevronLeft />
                            </IconButton>
                        </Pagination.PrevTrigger>

                        <Pagination.Items
                            render={(page) => (
                                <IconButton
                                    key={page.value}
                                    onClick={() => setCurrentPage(page.value)}
                                    variant={currentPage === page.value ? "outline" : "ghost"}>
                                    {page.value}
                                </IconButton>
                            )}
                        />

                        <Pagination.NextTrigger asChild>
                            <IconButton
                                onClick={() => setCurrentPage(currentPage + 1)}
                                isDisabled={indexUltimoItem >= tarefasFiltradas.length}>
                                <MdChevronRight />
                            </IconButton>
                        </Pagination.NextTrigger>
                    </ButtonGroup>
                </Pagination.Root>
            </Stack>
        </Box>
    );
}
