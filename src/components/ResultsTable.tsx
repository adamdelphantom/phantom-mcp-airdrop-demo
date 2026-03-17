import React from "react";
import { Box, Text } from "ink";
import { colors } from "../theme.js";
import type { AirdropCheckResult } from "../types.js";

interface ResultsTableProps {
  results: AirdropCheckResult[];
}

export function ResultsTable({ results }: ResultsTableProps) {
  return (
    <Box flexDirection="column">
      {/* Header */}
      <Box gap={2} marginBottom={1}>
        <Text color={colors.overlay} bold>
          {"".padEnd(3)}
        </Text>
        <Text color={colors.overlay} bold>
          {"Airdrop".padEnd(16)}
        </Text>
        <Text color={colors.overlay} bold>
          {"Status".padEnd(12)}
        </Text>
        <Text color={colors.overlay} bold>
          Reason
        </Text>
      </Box>

      {results.map((r, i) => {
        let icon: string;
        let statusText: string;
        let statusColor: string;

        if (r.result.alreadyClaimed) {
          icon = "~";
          statusText = "Claimed";
          statusColor = colors.sky;
        } else if (r.result.eligible) {
          icon = "+";
          statusText = "Eligible";
          statusColor = colors.green;
        } else {
          icon = "-";
          statusText = "Not Eligible";
          statusColor = colors.overlay;
        }

        return (
          <Box key={r.airdrop.id} gap={2}>
            <Text color={statusColor} bold>
              {` ${icon} `}
            </Text>
            <Text color={colors.text} bold>
              {`${r.airdrop.symbol} (${r.airdrop.name})`.padEnd(16)}
            </Text>
            <Text color={statusColor}>{statusText.padEnd(12)}</Text>
            <Text color={colors.subtext}>{r.result.reason}</Text>
          </Box>
        );
      })}
    </Box>
  );
}
