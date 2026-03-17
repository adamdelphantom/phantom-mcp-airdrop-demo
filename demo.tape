# Phantom MCP Airdrop Checker Demo
# Prerequisites:
#   1. npm install (dependencies)
#   2. Authenticated Phantom session (~/.phantom-mcp/session.json)
#   3. PHANTOM_APP_ID set in .env
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

# Launch the TUI app
Type "npm start"
Sleep 300ms
Enter

# Welcome screen — let banner render
Sleep 5s

# Press Enter to connect wallet
Enter

# Wait for MCP connection + wallet addresses
Sleep 8s

# Press Enter to check balances
Enter

# Wait for balance fetch
Sleep 8s

# Press Enter to select airdrops
Enter
Sleep 2s

# Deselect a couple for visual interest
Down
Down
Space
Down
Space
Sleep 1s

# Confirm selection
Enter

# Wait for analysis spinner + results
Sleep 4s

# Press Enter for summary
Enter

# Read the summary
Sleep 8s

# Exit
Type "q"
Sleep 2s
