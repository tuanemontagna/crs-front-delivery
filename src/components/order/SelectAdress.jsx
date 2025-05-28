import { Portal } from "@chakra-ui/react";
import { Select, createListCollection } from "@chakra-ui/react";

export default function SelectAdress({
  label,
  placeholder,
  items = [],
  value,
  onChange,
  width = "100%",
  size = "md",
}) {
  const collection = createListCollection({
    items: items.map((item) => ({
      label: item.label,
      value: item.value,
    })),
  });

  const handleChange = (details) => {
    onChange && onChange(details.value.length > 0 ? details.value[0] : "");
  };

  return (
    <Select.Root
      collection={collection}
      selectedValue={value}
      onValueChange={handleChange}
      size={size}
      width={width}
      borderColor="#eb722b"
      color="#eb722b"
    >
      <Select.HiddenSelect />
      {label && <Select.Label>{label}</Select.Label>}
      <Select.Control borderColor="#eb722b">
        <Select.Trigger>
          <Select.ValueText placeholder={placeholder} />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            {collection.items.map((item) => (
              <Select.Item item={item} key={item.value}>
                {item.label}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  );
}