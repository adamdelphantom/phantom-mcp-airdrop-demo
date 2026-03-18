import React, { useState, useEffect } from "react";
import { Box, Text, useInput } from "ink";
import Spinner from "ink-spinner";
import type { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { getTokenBalances } from "../mcp-client.js";
import { MOCK_BALANCES } from "../mock-data.js";
import type { TokenBalance } from "../types.js";
import { colors } from "../theme.js";
import { StepBar } from "../components/StepBar.js";
import { BalanceTable } from "../components/BalanceTable.js";
import { Footer } from "../components/Footer.js";

interface BalancesScreenProps {
  client: Client | null;
  demoMode: boolean;
  onNext: (balances: TokenBalance[]) => void;
}

export function BalancesScreen({ client, demoMode, onNext }: BalancesScreenProps) {
  const [loading, setLoading] = useState(true);
  const [balances, setBalances] = useState<TokenBalance[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (demoMode) {
      const timer = setTimeout(() => {
        setBalances(MOCK_BALANCES);
        setLoading(false);
      }, 2000);
      return () => clearTimeout(timer);
    }

    if (!client) {
      setError("No MCP client available");
      setLoading(false);
      return;
    }

    getTokenBalances(client)
      .then((bals) => {
        setBalances(bals);
        setLoading(false);
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : String(err));
        setLoading(false);
      });
  }, []);

  useInput((_input, key) => {
    if (key.return && !loading && balances.length > 0) {
      onNext(balances);
    }
  });

  const totalUsd = balances.reduce((sum, b) => sum + b.usdValue, 0);

  return (
    <Box flexDirection="column">
      <StepBar step={3} />

      {loading && (
        <Box gap={1}>
          <Text color={colors.mauve}>
            <Spinner type="dots" />
          </Text>
          <Text color={colors.text}>Fetching token balances...</Text>
        </Box>
      )}

      {error && (
        <Box borderStyle="round" borderColor={colors.red} paddingX={2}>
          <Text color={colors.red}>{error}</Text>
        </Box>
      )}

      {!loading && !error && (
        <Box flexDirection="column">
          <Box gap={2} marginBottom={1}>
            <Text color={colors.text} bold>
              Portfolio
            </Text>
            <Text color={colors.green} bold>
              ${totalUsd.toLocaleString("en-US", { maximumFractionDigits: 2 })}
            </Text>
            <Text color={colors.overlay}>
              ({balances.length} tokens)
            </Text>
          </Box>
          <BalanceTable balances={balances} />
          <Footer hint="Press Enter to select airdrops" />
        </Box>
      )}
    </Box>
  );
}
