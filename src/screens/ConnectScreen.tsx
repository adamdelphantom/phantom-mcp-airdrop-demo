import React, { useState, useEffect } from "react";
import { Box, Text, useInput } from "ink";
import Spinner from "ink-spinner";
import type { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { getWalletAddresses } from "../mcp-client.js";
import { MOCK_ADDRESSES } from "../mock-data.js";
import type { WalletAddress } from "../types.js";
import { colors } from "../theme.js";
import { StepBar } from "../components/StepBar.js";
import { WalletCard } from "../components/WalletCard.js";
import { Footer } from "../components/Footer.js";

interface ConnectScreenProps {
  client: Client | null;
  demoMode: boolean;
  onNext: (addresses: WalletAddress[]) => void;
}

export function ConnectScreen({ client, demoMode, onNext }: ConnectScreenProps) {
  const [loading, setLoading] = useState(true);
  const [addresses, setAddresses] = useState<WalletAddress[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (demoMode) {
      // Simulate connection delay
      const timer = setTimeout(() => {
        setAddresses(MOCK_ADDRESSES);
        setLoading(false);
      }, 1500);
      return () => clearTimeout(timer);
    }

    if (!client) {
      setError("No MCP client available");
      setLoading(false);
      return;
    }

    getWalletAddresses(client)
      .then((addrs) => {
        setAddresses(addrs);
        setLoading(false);
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : String(err));
        setLoading(false);
      });
  }, []);

  useInput((_input, key) => {
    if (key.return && !loading && addresses.length > 0) {
      onNext(addresses);
    }
  });

  return (
    <Box flexDirection="column">
      <StepBar step={2} />

      {loading && (
        <Box gap={1}>
          <Text color={colors.mauve}>
            <Spinner type="dots" />
          </Text>
          <Text color={colors.text}>Connecting to Phantom wallet...</Text>
        </Box>
      )}

      {error && (
        <Box
          flexDirection="column"
          borderStyle="round"
          borderColor={colors.red}
          paddingX={2}
        >
          <Text color={colors.red} bold>
            Connection failed
          </Text>
          <Text color={colors.subtext}>{error}</Text>
        </Box>
      )}

      {!loading && !error && (
        <Box flexDirection="column">
          <Text color={colors.green} bold>
            Wallet connected
          </Text>
          <Box marginTop={1}>
            <WalletCard addresses={addresses} />
          </Box>
          <Footer hint="Press Enter to check balances" />
        </Box>
      )}
    </Box>
  );
}
