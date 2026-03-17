# Phantom MCP Airdrop Checker Demo
# Prerequisites:
#   1. npm install -g @anthropic-ai/claude-code (Claude CLI)
#   2. brew install vhs (VHS terminal recorder)
#   3. Authenticated Phantom session (~/.phantom-mcp/session.json)
#   4. PHANTOM_APP_ID set in environment or .env
#
# Record with: npm run record

Output demo.gif
Output demo.mp4

Set Shell "zsh"
Set FontSize 18
Set Width 1280
Set Height 800
Set Theme "Catppuccin Mocha"
Set Padding 30
Set TypingSpeed 50ms
Set CursorBlink false

# Clean start
Ctrl+L
Sleep 500ms

# Launch Claude Code in the project directory
Type "claude"
Sleep 300ms
Enter

# Wait for Claude Code to initialize and connect MCP servers
Sleep 8s

# Type the demo prompt
Type "Check my Phantom wallet for airdrop eligibility — connect my wallet, show my addresses, check my token balances, and tell me if I qualify for any known Solana airdrops."
Sleep 500ms
Enter

# Wait for Claude to:
# - Connect wallet via get_wallet_addresses (~5s)
# - Check balances via get_token_balances (~8s)
# - Analyze and generate response (~15s)
Sleep 45s

# Let the user read the final output
Sleep 10s

# Exit Claude Code
Type "/exit"
Sleep 300ms
Enter
Sleep 2s
