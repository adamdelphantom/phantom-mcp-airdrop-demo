# Phantom MCP Airdrop Checker

Interactive terminal app that connects to your [Phantom](https://phantom.app) wallet via the [Phantom MCP server](https://www.npmjs.com/package/@phantom/mcp-server) and checks your eligibility for known Solana airdrops.

Built with [Ink](https://github.com/vadimdemedes/ink) (React for CLI) and the [MCP SDK](https://www.npmjs.com/package/@modelcontextprotocol/sdk).

## What it does

1. Connects to your Phantom wallet via MCP
2. Shows wallet addresses with Solscan links
3. Fetches token balances with USD values
4. Lets you select which airdrops to check
5. Analyzes holdings against known airdrop criteria (JUP, JTO, W, TNSR, CLOUD, DRIFT, GRASS, PRCL)
6. Outputs a summary report with eligibility status

## Prerequisites

- [Node.js](https://nodejs.org/) v18+
- A Phantom App ID from [phantom.com/portal](https://phantom.com/portal)
- [VHS](https://github.com/charmbracelet/vhs) + [ffmpeg](https://ffmpeg.org/) (for recording only)

## Setup

```bash
git clone https://github.com/adamdelphantom/phantom-mcp-airdrop-demo.git
cd phantom-mcp-airdrop-demo
npm install
```

Create a `.env` file:
```bash
cp .env.example .env
# Edit .env with your PHANTOM_APP_ID
```

Authenticate with Phantom (first time only):
```bash
npx @phantom/mcp-server
# Follow the browser prompt to sign in
```

## Usage

```bash
npm start
```

Navigate with arrow keys, Space to toggle, Enter to continue, Q to exit.

## Recording a demo

```bash
# Record with background music
npm run record

# Record without music (gif + mp4 only)
npm run record:gif
```

## Project structure

```
src/
  index.tsx          Entry point — creates MCP client, renders app
  app.tsx            Root component — state machine, screen routing
  mcp-client.ts      MCP client wrapper — typed tool calls
  types.ts           Shared TypeScript types
  airdrop-data.ts    Airdrop definitions + eligibility logic
  theme.ts           Catppuccin Mocha color palette
  screens/           One component per step (Welcome, Connect, etc.)
  components/        Reusable UI (Banner, tables, multi-select, etc.)
```

## Phantom MCP Tools Used

| Tool | Description |
|------|-------------|
| `get_wallet_addresses` | Connect wallet, get addresses across Solana, Ethereum, Bitcoin |
| `get_token_balances` | Fetch all token balances with USD prices |

## Links

- [Phantom MCP Server](https://www.npmjs.com/package/@phantom/mcp-server)
- [Phantom Portal](https://phantom.com/portal)
- [Ink](https://github.com/vadimdemedes/ink)
- [MCP SDK](https://www.npmjs.com/package/@modelcontextprotocol/sdk)
