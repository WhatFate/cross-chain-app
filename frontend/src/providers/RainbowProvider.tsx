"use client";

import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { sepolia, baseSepolia } from "viem/chains";
import React from "react";

const config = getDefaultConfig({
  appName: "XBridge",
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_ID!,
  chains: [sepolia, baseSepolia],
  ssr: false,
});

const queryClient = new QueryClient();

export function RainbowProviders({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider modalSize="compact" showRecentTransactions={true}>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
