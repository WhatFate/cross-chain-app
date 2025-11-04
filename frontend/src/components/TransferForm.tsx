"use client";

import { useState } from "react";
import { useAccount } from "wagmi";
import type {
  BridgeParams,
  BridgeResult,
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

  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleTransfer = async () => {
    if (!isConnected) {
      if (openConnectModal) {
        openConnectModal();
      } else {
        console.warn("Connect modal not available");
      }
      return;
    }

    setIsLoading(true);
    setStatus("idle");

    try {
      if (!sdk.isInitialized()) {
        const provider = await connector?.getProvider();
        if (!provider) throw new Error("No provider found");
        await initializeWithProvider(provider);
      }

      const result: BridgeResult = await sdk.bridge({
        token,
        amount,
        chainId: toNetwork,
        sourceChains: fromNetworks,
      } as BridgeParams);

      const simulation: SimulationResult = await sdk.simulateBridge({
        token,
        amount,
        chainId: toNetwork,
        sourceChains: fromNetworks,
      } as BridgeParams);

      console.log("Fees:", simulation.intent.fees);
      console.log("Bridge result:", result);

      setStatus("success");
    } catch (error) {
      console.error("Transaction failed:", error);
      setStatus("error");
    } finally {
      setIsLoading(false);
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  const getButtonStyle = () => {
    switch (status) {
      case "success":
        return "bg-green-500 hover:bg-green-600";
      case "error":
        return "bg-red-500 hover:bg-red-600";
      default:
        return "bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600";
    }
  };

  const getButtonText = () => {
    if (isLoading) return "Processing...";
    if (status === "success") return "Transaction Successful";
    if (status === "error") return "Transaction Failed";
    return "Proceed";
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
        className={`mt-2 text-white font-semibold py-3 rounded-2xl shadow-lg transition-all cursor-pointer ${getButtonStyle()}`}
        onClick={handleTransfer}
        disabled={isLoading}
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
            Processing...
          </span>
        ) : (
          getButtonText()
        )}
      </button>
    </div>
  );
}
