import React from "react";
import { Box, Text, useApp, useInput } from "ink";
import { colors } from "../theme.js";
import type { AirdropCheckResult, WalletAddress } from "../types.js";
import { StepBar } from "../components/StepBar.js";
import { Footer } from "../components/Footer.js";

interface SummaryScreenProps {
  results: AirdropCheckResult[];
  addresses: WalletAddress[];
}

export function SummaryScreen({ results, addresses }: SummaryScreenProps) {
  const { exit } = useApp();

  useInput((input) => {
    if (input === "q") exit();
  });

  const eligible = results.filter(
    (r) => r.result.eligible && !r.result.alreadyClaimed
  );
  const claimed = results.filter((r) => r.result.alreadyClaimed);
  const notEligible = results.filter(
    (r) => !r.result.eligible && !r.result.alreadyClaimed
  );

  const solanaAddr = addresses.find((a) => a.chain === "solana")?.address;

  return (
    <Box flexDirection="column">
      <StepBar step={6} />

      <Box
        flexDirection="column"
        borderStyle="round"
        borderColor={colors.mauve}
        paddingX={2}
        paddingY={1}
      >
        <Text color={colors.mauve} bold>
          AIRDROP ELIGIBILITY REPORT
        </Text>

        {solanaAddr && (
          <Box marginTop={1}>
            <Text color={colors.overlay}>Wallet: </Text>
            <Text color={colors.text}>{solanaAddr}</Text>
          </Box>
        )}
        {solanaAddr && (
          <Box>
            <Text color={colors.sky}>
              https://solscan.io/account/{solanaAddr}
            </Text>
          </Box>
        )}

        {eligible.length > 0 && (
          <Box flexDirection="column" marginTop={1}>
            <Text color={colors.green} bold>
              Potentially Eligible ({eligible.length}):
            </Text>
            {eligible.map((r) => (
              <Box key={r.airdrop.id} gap={1} marginLeft={2}>
                <Text color={colors.green}>+</Text>
                <Text color={colors.text} bold>
                  {r.airdrop.symbol}
                </Text>
                <Text color={colors.subtext}>- {r.result.reason}</Text>
              </Box>
            ))}
          </Box>
        )}

        {claimed.length > 0 && (
          <Box flexDirection="column" marginTop={1}>
            <Text color={colors.sky} bold>
              Already Claimed ({claimed.length}):
            </Text>
            {claimed.map((r) => (
              <Box key={r.airdrop.id} gap={1} marginLeft={2}>
                <Text color={colors.sky}>~</Text>
                <Text color={colors.text} bold>
                  {r.airdrop.symbol}
                </Text>
                <Text color={colors.subtext}>- {r.result.reason}</Text>
              </Box>
            ))}
          </Box>
        )}

        {notEligible.length > 0 && (
          <Box flexDirection="column" marginTop={1}>
            <Text color={colors.overlay} bold>
              Not Eligible ({notEligible.length}):
            </Text>
            {notEligible.map((r) => (
              <Box key={r.airdrop.id} gap={1} marginLeft={2}>
                <Text color={colors.overlay}>-</Text>
                <Text color={colors.overlay}>{r.airdrop.symbol}</Text>
                <Text color={colors.overlay} dimColor>
                  - {r.result.reason}
                </Text>
              </Box>
            ))}
          </Box>
        )}

        <Box flexDirection="column" marginTop={1}>
          <Text color={colors.yellow} bold>
            Next Steps:
          </Text>
          {eligible.length > 0 && (
            <Box marginLeft={2}>
              <Text color={colors.subtext}>
                Check official airdrop pages for claim eligibility details
              </Text>
            </Box>
          )}
          <Box marginLeft={2}>
            <Text color={colors.subtext}>
              Keep tokens staked and protocols active for future airdrops
            </Text>
          </Box>
        </Box>
      </Box>

      <Footer hint="Press Q to exit" />
    </Box>
  );
}
