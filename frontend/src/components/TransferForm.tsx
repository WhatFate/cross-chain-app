"use client";

import { useState } from "react";
import { ArrowRightIcon } from "@heroicons/react/24/solid";

export default function TransferForm() {
  const [fromNetwork, setFromNetwork] = useState("");
  const [toNetwork, setToNetwork] = useState("");
  const [fromToken, setFromToken] = useState("");
  const [toToken, setToToken] = useState("");
  const [amount, setAmount] = useState("");

  return (
    <div className="bg-white/90 backdrop-blur-xl border border-gray-200 rounded-3xl shadow-xl max-w-md w-full p-6 flex flex-col gap-6">
      <h2 className="text-2xl font-bold text-gray-800 text-center">
        Cross-Chain Transfer
      </h2>

      <div className="flex items-center gap-3">
        <div className="flex-1 flex flex-col gap-1">
          <label className="font-semibold text-gray-600 text-sm">
            From Network
          </label>
          <select
            className="h-12 border border-gray-300 rounded-xl px-4 hover:border-gray-400 focus:ring-2 focus:ring-blue-400 transition-colors shadow-sm"
            value={fromNetwork}
            onChange={(e) => setFromNetwork(e.target.value)}
          >
            <option value="">Select network</option>
            <option value="Ethereum Sepolia">Ethereum Sepolia</option>
            <option value="Base Sepolia">Base Sepolia</option>
          </select>
        </div>

        <div className="flex items-center justify-center">
          <ArrowRightIcon className="w-7 h-7 text-blue-500 mt-6" />
        </div>

        <div className="flex-1 flex flex-col gap-1">
          <label className="font-semibold text-gray-600 text-sm">
            To Network
          </label>
          <select
            className="h-12 border border-gray-300 rounded-xl px-4 hover:border-gray-400 focus:ring-2 focus:ring-blue-400 transition-colors shadow-sm"
            value={toNetwork}
            onChange={(e) => setToNetwork(e.target.value)}
          >
            <option value="">Select network</option>
            <option value="Ethereum Sepolia">Ethereum Sepolia</option>
            <option value="Base Sepolia">Base Sepolia</option>
          </select>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex-1 flex flex-col gap-1">
          <label className="font-semibold text-gray-600 text-sm">
            From Token
          </label>
          <select
            className="h-12 border border-gray-300 rounded-xl px-4 hover:border-gray-400 focus:ring-2 focus:ring-indigo-400 transition-colors shadow-sm"
            value={fromToken}
            onChange={(e) => setFromToken(e.target.value)}
          >
            <option value="">Select token</option>
            <option value="ETH">ETH</option>
            <option value="USDC">USDC</option>
            <option value="DAI">DAI</option>
          </select>
        </div>

        <div className="flex items-center justify-center">
          <ArrowRightIcon className="w-7 h-7 text-indigo-500 mt-6" />
        </div>

        <div className="flex-1 flex flex-col gap-1">
          <label className="font-semibold text-gray-600 text-sm">
            To Token
          </label>
          <select
            className="h-12 border border-gray-300 rounded-xl px-4 hover:border-gray-400 focus:ring-2 focus:ring-indigo-400 transition-colors shadow-sm"
            value={toToken}
            onChange={(e) => setToToken(e.target.value)}
          >
            <option value="">Select token</option>
            <option value="ETH">ETH</option>
            <option value="USDC">USDC</option>
            <option value="DAI">DAI</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label className="font-semibold text-gray-600 text-sm">Amount</label>
        <input
          type="number"
          placeholder="Enter amount to send"
          className="h-12 border border-gray-300 rounded-xl px-4 focus:ring-2 focus:ring-green-400 hover:border-gray-400 transition-colors shadow-sm"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      <button className="mt-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold py-3 rounded-2xl shadow-lg hover:from-blue-600 hover:to-indigo-600 transition-all">
        Proceed
      </button>
    </div>
  );
}
