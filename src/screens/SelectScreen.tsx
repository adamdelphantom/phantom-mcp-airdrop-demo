import React from "react";
import { Box, Text } from "ink";
import { colors } from "../theme.js";
import { airdrops } from "../airdrop-data.js";
import type { AirdropDef } from "../types.js";
import { StepBar } from "../components/StepBar.js";
import { MultiSelect } from "../components/MultiSelect.js";
import { Footer } from "../components/Footer.js";

interface SelectScreenProps {
  onNext: (selected: AirdropDef[]) => void;
}

export function SelectScreen({ onNext }: SelectScreenProps) {
  const items = airdrops.map((ad) => ({
    label: `${ad.symbol} (${ad.name})`,
    value: ad.id,
    description: ad.description,
  }));

  function handleSubmit(selectedIds: string[]) {
    const selected = airdrops.filter((ad) => selectedIds.includes(ad.id));
    onNext(selected);
  }

  return (
    <Box flexDirection="column">
      <StepBar step={4} />
      <Box marginBottom={1}>
        <Text color={colors.text} bold>
          Select airdrops to check:
        </Text>
      </Box>
      <Box>
        <MultiSelect items={items} onSubmit={handleSubmit} />
      </Box>
      <Footer hint="Space to toggle, Enter to analyze" />
    </Box>
  );
}
