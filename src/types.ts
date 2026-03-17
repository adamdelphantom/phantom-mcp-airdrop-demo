export type AppScreen =
  | "welcome"
  | "connect"
  | "balances"
  | "select"
  | "analysis"
  | "summary";

export interface WalletAddress {
  chain: string;
  address: string;
}

export interface TokenBalance {
  symbol: string;
  name: string;
  mint: string;
  balance: number;
  usdValue: number;
}

export interface AirdropDef {
  id: string;
  name: string;
  symbol: string;
  description: string;
  criteria: (balances: TokenBalance[]) => EligibilityResult;
}

export interface EligibilityResult {
  eligible: boolean;
  reason: string;
  alreadyClaimed: boolean;
}

export interface AirdropCheckResult {
  airdrop: AirdropDef;
  result: EligibilityResult;
}
