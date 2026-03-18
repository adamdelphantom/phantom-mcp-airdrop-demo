import React, { useState } from "react";
import { Box } from "ink";
import type { Client } from "@modelcontextprotocol/sdk/client/index.js";
import type {
  AppScreen,
  WalletAddress,
  TokenBalance,
  AirdropDef,
  AirdropCheckResult,
} from "./types.js";
import { WelcomeScreen } from "./screens/WelcomeScreen.js";
import { ConnectScreen } from "./screens/ConnectScreen.js";
import { BalancesScreen } from "./screens/BalancesScreen.js";
import { SelectScreen } from "./screens/SelectScreen.js";
import { AnalysisScreen } from "./screens/AnalysisScreen.js";
import { SummaryScreen } from "./screens/SummaryScreen.js";

interface AppProps {
  client: Client | null;
  demoMode: boolean;
}

export function App({ client, demoMode }: AppProps) {
  const [screen, setScreen] = useState<AppScreen>("welcome");
  const [addresses, setAddresses] = useState<WalletAddress[]>([]);
  const [balances, setBalances] = useState<TokenBalance[]>([]);
  const [results, setResults] = useState<AirdropCheckResult[]>([]);

  return (
    <Box flexDirection="column" padding={1}>
      {screen === "welcome" && (
        <WelcomeScreen onNext={() => setScreen("connect")} />
      )}

      {screen === "connect" && (
        <ConnectScreen
          client={client}
          demoMode={demoMode}
          onNext={(addrs) => {
            setAddresses(addrs);
            setScreen("balances");
          }}
        />
      )}

      {screen === "balances" && (
        <BalancesScreen
          client={client}
          demoMode={demoMode}
          onNext={(bals) => {
            setBalances(bals);
            setScreen("select");
          }}
        />
      )}

      {screen === "select" && (
        <SelectScreen
          onNext={(selected) => {
            const checkResults: AirdropCheckResult[] = selected.map((ad) => ({
              airdrop: ad,
              result: ad.criteria(balances),
            }));
            setResults(checkResults);
            setScreen("analysis");
          }}
        />
      )}

      {screen === "analysis" && (
        <AnalysisScreen
          results={results}
          onNext={() => setScreen("summary")}
        />
      )}

      {screen === "summary" && (
        <SummaryScreen results={results} addresses={addresses} />
      )}
    </Box>
  );
}
