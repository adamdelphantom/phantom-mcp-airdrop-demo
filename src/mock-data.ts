import type { WalletAddress, TokenBalance } from "./types.js";

// Realistic demo wallet — shows interesting airdrop results
export const MOCK_ADDRESSES: WalletAddress[] = [
  { chain: "solana", address: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU" },
  { chain: "ethereum", address: "0x3a1D4A97B9C399DBd3408B4B63e1e23f7F3e1a2C" },
  { chain: "bitcoin", address: "bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq" },
];

export const MOCK_BALANCES: TokenBalance[] = [
  {
    symbol: "SOL",
    name: "Solana",
    mint: "So11111111111111111111111111111111111111112",
    balance: 42.891,
    usdValue: 6412.33,
  },
  {
    symbol: "JUP",
    name: "Jupiter",
    mint: "JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN",
    balance: 2847.0,
    usdValue: 1893.22,
  },
  {
    symbol: "JTO",
    name: "Jito",
    mint: "jtojtomepa8beP8AuQc6eXt5FriJwfFMwQx2v2f9mCL",
    balance: 156.4,
    usdValue: 487.92,
  },
  {
    symbol: "jitoSOL",
    name: "Jito Staked SOL",
    mint: "J1toso1uCk3RLmjorhTtrVwY9HJ7X8V9yYac6Y7kGCPn",
    balance: 8.23,
    usdValue: 1294.18,
  },
  {
    symbol: "USDC",
    name: "USD Coin",
    mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    balance: 1240.0,
    usdValue: 1240.0,
  },
  {
    symbol: "DRIFT",
    name: "Drift Protocol",
    mint: "DriFtupJYLTosbwoN8koMbEYSx54aFAVLddWsbksjwg7",
    balance: 1420.5,
    usdValue: 312.51,
  },
  {
    symbol: "mSOL",
    name: "Marinade Staked SOL",
    mint: "mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So",
    balance: 3.15,
    usdValue: 498.72,
  },
  {
    symbol: "TNSR",
    name: "Tensor",
    mint: "TNSRxcUxoT9xBG3de7PiJyTDYu7kskLqcpddxnEJAS6",
    balance: 890.0,
    usdValue: 178.0,
  },
  {
    symbol: "GRASS",
    name: "Grass",
    mint: "Grass7B4RdKfBCjTKgSqnXkqjwiGvQyFbuSCUJr3XXjs",
    balance: 3200.0,
    usdValue: 256.0,
  },
  {
    symbol: "BONK",
    name: "Bonk",
    mint: "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263",
    balance: 15420000.0,
    usdValue: 184.22,
  },
];
