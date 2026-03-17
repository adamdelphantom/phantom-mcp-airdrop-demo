# Phantom MCP Airdrop Checker

Interactive terminal app that connects to a Phantom wallet via the Phantom MCP server and checks eligibility for known Solana airdrops.

## Architecture

- **Ink (React for CLI)** renders the interactive TUI
- **@modelcontextprotocol/sdk** connects to the Phantom MCP server as a client
- **StdioClientTransport** spawns `npx @phantom/mcp-server` as a subprocess

## Flow

1. Welcome screen with ASCII banner
2. Connect wallet via `get_wallet_addresses` MCP tool
3. Fetch token balances via `get_token_balances` MCP tool
4. User selects which airdrops to check (multi-select)
5. Analyze holdings against airdrop criteria
6. Summary report with Solscan links

## Key Files

- `src/mcp-client.ts` — MCP client wrapper, typed tool calls
- `src/airdrop-data.ts` — Airdrop definitions + eligibility logic
- `src/app.tsx` — State machine routing between screens
- `src/screens/` — One component per step
- `src/components/` — Reusable UI pieces (tables, multi-select, etc.)
