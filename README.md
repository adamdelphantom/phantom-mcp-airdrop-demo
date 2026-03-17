# Phantom MCP Airdrop Demo

A terminal demo showcasing the [Phantom MCP server](https://www.npmjs.com/package/@phantom/mcp-server) with Claude Code. An AI agent connects to your Phantom wallet, checks token balances, and analyzes airdrop eligibility — all from the command line.

## What it does

1. Connects to your Phantom wallet via MCP
2. Retrieves wallet addresses across Solana, Ethereum, and Bitcoin
3. Checks token balances with USD values
4. Analyzes eligibility for known Solana airdrops (JUP, JTO, W, TNSR, CLOUD, etc.)
5. Outputs a summary with Solscan links

## Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [Claude Code](https://docs.anthropic.com/en/docs/claude-code) CLI
- [VHS](https://github.com/charmbracelet/vhs) (for recording only): `brew install vhs`
- A Phantom App ID from [phantom.com/portal](https://phantom.com/portal)

## Setup

1. Clone the repo:
   ```bash
   git clone https://github.com/gutterbacon/phantom-mcp-airdrop-demo.git
   cd phantom-mcp-airdrop-demo
   ```

2. Set your Phantom App ID:
   ```bash
   cp .env.example .env
   # Edit .env with your PHANTOM_APP_ID
   ```

3. Authenticate with Phantom (first time only):
   ```bash
   npx @phantom/mcp-server
   # Follow the browser prompt to sign in with Google, Apple, or Phantom
   ```

4. Run Claude Code in the project directory:
   ```bash
   claude
   ```

5. Ask Claude to check your airdrop eligibility:
   ```
   Check my Phantom wallet for airdrop eligibility — connect my wallet, show my addresses, check my token balances, and tell me if I qualify for any known Solana airdrops.
   ```

## Recording a demo

```bash
npm run record
```

This uses VHS to record the Claude Code session as `demo.gif` and `demo.mp4`.

## How it works

- **`.mcp.json`** — Configures the Phantom MCP server for Claude Code
- **`CLAUDE.md`** — Guides Claude through the demo flow (connect → balances → airdrop analysis)
- **`.claude/settings.local.json`** — Pre-approves read-only MCP tools so the demo runs without permission prompts
- **`demo.tape`** — VHS script for recording the terminal session

## Phantom MCP Tools Used

| Tool | Description |
|------|-------------|
| `get_wallet_addresses` | Connect wallet and get addresses across Solana, Ethereum, Bitcoin |
| `get_token_balances` | Check all token balances with USD prices via Phantom portfolio API |

## Links

- [Phantom MCP Server](https://www.npmjs.com/package/@phantom/mcp-server)
- [Phantom Portal](https://phantom.com/portal)
- [Claude Code](https://docs.anthropic.com/en/docs/claude-code)
