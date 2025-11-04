"use client";

import { useState } from "react";
import { useAccount } from "wagmi";
import type {
  TransferParams,
  TransferResult,
  SimulationResult,
} from "@avail-project/nexus-core";
import { sdk, initializeWithProvider } from "../lib/nexus";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import FromNetworksDropdown from "./FromNetworksDropdown";
import ToNetworksDropdown from "./ToNetworksDropdown";
import TokenDropdown from "./SelectTokenDropdown";
import {
  handleAmountChange,
  handleAmountWheel,
  handleAmountKeyDown,
} from "../lib/amountHandlers";

export default function TransferForm() {
  const { isConnected, connector } = useAccount();
  const { openConnectModal } = useConnectModal();

  const [toNetwork, setToNetwork] = useState<number | null>(null);
  const [fromNetworks, setFromNetworks] = useState<number[]>([]);
  const [token, setToken] = useState("");
  const [amount, setAmount] = useState("");

  const handleTransfer = async () => {
    if (!isConnected) {
      if (openConnectModal) {
        openConnectModal();
      } else {
        console.warn("Connect modal not available");
      }
      return;
    }

    if (!sdk.isInitialized()) {
      const provider = await connector?.getProvider();
      if (!provider) throw new Error("No provider found");
      await initializeWithProvider(provider);
    }
    console.log("connector:", connector);
    const result: TransferResult = await sdk.transfer({
      token: token,
      amount: amount,
      chainId: toNetwork,
      recipient: "0xe3926a167486568213f73752cbfa47053ee74096",
      sourceChains: fromNetworks,
    } as TransferParams);

    const simulation: SimulationResult = await sdk.simulateTransfer({
      token: token,
      amount: amount,
      chainId: toNetwork,
      recipient: "0xe3926a167486568213f73752cbfa47053ee74096",
      sourceChains: fromNetworks,
    } as TransferParams);

    console.log("Fees:", simulation.intent.fees);
    console.log("result:", result.success);
  };

  return (
    <div className="bg-white/90 backdrop-blur-xl border border-gray-200 rounded-3xl shadow-xl max-w-md w-full p-6 flex flex-col gap-6">
      <h2 className="text-2xl font-bold text-gray-800 text-center">
        Cross-Chain Transfer
      </h2>

      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <label className="font-semibold text-gray-600 text-sm">
            From Network
          </label>
          <FromNetworksDropdown
            selectedNetworks={fromNetworks}
            onChange={setFromNetworks}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-semibold text-gray-600 text-sm">
            To Network
          </label>
          <ToNetworksDropdown
            selectedNetwork={toNetwork}
            onChange={setToNetwork}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label className="font-semibold text-gray-600 text-sm">Token</label>
        <TokenDropdown selectedToken={token} onChange={setToken} />
      </div>

      <div className="flex flex-col gap-1">
        <label className="font-semibold text-gray-600 text-sm">Amount</label>
        <input
          type="number"
          placeholder="Enter amount to send"
          className="h-12 border border-gray-300 rounded-2xl px-4 bg-white/70 focus:ring-2 focus:ring-green-400 hover:border-gray-400 transition-all shadow-sm hover:shadow-md"
          value={amount}
          onChange={(e) => handleAmountChange(e.target.value, setAmount)}
          onWheel={(e) => handleAmountWheel(e, amount, setAmount)}
          onKeyDown={(e) => handleAmountKeyDown(e, amount, setAmount)}
        />
      </div>

      <button
        className="mt-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold py-3 rounded-2xl shadow-lg hover:from-blue-600 hover:to-indigo-600 transition-all cursor-pointer"
        onClick={handleTransfer}
      >
        Proceed
      </button>
    </div>
  );
}
