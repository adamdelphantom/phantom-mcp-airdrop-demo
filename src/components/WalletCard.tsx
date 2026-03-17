import React from "react";
import { Box, Text } from "ink";
import { colors } from "../theme.js";
import type { WalletAddress } from "../types.js";

function solscanLink(address: string): string {
  return `https://solscan.io/account/${address}`;
}

function shortenAddress(address: string): string {
  if (address.length <= 16) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

interface WalletCardProps {
  addresses: WalletAddress[];
}

export function WalletCard({ addresses }: WalletCardProps) {
  return (
    <Box flexDirection="column">
      {addresses.map((addr, i) => (
        <Box key={i} gap={2}>
          <Text color={colors.overlay}>
            {addr.chain.padEnd(10)}
          </Text>
          <Text color={addr.chain === "solana" ? colors.mauve : colors.text} bold>
            {addr.address}
          </Text>
          {addr.chain === "solana" && (
            <Text color={colors.sky}>{solscanLink(addr.address)}</Text>
          )}
        </Box>
      ))}
    </Box>
  );
}
