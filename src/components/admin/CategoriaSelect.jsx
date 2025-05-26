"use client"

import { Portal, Select, createListCollection } from "@chakra-ui/react"

export default function CategoriaSelect({ categorias = [], value, onChange }) {
  const categoriasCollection = createListCollection({
    items: categorias.map(cat => ({
      label: cat.name,
      value: String(cat.id), 
    })),
  });

  return (
    <Select.Root
      collection={categoriasCollection}
      value={value ? String(value) : ""}
      onChange={details => onChange(details.value)}
      size="sm"
      width="320px"
    >
      <Select.HiddenSelect />
      <Select.Label>Selecione a categoria</Select.Label>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Selecione a categoria" />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            {categoriasCollection.items.map((cat) => (
              <Select.Item item={cat} key={cat.value}>
                {cat.label}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  );
}