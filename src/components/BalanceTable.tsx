import React from "react";
import { Box, Text } from "ink";
import { colors } from "../theme.js";
import type { TokenBalance } from "../types.js";

function formatUsd(value: number): string {
  if (value >= 1000) return `$${value.toLocaleString("en-US", { maximumFractionDigits: 2 })}`;
  if (value >= 1) return `$${value.toFixed(2)}`;
  if (value >= 0.01) return `$${value.toFixed(4)}`;
  return `$${value.toFixed(6)}`;
}

function formatBalance(value: number): string {
  if (value >= 1000) return value.toLocaleString("en-US", { maximumFractionDigits: 2 });
  if (value >= 1) return value.toFixed(4);
  return value.toFixed(6);
}

function solscanTokenLink(mint: string): string {
  return `https://solscan.io/token/${mint}`;
}

interface BalanceTableProps {
  balances: TokenBalance[];
  maxRows?: number;
}

export function BalanceTable({ balances, maxRows = 10 }: BalanceTableProps) {
  const shown = balances.slice(0, maxRows);

  return (
    <Box flexDirection="column">
      {/* Header */}
      <Box gap={2} marginBottom={1}>
        <Text color={colors.overlay} bold>
          {"Symbol".padEnd(10)}
        </Text>
        <Text color={colors.overlay} bold>
          {"Balance".padStart(14)}
        </Text>
        <Text color={colors.overlay} bold>
          {"USD Value".padStart(12)}
        </Text>
        <Text color={colors.overlay} bold>
          {"Solscan"}
        </Text>
      </Box>

      {shown.map((token, i) => (
        <Box key={i} gap={2}>
          <Text color={colors.yellow} bold>
            {token.symbol.padEnd(10)}
          </Text>
          <Text color={colors.text}>
            {formatBalance(token.balance).padStart(14)}
          </Text>
          <Text color={colors.green}>
            {formatUsd(token.usdValue).padStart(12)}
          </Text>
          {token.mint && (
            <Text color={colors.sky} dimColor>
              {solscanTokenLink(token.mint)}
            </Text>
          )}
        </Box>
      ))}

      {balances.length > maxRows && (
        <Box marginTop={1}>
          <Text color={colors.overlay}>
            ... and {balances.length - maxRows} more tokens
          </Text>
        </Box>
      )}
    </Box>
  );
}
