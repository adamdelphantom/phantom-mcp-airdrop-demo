import React, { useState } from "react";
import { Box, Text, useInput } from "ink";
import { colors } from "../theme.js";

interface MultiSelectItem {
  label: string;
  value: string;
  description?: string;
}

interface MultiSelectProps {
  items: MultiSelectItem[];
  onSubmit: (selectedValues: string[]) => void;
}

export function MultiSelect({ items, onSubmit }: MultiSelectProps) {
  const [cursor, setCursor] = useState(0);
  const [selected, setSelected] = useState<Set<number>>(
    new Set(items.map((_, i) => i))
  );

  useInput((input, key) => {
    if (key.upArrow) {
      setCursor((c) => Math.max(0, c - 1));
    } else if (key.downArrow) {
      setCursor((c) => Math.min(items.length - 1, c + 1));
    } else if (input === " ") {
      setSelected((prev) => {
        const next = new Set(prev);
        if (next.has(cursor)) {
          next.delete(cursor);
        } else {
          next.add(cursor);
        }
        return next;
      });
    } else if (key.return) {
      const values = items
        .filter((_, i) => selected.has(i))
        .map((item) => item.value);
      onSubmit(values);
    }
  });

  return (
    <Box flexDirection="column">
      {items.map((item, i) => {
        const isSelected = selected.has(i);
        const isCursor = i === cursor;
        const checkbox = isSelected ? "[x]" : "[ ]";

        return (
          <Box key={item.value} gap={1}>
            <Text
              color={isCursor ? colors.mauve : colors.overlay}
              bold={isCursor}
            >
              {isCursor ? ">" : " "}
            </Text>
            <Text color={isSelected ? colors.green : colors.overlay}>
              {checkbox}
            </Text>
            <Text
              color={isCursor ? colors.text : colors.subtext}
              bold={isCursor}
            >
              {item.label}
            </Text>
            {item.description && (
              <Text color={colors.overlay} dimColor>
                {item.description}
              </Text>
            )}
          </Box>
        );
      })}
    </Box>
  );
}
