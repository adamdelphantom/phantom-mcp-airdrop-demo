# Phantom MCP Airdrop Checker Demo
# Record with: npm run record (with music) or npm run record:silent
#
# Uses --demo flag for reproducible sample data.
# For a live recording with your actual wallet, change to "npm start"

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

# Launch the TUI app in demo mode
Type "npx tsx src/index.tsx --demo"
Sleep 300ms
Enter

# Welcome screen — wait for tsx to compile + banner to render
Sleep 8s

# Press Enter to connect wallet
Enter

# Wait for connection (1.5s simulated) + show wallet addresses
Sleep 5s

# Pause to read wallet addresses + Solscan links
Sleep 3s

# Press Enter to check balances
Enter

# Wait for balances (2s simulated) + display
Sleep 5s

# Pause to read balance table
Sleep 3s

# Press Enter to go to airdrop selection
Enter
Sleep 2s

# Deselect DRIFT and MRGN for visual interest
Down
Down
Space
Down
Space
Sleep 1s

# Confirm selection
Enter

# Wait for analysis spinner + results
Sleep 5s

# Pause to read results
Sleep 2s

# Press Enter for summary
Enter

# Read the summary report
Sleep 8s

# Exit
Type "q"
Sleep 2s
