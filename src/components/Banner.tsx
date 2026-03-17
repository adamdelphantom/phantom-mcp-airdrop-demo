import React from "react";
import { Box, Text } from "ink";
import { colors } from "../theme.js";

const TITLE = [
  "  ____  _                 _                  ",
  " |  _ \\| |__   __ _ _ __ | |_ ___  _ __ ___  ",
  " | |_) | '_ \\ / _` | '_ \\| __/ _ \\| '_ ` _ \\ ",
  " |  __/| | | | (_| | | | | || (_) | | | | | |",
  " |_|   |_| |_|\\__,_|_| |_|\\__\\___/|_| |_| |_|",
];

const SUBTITLE = "  A I R D R O P   C H E C K E R";

export function Banner() {
  return (
    <Box flexDirection="column" marginBottom={1}>
      <Box
        flexDirection="column"
        borderStyle="round"
        borderColor={colors.mauve}
        paddingX={2}
      >
        {TITLE.map((line, i) => (
          <Text key={i} color={colors.mauve} bold>
            {line}
          </Text>
        ))}
        <Text>{""}</Text>
        <Text color={colors.lavender} bold>
          {SUBTITLE}
        </Text>
      </Box>
      <Box marginTop={1}>
        <Text color={colors.subtext}>
          Check your Phantom wallet for Solana airdrop eligibility
        </Text>
      </Box>
    </Box>
  );
}
