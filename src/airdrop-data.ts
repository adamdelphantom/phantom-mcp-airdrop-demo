import type { AirdropDef, TokenBalance } from "./types.js";

function hasToken(balances: TokenBalance[], symbol: string): boolean {
  return balances.some(
    (b) => b.symbol.toUpperCase() === symbol.toUpperCase() && b.balance > 0
  );
}

function hasAnyToken(balances: TokenBalance[], symbols: string[]): boolean {
  return symbols.some((s) => hasToken(balances, s));
}

export const airdrops: AirdropDef[] = [
  {
    id: "jup",
    name: "Jupiter",
    symbol: "JUP",
    description: "Retroactive airdrop to Jupiter swap users",
    criteria: (balances) => {
      if (hasToken(balances, "JUP"))
        return {
          eligible: true,
          reason: "JUP tokens found in wallet",
          alreadyClaimed: true,
        };
      if (balances.length >= 3)
        return {
          eligible: true,
          reason: "Multiple token types suggest active swap usage",
          alreadyClaimed: false,
        };
      return {
        eligible: false,
        reason: "No swap activity detected",
        alreadyClaimed: false,
      };
    },
  },
  {
    id: "jto",
    name: "Jito",
    symbol: "JTO",
    description: "Airdrop for jitoSOL stakers and MEV users",
    criteria: (balances) => {
      if (hasToken(balances, "JTO"))
        return {
          eligible: true,
          reason: "JTO tokens found in wallet",
          alreadyClaimed: true,
        };
      if (hasToken(balances, "JITOSOL"))
        return {
          eligible: true,
          reason: "jitoSOL holdings detected — likely eligible",
          alreadyClaimed: false,
        };
      return {
        eligible: false,
        reason: "No jitoSOL or JTO found",
        alreadyClaimed: false,
      };
    },
  },
  {
    id: "w",
    name: "Wormhole",
    symbol: "W",
    description: "Cross-chain bridge users",
    criteria: (balances) => {
      if (hasToken(balances, "W"))
        return {
          eligible: true,
          reason: "W tokens found in wallet",
          alreadyClaimed: true,
        };
      return {
        eligible: false,
        reason: "No Wormhole activity detected",
        alreadyClaimed: false,
      };
    },
  },
  {
    id: "tnsr",
    name: "Tensor",
    symbol: "TNSR",
    description: "NFT marketplace traders",
    criteria: (balances) => {
      if (hasToken(balances, "TNSR"))
        return {
          eligible: true,
          reason: "TNSR tokens found in wallet",
          alreadyClaimed: true,
        };
      return {
        eligible: false,
        reason: "No Tensor trading activity detected",
        alreadyClaimed: false,
      };
    },
  },
  {
    id: "cloud",
    name: "Sanctum",
    symbol: "CLOUD",
    description: "SOL LST holders (mSOL, jitoSOL, bSOL, etc.)",
    criteria: (balances) => {
      if (hasToken(balances, "CLOUD"))
        return {
          eligible: true,
          reason: "CLOUD tokens found in wallet",
          alreadyClaimed: true,
        };
      const lsts = ["MSOL", "JITOSOL", "BSOL", "HSOL", "BONKSOL", "JUPSOL"];
      if (hasAnyToken(balances, lsts))
        return {
          eligible: true,
          reason: "LST holdings detected — likely eligible",
          alreadyClaimed: false,
        };
      return {
        eligible: false,
        reason: "No LST holdings found",
        alreadyClaimed: false,
      };
    },
  },
  {
    id: "drift",
    name: "Drift Protocol",
    symbol: "DRIFT",
    description: "Active Drift protocol traders",
    criteria: (balances) => {
      if (hasToken(balances, "DRIFT"))
        return {
          eligible: true,
          reason: "DRIFT tokens found in wallet",
          alreadyClaimed: true,
        };
      return {
        eligible: false,
        reason: "No Drift activity detected",
        alreadyClaimed: false,
      };
    },
  },
  {
    id: "grass",
    name: "Grass",
    symbol: "GRASS",
    description: "Grass browser extension users",
    criteria: (balances) => {
      if (hasToken(balances, "GRASS"))
        return {
          eligible: true,
          reason: "GRASS tokens found in wallet",
          alreadyClaimed: true,
        };
      return {
        eligible: false,
        reason: "No Grass extension usage detected",
        alreadyClaimed: false,
      };
    },
  },
  {
    id: "prcl",
    name: "Parcl",
    symbol: "PRCL",
    description: "Parcl LP positions and points holders",
    criteria: (balances) => {
      if (hasToken(balances, "PRCL"))
        return {
          eligible: true,
          reason: "PRCL tokens found in wallet",
          alreadyClaimed: true,
        };
      return {
        eligible: false,
        reason: "No Parcl activity detected",
        alreadyClaimed: false,
      };
    },
  },
];
