import { Input } from "@chakra-ui/react"

export default function InputPesquisa({ searchTerm, SetSeachTerm}) {
  return (
    <Input
      placeholder="Pesquisar tarefas..."
      value={searchTerm}
      onChange={(e) => SetSeachTerm(e.target.value)}
    />
  )
}