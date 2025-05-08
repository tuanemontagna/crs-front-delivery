import { Table, Stack, Button } from "@chakra-ui/react"
import { Tooltip } from "@/components/ui/tooltip"
import { MdMode, MdDelete } from 'react-icons/md'

export default function TabelaCrud({ items, headers, onEdit, onDelete, acoes }) {
  return (
    <Table.Root width="75%" size="sm" striped variant="outline">
      <Table.Header>
        <Table.Row>
          {headers.map((header, i) => (
            <Table.ColumnHeader textAlign="center" key={i}>{header.name}</Table.ColumnHeader>
          ))}
          <Table.ColumnHeader textAlign="center"></Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {items.map((item, index) => (
          <Table.Row key={item.id}>
            {headers.map((header, i) => (
              <Table.Cell key={i} textAlign="center">
                {
                  typeof item[header.value] === 'object'
                    ? Array.isArray(item[header.value])
                      ? item[header.value].map(lugar => `(${lugar.linha},${lugar.coluna})`).join(', ')
                      : JSON.stringify(item[header.value])
                    : item[header.value]
                }
              </Table.Cell>
            ))}
            <Table.Cell textAlign="center">
              {acoes && (
                <Stack direction="row">
                  <Tooltip content="Editar">
                    <Button
                      background="Blue"
                      color="white"
                      variant="subtle"
                      size="xs"
                      onClick={() => onEdit(index)}
                    >
                      <MdMode />
                    </Button>
                  </Tooltip>
                  <Tooltip content="Excluir">
                    <Button
                      background="red"
                      color="white"
                      variant="subtle"
                      size="xs"
                      onClick={() => onDelete(index, item.id)}
                    >
                      <MdDelete />
                    </Button>
                  </Tooltip>
                </Stack>
              )}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  )
}
