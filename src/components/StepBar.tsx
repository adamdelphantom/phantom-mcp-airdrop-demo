import React from "react";
import { Box, Text } from "ink";
import { colors } from "../theme.js";

const STEP_LABELS = [
  "Welcome",
  "Connect Wallet",
  "Token Balances",
  "Select Airdrops",
  "Analysis",
  "Summary",
];

interface StepBarProps {
  step: number; // 1-based
}

export function StepBar({ step }: StepBarProps) {
  const total = STEP_LABELS.length;
  const filled = Math.round((step / total) * 20);
  const empty = 20 - filled;
  const bar = "━".repeat(filled) + "░".repeat(empty);

  return (
    <Box marginBottom={1}>
      <Text color={colors.mauve} bold>
        Step {step}/{total}
      </Text>
      <Text color={colors.overlay}> {bar} </Text>
      <Text color={colors.text}>{STEP_LABELS[step - 1]}</Text>
    </Box>
  );
}
