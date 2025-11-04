import { NexusSDK } from "@avail-project/nexus-core";

export const sdk = new NexusSDK({ network: "testnet" });

export function isInitialized() {
  return sdk.isInitialized();
}

export async function initializeWithProvider(provider: any) {
  if (!provider) throw new Error("No EIP-1193 provider (e.g., MetaMask) found");

  if (sdk.isInitialized()) return;

  await sdk.initialize(provider);
}

export async function deinit() {
  if (!sdk.isInitialized()) return;

  await sdk.deinit();
}

export async function getUnifiedBalances() {
  return await sdk.getUnifiedBalances();
}
