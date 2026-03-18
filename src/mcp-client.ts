import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import type { WalletAddress, TokenBalance } from "./types.js";

export async function createMcpClient(): Promise<Client> {
  const transport = new StdioClientTransport({
    command: "npx",
    args: ["-y", "@phantom/mcp-server"],
    env: {
      ...process.env,
      PHANTOM_APP_ID: process.env.PHANTOM_APP_ID || "",
    },
    stderr: "pipe",
  });

  const client = new Client({
    name: "phantom-airdrop-checker",
    version: "2.0.0",
  });

  await client.connect(transport);
  return client;
}

export async function getWalletAddresses(
  client: Client
): Promise<WalletAddress[]> {
  const result = await client.callTool({
    name: "get_wallet_addresses",
    arguments: {},
  });

  const content = result.content as Array<{ type: string; text?: string }>;
  const text = content.find((c) => c.type === "text")?.text || "{}";
  const data = JSON.parse(text);

  // Phantom MCP returns { walletId, organizationId, addresses: [{ addressType, address }] }
  if (data.addresses && Array.isArray(data.addresses)) {
    return data.addresses.map((item: Record<string, string>) => ({
      chain: item.addressType || item.chain || "unknown",
      address: item.address || "",
    }));
  }

  // Fallback: flat array of address objects
  if (Array.isArray(data)) {
    return data.map((item: Record<string, string>) => ({
      chain: item.chain || item.network || item.addressType || "unknown",
      address: item.address || item.publicKey || "",
    }));
  }

  return [];
}

export async function getTokenBalances(
  client: Client
): Promise<TokenBalance[]> {
  const result = await client.callTool({
    name: "get_token_balances",
    arguments: {},
  });

  const content = result.content as Array<{ type: string; text?: string }>;
  const text = content.find((c) => c.type === "text")?.text || "[]";
  const data = JSON.parse(text);

  const tokens: TokenBalance[] = [];

  const items = Array.isArray(data) ? data : data.tokens || data.balances || [];
  for (const item of items) {
    const usdValue =
      item.usdValue ?? item.valueUsd ?? item.usd ?? item.value ?? 0;
    const balance =
      item.balance ?? item.amount ?? item.uiAmount ?? item.quantity ?? 0;

    // Filter dust (< $0.50)
    if (usdValue < 0.5 && balance === 0) continue;

    tokens.push({
      symbol: item.symbol || item.ticker || "???",
      name: item.name || item.symbol || "Unknown",
      mint: item.mint || item.address || item.mintAddress || "",
      balance: typeof balance === "number" ? balance : parseFloat(balance) || 0,
      usdValue:
        typeof usdValue === "number" ? usdValue : parseFloat(usdValue) || 0,
    });
  }

  // Sort by USD value descending
  tokens.sort((a, b) => b.usdValue - a.usdValue);
  return tokens;
}

export async function disconnectClient(client: Client): Promise<void> {
  await client.close();
}
