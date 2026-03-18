import type { AirdropDef, TokenBalance } from "./types.js";

function hasToken(balances: TokenBalance[], symbol: string): boolean {
  return balances.some(
    (b) => b.symbol.toUpperCase() === symbol.toUpperCase() && b.balance > 0
  );
}

function hasAnyToken(balances: TokenBalance[], symbols: string[]): boolean {
  return symbols.some((s) => hasToken(balances, s));
}

function totalUsdValue(balances: TokenBalance[]): number {
  return balances.reduce((sum, b) => sum + b.usdValue, 0);
}

export const airdrops: AirdropDef[] = [
  // --- Past airdrops (show "already claimed" if token present) ---
  {
    id: "jup",
    name: "Jupiter Jupuary",
    symbol: "JUP",
    description: "Retroactive airdrop for Jupiter swap users",
    criteria: (balances) => {
      if (hasToken(balances, "JUP"))
        return { eligible: true, reason: "JUP tokens found — previously claimed", alreadyClaimed: true };
      if (balances.length >= 3)
        return { eligible: true, reason: "Active swap history detected", alreadyClaimed: false };
      return { eligible: false, reason: "No Jupiter swap activity detected", alreadyClaimed: false };
    },
  },
  {
    id: "jto",
    name: "Jito",
    symbol: "JTO",
    description: "Airdrop for jitoSOL stakers and MEV users",
    criteria: (balances) => {
      if (hasToken(balances, "JTO"))
        return { eligible: true, reason: "JTO tokens found — previously claimed", alreadyClaimed: true };
      if (hasToken(balances, "JITOSOL"))
        return { eligible: true, reason: "jitoSOL holdings detected", alreadyClaimed: false };
      return { eligible: false, reason: "No jitoSOL or JTO found", alreadyClaimed: false };
    },
  },
  {
    id: "drift",
    name: "Drift Protocol",
    symbol: "DRIFT",
    description: "Airdrop for active Drift traders",
    criteria: (balances) => {
      if (hasToken(balances, "DRIFT"))
        return { eligible: true, reason: "DRIFT tokens found — previously claimed", alreadyClaimed: true };
      return { eligible: false, reason: "No Drift trading activity detected", alreadyClaimed: false };
    },
  },

  // --- Upcoming / speculative airdrops (broader criteria for demo interest) ---
  {
    id: "marginfi",
    name: "Marginfi",
    symbol: "MRGN",
    description: "Lending/borrowing protocol — token launch pending",
    criteria: (balances) => {
      if (hasToken(balances, "MRGN"))
        return { eligible: true, reason: "MRGN tokens found — previously claimed", alreadyClaimed: true };
      // Active DeFi users with multiple tokens are likely marginfi users
      if (balances.length >= 4 && totalUsdValue(balances) > 10)
        return { eligible: true, reason: "Active DeFi portfolio — likely lend/borrow user", alreadyClaimed: false };
      return { eligible: false, reason: "No lending/borrowing activity detected", alreadyClaimed: false };
    },
  },
  {
    id: "sanctum",
    name: "Sanctum S2",
    symbol: "CLOUD",
    description: "Season 2 airdrop for LST holders",
    criteria: (balances) => {
      if (hasToken(balances, "CLOUD"))
        return { eligible: true, reason: "CLOUD tokens found — S1 claimed", alreadyClaimed: true };
      const lsts = ["MSOL", "JITOSOL", "BSOL", "HSOL", "BONKSOL", "JUPSOL", "VSOL", "ISOL"];
      if (hasAnyToken(balances, lsts))
        return { eligible: true, reason: "LST holdings detected — likely eligible for S2", alreadyClaimed: false };
      if (hasToken(balances, "SOL") || balances.some((b) => b.symbol.toUpperCase() === "SOL"))
        return { eligible: true, reason: "SOL holder — consider staking to an LST for eligibility", alreadyClaimed: false };
      return { eligible: false, reason: "No LST holdings found", alreadyClaimed: false };
    },
  },
  {
    id: "solayer",
    name: "Solayer",
    symbol: "LAYER",
    description: "Restaking protocol — Season 2 points active",
    criteria: (balances) => {
      if (hasToken(balances, "LAYER"))
        return { eligible: true, reason: "LAYER tokens found — S1 claimed", alreadyClaimed: true };
      if (hasAnyToken(balances, ["SSOL", "SUSD"]))
        return { eligible: true, reason: "Solayer deposits detected — earning points", alreadyClaimed: false };
      if (totalUsdValue(balances) > 50)
        return { eligible: true, reason: "Portfolio qualifies — deposit SOL to start earning points", alreadyClaimed: false };
      return { eligible: false, reason: "No Solayer activity detected", alreadyClaimed: false };
    },
  },
  {
    id: "tensor",
    name: "Tensor S2",
    symbol: "TNSR",
    description: "NFT marketplace — Season 2 rewards",
    criteria: (balances) => {
      if (hasToken(balances, "TNSR"))
        return { eligible: true, reason: "TNSR tokens found — S1 claimed", alreadyClaimed: true };
      return { eligible: false, reason: "No NFT trading activity on Tensor", alreadyClaimed: false };
    },
  },
  {
    id: "grass",
    name: "Grass S2",
    symbol: "GRASS",
    description: "DePIN bandwidth sharing — Season 2",
    criteria: (balances) => {
      if (hasToken(balances, "GRASS"))
        return { eligible: true, reason: "GRASS tokens found — S1 claimed, eligible for S2 bonus", alreadyClaimed: true };
      return { eligible: false, reason: "No Grass extension usage detected", alreadyClaimed: false };
    },
  },
];
