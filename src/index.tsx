import "dotenv/config";
import React from "react";
import { render, Box, Text } from "ink";
import { createMcpClient } from "./mcp-client.js";
import { App } from "./app.js";
import { colors } from "./theme.js";

async function main() {
  let client;

  try {
    client = await createMcpClient();
  } catch (err) {
    render(
      <Box flexDirection="column" padding={1}>
        <Box borderStyle="round" borderColor={colors.red} paddingX={2}>
          <Text color={colors.red} bold>
            Failed to connect to Phantom MCP server
          </Text>
        </Box>
        <Box marginTop={1} flexDirection="column">
          <Text color={colors.subtext}>
            {err instanceof Error ? err.message : String(err)}
          </Text>
          <Text color={colors.subtext}>{""}</Text>
          <Text color={colors.yellow}>Troubleshooting:</Text>
          <Text color={colors.text}>
            1. Set PHANTOM_APP_ID in .env (get one at phantom.com/portal)
          </Text>
          <Text color={colors.text}>
            2. Run: npx @phantom/mcp-server (to authenticate)
          </Text>
          <Text color={colors.text}>
            3. Ensure ~/.phantom-mcp/session.json exists
          </Text>
        </Box>
      </Box>
    );
    process.exit(1);
  }

  const { waitUntilExit } = render(<App client={client} />);

  await waitUntilExit();
  await client.close().catch(() => {});
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
