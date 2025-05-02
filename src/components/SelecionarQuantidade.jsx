"use client"
import { Portal, Select, createListCollection } from "@chakra-ui/react"
import { useState } from "react"

export default function SelectTable({itemsPerPage, setItemsPerPage}) {
  const [value, setValue] = useState('')
  return (
    <Select.Root
      collection={opcoes}
      width="80px"
      size="sm"
      value={value}
      onValueChange={(e) => setItemsPerPage(e.value)}
    >
      <Select.HiddenSelect />
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder={itemsPerPage}/>
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            {opcoes.items.map((opcao) => (
              <Select.Item item={opcao} key={opcao.value}>
                {opcao.label}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  )
}

const opcoes = createListCollection({
  items: [
    { label: "5 item", value: 5 },
    { label: "10 item", value: 10 },
    { label: "15 item", value: 15 },
  ],
})